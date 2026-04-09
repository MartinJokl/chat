export type RecievingMessage = {
  id: number
  sender: string,
  senderName: string | null,
  content: string,
  createdAtUTC: Date,
  reciever: string | null
}

export function isRecievingMessage(data: object): data is RecievingMessage {
  const potencialMessage = data as RecievingMessage
  return potencialMessage.content !== undefined
    && potencialMessage.createdAtUTC !== undefined
    && potencialMessage.id !== undefined
    && potencialMessage.sender !== undefined
    && potencialMessage.senderName !== undefined
    && potencialMessage.reciever !== undefined
}

export type SendingMessage = {
  reciever: string,
  content: string,
}

export function isSendingMessage(data: object): data is SendingMessage {
  const potencialMessage = data as SendingMessage
  return potencialMessage.content !== undefined
    && potencialMessage.reciever !== undefined
}