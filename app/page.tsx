import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function prismaExample() {
  const users = await prisma.user.findMany();
  return users;
}

export default async function Home() {
  const user = await prismaExample();

  return <main className="bg-red-400">{JSON.stringify(user, null, 2)}</main>;
}
