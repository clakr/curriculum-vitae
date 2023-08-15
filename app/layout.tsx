import prisma from "@/utils/prisma";
import "./globals.css";
import { Inter } from "next/font/google";
import { Metadata } from "next";
import { Providers as ThemeProvider } from "@/components/ThemeProvider";

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
        className={`${inter.className} bg-neutral-200 bg-noise text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200 laptop:grid laptop:grid-cols-[65%_1fr] laptopLarge:grid-cols-[70%_1fr]`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
