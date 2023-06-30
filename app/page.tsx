import { PrismaClient } from "@prisma/client";

export const revalidate = 5;

const prisma = new PrismaClient();

export default async function Home() {
  const me = await prisma.basicInformation.findFirst();

  return <main className="bg-red-400">{JSON.stringify(me, null, 2)}</main>;
}
