import getSession from "@/dal/get-session-cache";
import { getGlobalMessages, getMessages } from "@/dal/message";


export default async function MessageContainer({ reciever }: { reciever: string | null }) {

  const session = await getSession();

  const messages = await (reciever === null ? getGlobalMessages() : getMessages(reciever));

  return (
    <div className="flex-1 overflow-auto dark-scrollbar flex flex-col">
      {messages.map((message, index) => (
        <div
          className={`${message.sender === session?.user.id ? 'ml-auto text-right' : ''} w-max max-w-[80%]`}
          key={message.id}
        >
          {(index === 0 || messages[index - 1].sender !== message.sender) && <div className="text-text-muted">{message.senderName}</div>}
          <div
            className={`${message.sender === session?.user.id ? 'bg-primary-muted' : 'bg-bg-light'}  mb-2 px-4 py-2 rounded-md overflow-hidden`}
          >{message.content}</div>
        </div>
      ))}
      {messages.length === 0 && (
        <p className="text-text-muted text-center mb-8">There are no messages yet</p>
      )}
    </div>
  );
}