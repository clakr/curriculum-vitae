import { Providers as ThemeProvider } from "@/components/providers/ThemeProvider";
import SessionProvider from "@/components/providers/SessionProvider";
import { getServerSession } from "next-auth";
import { PropsWithChildren } from "react";

export default async function Providers({ children }: PropsWithChildren) {
  const session = await getServerSession();

  return (
    <SessionProvider session={session}>
      <ThemeProvider>{children}</ThemeProvider>
    </SessionProvider>
  );
}
