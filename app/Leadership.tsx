import prisma from "@/utils/prisma";

export default async function Leadership() {
  const leaderships = await prisma.leadership.findMany();

  return (
    <section>
      {leaderships.map((leadership) => (
        <article key={leadership.id}>
          {JSON.stringify(leadership, null, 2)}
        </article>
      ))}
    </section>
  );
}
