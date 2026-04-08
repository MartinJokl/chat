
import GlobalMessageContainer from '@/components/GlobalMessageContainer'
import MessageInput from '@/components/MessageInput';

export default async function Home() {
  return (
    <div className='h-screen flex flex-col p-8 w-300 mx-auto'>
      <h1 className="text-center mt-8 text-2xl mb-12">Global chat</h1>
      <GlobalMessageContainer />
      <MessageInput reciever={null} />
    </div>
  );
}
