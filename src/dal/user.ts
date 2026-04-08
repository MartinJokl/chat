import 'server-only';

import { redirect } from "next/navigation";
import getSession from "./get-session-cache";
import db from '@/db/drizzle';
import { user } from '@/db/schema/auth-schema';
import { eq } from 'drizzle-orm';


export async function getUsers() {
  const session = await getSession();
  if (!session) {
    redirect('/login');
  }

  const result = await db
    .select({
      name: user.name,
      id: user.id
    })
    .from(user);

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
      id: user.id
    })
    .from(user)
    .where(eq(user.id, id));

  if (result.length === 0) {
    return null;
  }

  return result[0].name;
}