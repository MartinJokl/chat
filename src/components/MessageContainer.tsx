"use client";

import { RecievingMessage } from "../types/message";
import { Fragment } from "react/jsx-runtime";


export default function MessageContainer({ messages, userId }: { messages: RecievingMessage[], userId: string | undefined }) {

  const milisecondsToShowTimeAgain = 1000 * 60 * 30;
  const milisecondsToShowDate = 1000 * 60 * 60 * 24;

  return (
    <div className="flex-1 overflow-auto dark-scrollbar flex flex-col">
      {messages.map((message, index) => {
        return (
          <Fragment key={message.id}>
            {(index === 0 || message.createdAtUTC.getTime() - messages[index - 1].createdAtUTC.getTime() >= milisecondsToShowTimeAgain)
              && (
                <p className="text-center text-text-muted">
                  {((new Date()).getTime() - message.createdAtUTC.getTime() >= milisecondsToShowDate)
                    ? message.createdAtUTC.toLocaleString()
                    : message.createdAtUTC.toLocaleTimeString()}
                </p>
              )}
            <div
              className={`${message.sender === userId ? 'ml-auto text-right' : ''} w-max max-w-[80%]`}
            >
              {(index === 0 || messages[index - 1].sender !== message.sender)
                && (
                  <div className="text-text-muted">{message.senderName}</div>
                )}

              <div
                className={`${message.sender === userId ? 'bg-primary-muted' : 'bg-bg-light'}  mb-2 px-4 py-2 rounded-md overflow-hidden`}
              >{message.content}</div>
            </div>
          </Fragment>
        )
      })}
    </div>
  );
}