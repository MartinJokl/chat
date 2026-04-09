
import ChatContainer from '../../../components/ChatContainer';
import { getGlobalMessages, getMessages } from '../../../dal/message';
import { getUser } from '../../../dal/user';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export default async function Chat({
  params
}: {
  params: Promise<{ id: string }>
}) {

  const recieverId = (await params).id

  const reciever = (recieverId === 'global')
    ? {
      name: 'Global chat',
      email: 'Everyone can chat here'
    }
    : (await getUser(recieverId));

  if (reciever === null) {
    return notFound();
  }

  const messages = recieverId === 'global' ? getGlobalMessages() : getMessages(recieverId);

  return (
    <>
      <Link
        className='absolute top-4 left-4 bg-bg-light px-4 py-2 block mx-auto mt-1 border rounded-md border-border hover:bg-border transition'
        href="/"
      >Back</Link>

      <div className='h-screen flex flex-col p-8 w-300 mx-auto'>
        <h1 className="text-center text-2xl">{reciever.name}</h1>
        <p className='text-center text-text-muted mb-12'>{reciever.email}</p>
        <Suspense fallback={<p>Loading messages...</p>} >
          <ChatContainer reciever={recieverId} initialMessagesPromise={messages} />
        </Suspense>
      </div>
    </>
  );
}
