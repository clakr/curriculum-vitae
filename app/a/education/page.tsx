import { getServerSession } from "next-auth";
import SignOutButton from "./SignOutButton";
import Section from "@/components/main/Section";

export default async function Page() {
  const session = await getServerSession();

  return (
    <main className="dark:after:absolute dark:after:inset-0 dark:after:-z-10 dark:after:bg-neutral-800 dark:after:opacity-90">
      this is a protected route{" "}
      {session?.user ? JSON.stringify(session.user, null, 2) : "null"}
      <SignOutButton />
    </main>
  );
}
