"use server";

import { createMessage } from "../dal/message";
import { revalidatePath } from "next/cache";

export async function sendMessage(reciever: string | null, content: string) {
  await createMessage(reciever, content);

  revalidatePath('/');
}