"use client";

import { sendMessage } from "@/actions/send-message";
import { useState, type KeyboardEvent } from "react";

export default function MessageInput({ reciever }: { reciever: string | null }) {
  const [message, setMessage] = useState('');

  async function send() {
    sendMessage(reciever, message);
    setMessage('');
  }

  function searchBarKeyPressed(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      send();
    }
  }

  return (
    <div className="flex gap-2 mt-4">
      <input
        className="bg-bg-light px-4 py-2 flex-1 rounded-md"
        type="text"
        value={message}
        onChange={event => setMessage(event.target.value)}
        onKeyDown={searchBarKeyPressed}
      />
      <button className="bg-primary-bg p-2 rounded-xl hover:bg-primary-muted transition cursor-pointer" onClick={send}>Send</button>
    </div>
  )
}