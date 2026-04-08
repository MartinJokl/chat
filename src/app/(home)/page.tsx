import { getUsers } from "@/dal/user";
import Link from "next/link";

export default async function Home() {
  const users = await getUsers();

  const chats = [{
    name: 'Global chat',
    id: 'global'
  }, ...users]

  return (
    <>
      <h1 className="text-3xl font-bold text-center mt-8 mb-12">Select chatter</h1>
      <div className="w-200 flex flex-col mx-auto">
        {chats.map(chat => (
          <Link
            key={chat.id}
            href={`/chat/${chat.id}`}
            className="text-center text-xl bg-bg hover:bg-bg-light m-2 p-4"
          >{chat.name}</Link>
        ))}
      </div>
    </>
  );
}
