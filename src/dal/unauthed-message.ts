import { eq, sql } from "drizzle-orm";
import db from "../db/drizzle.ts";
import { message } from "../db/schema/schema.ts";
import { user } from "../db/schema/auth-schema.ts";


export async function createMessageUnauthed(sender: string, reciever: string | null, content: string) {
  const result = await db
    .insert(message)
    .values({
      sender,
      reciever,
      content
    });
  return result[0].insertId;
}

export async function getMessageByIdUnauthed(id: number) {
  const result = await db
    .select({
      sender: message.sender,
      senderName: user.name,
      content: message.content,
      id: message.id,
      createdAtUTC: sql<Date>`CONVERT_TZ(message.created_at, @@session.time_zone, '+00:00')`.mapWith(message.createdAt),
      reciever: message.reciever
    })
    .from(message)
    .where(eq(message.id, id))
    .leftJoin(user, eq(message.sender, user.id))
    .orderBy(message.createdAt);
  if (result.length === 0) {
    return null;
  }
  return result[0];
}