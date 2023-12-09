import { PropsWithChildren } from "react";
import Providers from "../../components/providers/Providers";
import { Inter } from "next/font/google";
import prisma from "@/utils/prisma";
import { Metadata } from "next";
import "../globals.css";
import Aside from "@/components/admin/Aside";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const me = await prisma.basicInformation.findFirst();
  if (!me) return {};

  return {
    title: `${me.firstName} ${me.lastName} - ${me.position}`,
  };
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-neutral-200 bg-noise text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200`}
      >
        <Providers>
          <Aside />
          <main className="ml-60 p-6 dark:after:absolute dark:after:inset-0 dark:after:-z-10 dark:after:bg-neutral-800 dark:after:opacity-90">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
