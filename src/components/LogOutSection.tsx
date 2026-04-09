"use client";

import { authClient } from "../lib/auth-client";
import { redirect } from "next/navigation";


export default function LogOutSection() {
  const {
    data: session,
  } = authClient.useSession();

  async function logOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          redirect("/login"); // redirect to login page
        },
      },
    });
  }

  return (
    <div className="flex w-max absolute top-4 right-4 text-xl gap-4">
      <div
        className="px-4 py-2 block mx-auto mt-1 rounded-md transition w-max"
      >{session?.user.name}</div>
      <button
        className="bg-bg-light px-4 py-2 block mx-auto mt-1 border rounded-md border-border cursor-pointer hover:bg-border transition"
        onClick={logOut}
      >Log out</button>
    </div>
  )
}