import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";


export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers()
  })
  if (!session) {
    redirect("/login")
  }

  return (
    <>
      <h1 className="text-center mt-8 text-2xl">Home page</h1>
    </>
  );
}
