import { and, eq, isNull, or, sql } from "drizzle-orm";
import db from "../db/drizzle.ts";
import { message } from "../db/schema/schema.ts";
import { user } from "../db/schema/auth-schema.ts";
import { auth } from "../lib/auth.ts";


export async function createMessage(headers: Headers, reciever: string | null, content: string) {
  const session = await auth.api.getSession({
    headers
  })
  if (!session) {
    return;
  }
  const userId = session.user.id;

  const result = await db
    .insert(message)
    .values({
      sender: userId,
      reciever,
      content
    });
  return result[0].insertId;
}

export async function getMessageById(headers: Headers, id: number) {
  const session = await auth.api.getSession({
    headers
  })
  if (!session) {
    return;
  }
  const userId = session.user.id;

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
    .where(and(
      eq(message.id, id),
      or(
        eq(message.sender, userId),
        eq(message.reciever, userId),
        isNull(message.reciever)
      )
    ))
    .leftJoin(user, eq(message.sender, user.id))
    .orderBy(message.createdAt);
  if (result.length === 0) {
    return null;
  }
  return result[0];
}