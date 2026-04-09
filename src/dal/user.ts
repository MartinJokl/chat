import 'server-only';

import { redirect } from "next/navigation";
import getSession from "./get-session-cache";
import db from '@/db/drizzle';
import { user } from '@/db/schema/auth-schema';
import { eq, ne } from 'drizzle-orm';


export async function getOtherUsers() {
  const session = await getSession();
  if (!session) {
    redirect('/login');
  }

  const thisId = session.user.id;

  const result = await db
    .select({
      name: user.name,
      id: user.id,
      email: user.email
    })
    .from(user)
    .where(ne(user.id, thisId));

  return result;
}

export async function getUser(id: string) {
  const session = await getSession();
  if (!session) {
    redirect('/login');
  }

  const result = await db
    .select({
      name: user.name,
      email: user.email
    })
    .from(user)
    .where(eq(user.id, id));

  if (result.length === 0) {
    return null;
  }

  return result[0];
}