import prisma from "@/utils/prisma";

export default async function Header() {
  const me = await prisma.basicInformation.findFirst();

  return <header>{JSON.stringify(me, null, 2)}</header>;
}
