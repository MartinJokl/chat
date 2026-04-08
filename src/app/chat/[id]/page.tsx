
import MessageContainer from '@/components/MessageContainer'
import MessageInput from '@/components/MessageInput';
import { getUser } from '@/dal/user';
import { notFound } from 'next/navigation';

export default async function Chat({
  params
}: {
  params: Promise<{ id: string }>
}) {

  const id = (await params).id

  const recieverName = (id === 'global') ? 'Global chat' : (await getUser(id));

  if (recieverName === null) {
    return notFound();
  }

  return (
    <div className='h-screen flex flex-col p-8 w-300 mx-auto'>
      <h1 className="text-center text-2xl mb-12">{recieverName}</h1>
      <MessageContainer reciever={id === 'global' ? null : id} />
      <MessageInput reciever={id === 'global' ? null : id} />
    </div>
  );
}
