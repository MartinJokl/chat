import getSession from "@/dal/get-session-cache";
import { getGlobalMessages } from "@/dal/message";


export default async function GlobalMessageContainer() {
  const messages = await getGlobalMessages();

  const session = await getSession();

  return (
    <div className="flex-1">
      {messages.map(message => (
        <div
          className={`${message.sender === session?.user.id ? 'bg-primary-muted ml-auto' : 'bg-bg'} w-max max-w-[80%] my-2 px-4 py-2 rounded-md overflow-hidden`}
          key={message.id}
        >{message.content}</div>
      ))
      }
    </div>
  );
}