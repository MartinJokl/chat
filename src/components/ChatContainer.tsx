"use client";

import { use, useEffect, useRef, useState } from "react";
import MessageContainer from "./MessageContainer";
import MessageInput from "./MessageInput";
import { isRecievingMessage, RecievingMessage } from "../types/message";
import { authClient } from "../lib/auth-client";

export default function ChatContainer({ reciever, initialMessagesPromise }: { reciever: string | null, initialMessagesPromise: Promise<RecievingMessage[]> }) {
  const wsRef = useRef<WebSocket | null>(null);

  const initialMessages = use(initialMessagesPromise)
  const [messages, setMessages] = useState<RecievingMessage[]>(initialMessages);

  const userId = authClient.useSession().data?.user.id

  useEffect(() => {
    const socketURL = `ws://${window.location.host}/messages`;
    const ws = new WebSocket(socketURL);
    wsRef.current = ws
    ws.onmessage = ({ data }) => {
      const message = JSON.parse(data);
      if (isRecievingMessage(message)) {
        console.log(reciever)
        console.log(message.reciever)
        if (!((reciever === 'global' && message.reciever === null) || (message.reciever === userId && reciever === message.sender) || message.sender === userId)) {
          return;
        }
        setMessages(messages => [
          ...messages,
          {
            ...message,
            createdAtUTC: new Date(message.createdAtUTC)
          }

        ])
      }
      else {
        console.log('Not a message')
      }
    }

    return () => {
      ws.close();
    }
  }, [reciever, userId]);

  function sendMessage(content: string) {
    wsRef.current?.send(JSON.stringify({
      content,
      reciever: reciever === 'global' ? null : reciever
    }));
  }

  return (
    <>
      <MessageContainer messages={messages} userId={userId} />
      <MessageInput sendMessage={sendMessage} />
    </>
  )
} 