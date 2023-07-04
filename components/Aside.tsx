import prisma from "@/utils/prisma";

async function getData() {
  const me = await prisma.basicInformation.findFirst({
    select: {
      address: true,
      email: true,
      phoneNumber: true,
    },
  });
  const abouts = await prisma.about.findMany();

  return { me, abouts };
}

export default async function Aside() {
  const { me, abouts } = await getData();

  return (
    <aside className="hidden laptop:block">
      <article>{JSON.stringify(me, null, 2)}</article>
      <article>{JSON.stringify(abouts, null, 2)}</article>
    </aside>
  );
}
