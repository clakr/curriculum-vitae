import prisma from "@/utils/prisma";

export default async function Aside() {
  const me = await prisma.basicInformation.findFirst({
    select: {
      address: true,
      email: true,
      phoneNumber: true,
    },
  });
  const about = await prisma.about.findMany();

  return (
    <aside>
      {JSON.stringify(me, null, 2)} {JSON.stringify(about, null, 2)}
    </aside>
  );
}
