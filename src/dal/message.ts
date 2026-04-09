import 'server-only';

import db from "@/db/drizzle";
import { message } from "@/db/schema/schema";
import { and, isNull, or, eq, sql } from "drizzle-orm";
import getSession from './get-session-cache';
import { redirect } from 'next/navigation';
import { user } from '@/db/schema/auth-schema';

export async function getGlobalMessages() {
  const session = await getSession();
  if (!session) {
    redirect('/login');
  }

  const result = await db
    .select({
      sender: message.sender,
      senderName: user.name,
      content: message.content,
      id: message.id,
      createdAtUTC: sql<Date>`CONVERT_TZ(created_at, @@session.time_zone, '+00:00')`.mapWith(message.createdAt)
    })
    .from(message)
    .where(isNull(message.reciever))
    .leftJoin(user, eq(message.sender, user.id))
    .orderBy(message.createdAt);

  return result;
}

export async function getMessages(otherPerson: string) {
  const session = await getSession();
  if (!session) {
    redirect('/login');
  }
  const thisPerson = session.user.id;

  const result = await db
    .select({
      sender: message.sender,
      senderName: user.name,
      content: message.content,
      id: message.id,
      createdAtUTC: sql<Date>`CONVERT_TZ(message.created_at, @@session.time_zone, '+00:00')`.mapWith(message.createdAt)
    })
    .from(message)
    .where(or(
      and(
        eq(message.sender, thisPerson),
        eq(message.reciever, otherPerson)
      ),
      and(
        eq(message.sender, otherPerson),
        eq(message.reciever, thisPerson)
      ),
    ))
    .leftJoin(user, eq(message.sender, user.id))
    .orderBy(message.createdAt);

  return result;
}

export async function createMessage(reciever: string | null, content: string) {
  const session = await getSession();
  if (!session) {
    redirect('/login');
  }
  const thisPerson = session.user.id;

  await db
    .insert(message)
    .values({
      sender: thisPerson,
      reciever,
      content
    })
}