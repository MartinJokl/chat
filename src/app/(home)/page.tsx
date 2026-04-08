import { getGlobalMessages } from "@/dal/message";

export default async function Home() {
  const messages = await getGlobalMessages();

  return (
    <>
      <h1 className="text-center mt-8 text-2xl">Home page</h1>
    </>
  );
}
