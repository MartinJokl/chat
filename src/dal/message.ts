import 'server-only';

import db from "@/db/drizzle";
import { message } from "@/db/schema/schema";
import { isNull } from "drizzle-orm";
import getSession from './get-session-cache';
import { redirect } from 'next/navigation';


export async function getGlobalMessages() {
  const session = await getSession();
  if (!session) {
    redirect('/login');
  }

  const result = await db
    .select()
    .from(message)
    .where(isNull(message.reciever));

  return result;
}