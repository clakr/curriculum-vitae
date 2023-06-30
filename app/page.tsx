import { PrismaClient } from "@prisma/client";

export const revalidate = 5;

const prisma = new PrismaClient();
async function prismaExample() {
  const users = await prisma.user.findMany();
  return users;
}

export default async function Home() {
  const user = await prismaExample();

  return <main className="bg-red-400">{JSON.stringify(user, null, 2)}</main>;
}
