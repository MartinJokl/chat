"use client";

import { use, useEffect, useRef, useState } from "react";
import MessageContainer from "./MessageContainer";
import MessageInput from "./MessageInput";
import { isRecievingMessage, RecievingMessage } from "../types/message";
import { authClient } from "../lib/auth-client";
import NotificationBox from "./NotificationBox";

export default function ChatContainer({ reciever, initialMessagesPromise }: { reciever: string | null, initialMessagesPromise: Promise<RecievingMessage[]> }) {
  const wsRef = useRef<WebSocket | null>(null);

  const initialMessages = use(initialMessagesPromise)
  const [messages, setMessages] = useState<RecievingMessage[]>(initialMessages);

  const [notification, setNotification] = useState<{
    title: string,
    description: string,
    show: boolean
  }>({
    title: '',
    description: '',
    show: false
  })

  const userId = authClient.useSession().data?.user.id;


  useEffect(() => {
    function tryShowNotification(message: RecievingMessage) {
      if (!(message.reciever === userId && reciever !== message.sender)) {
        return;
      }
      const maxNotificationDescriptionLength = 30;
      const description = message.content.length <= maxNotificationDescriptionLength
        ? message.content
        : `${message.content.substring(0, maxNotificationDescriptionLength - 3)}...`

      setNotification({
        title: `${message.senderName} sent you a message.`,
        description,
        show: true
      });
      setTimeout(() => {
        setNotification(oldNotification => ({
          ...oldNotification,
          show: false
        }));
      }, 3000)
    }
    function isInThisChat(message: RecievingMessage) {
      return (
        (reciever === 'global' && message.reciever === null)
        || (message.reciever === userId && reciever === message.sender)
        || message.sender === userId);
    }

    const socketURL = `ws://${window.location.host}/messages`;
    const ws = new WebSocket(socketURL);
    wsRef.current = ws
    ws.onmessage = ({ data }) => {
      const message = JSON.parse(data);
      if (!isRecievingMessage(message)) {
        console.log('Not a message');
        return;
      }
      if (!isInThisChat(message)) {
        tryShowNotification(message);
        return;
      }

      setMessages(messages => [
        ...messages,
        {
          ...message,
          createdAtUTC: new Date(message.createdAtUTC)
        }
      ]);
    };

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
      <NotificationBox notification={notification} />
    </>
  )
} 