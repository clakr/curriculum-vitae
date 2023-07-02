import prisma from "@/utils/prisma";
import "./globals.css";
import { Inter } from "next/font/google";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const me = await prisma.basicInformation.findFirst();
  const about = await prisma.about.findMany();

  if (!me || !about) return {};

  return {
    title: `${me.firstName} ${me.lastName} - ${me.position}`,
    description: about.join(""),
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-neutral-50 text-neutral-950 [&>*>article:not(:first-child)]:mt-3 [&>*>section>article:not(:first-child)]:mt-3 [&>*>section]:border [&>*>section]:p-6 [&>aside]:border [&>aside]:p-6`}
      >
        {children}
      </body>
    </html>
  );
}
