import LogOutSection from "@/components/LogOutSection";
import { getOtherUsers } from "@/dal/user";
import Link from "next/link";

export default async function Home() {
  const users = await getOtherUsers();

  const chats = [{
    name: 'Global chat',
    id: 'global'
  }, ...users]

  return (
    <>
      <h1 className="text-3xl font-bold text-center mt-8 mb-12">Select chatter</h1>
      <LogOutSection />
      <div className="w-200 flex flex-col mx-auto">
        {chats.map(chat => (
          <Link
            key={chat.id}
            href={`/chat/${chat.id}`}
            className="text-center text-xl bg-bg hover:bg-bg-light m-2 p-4 rounded-2xl transition"
          >{chat.name}</Link>
        ))}
      </div>
    </>
  );
}
