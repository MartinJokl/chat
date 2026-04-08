import getSession from "@/dal/get-session-cache";
import { getGlobalMessages } from "@/dal/message";


export default async function GlobalMessageContainer() {
  const messages = await getGlobalMessages();
  const reverseMessages = messages.toReversed(); // to be defaultly scrolled to the bottom

  const session = await getSession();

  return (
    <div className="flex-1 overflow-auto dark-scrollbar flex flex-col-reverse">
      {reverseMessages.map((message, index) => (
        <div
          className={`${message.sender === session?.user.id ? 'ml-auto text-right' : ''} w-max max-w-[80%]`}
          key={message.id}
        >
          {(index === messages.length - 1 || reverseMessages[index + 1].sender !== message.sender) && <div className="text-text-muted">{message.senderName}</div>}
          <div
            className={`${message.sender === session?.user.id ? 'bg-primary-muted' : 'bg-bg-light'}  mb-2 px-4 py-2 rounded-md overflow-hidden`}
          >{message.content}</div>
        </div>
      ))
      }
    </div>
  );
}