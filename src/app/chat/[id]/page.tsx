
import MessageContainer from '@/components/MessageContainer'
import MessageInput from '@/components/MessageInput';
import { getUser } from '@/dal/user';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function Chat({
  params
}: {
  params: Promise<{ id: string }>
}) {

  const id = (await params).id

  const reciever = (id === 'global')
    ? {
      name: 'Global chat',
      email: 'Everyone can chat here'
    }
    : (await getUser(id));

  if (reciever === null) {
    return notFound();
  }

  return (
    <>
      <Link
        className='absolute top-4 left-4 bg-bg-light px-4 py-2 block mx-auto mt-1 border rounded-md border-border hover:bg-border transition'
        href="/"
      >Back</Link>

      <div className='h-screen flex flex-col p-8 w-300 mx-auto'>
        <h1 className="text-center text-2xl">{reciever.name}</h1>
        <p className='text-center text-text-muted mb-12'>{reciever.email}</p>
        <MessageContainer reciever={id === 'global' ? null : id} />
        <MessageInput reciever={id === 'global' ? null : id} />
      </div>
    </>
  );
}
