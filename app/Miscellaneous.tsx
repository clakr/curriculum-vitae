import prisma from "@/utils/prisma";

export default async function Miscellaneous() {
  const miscellaneouses = await prisma.miscellaneous.findMany();

  return (
    <section>
      {miscellaneouses.map((miscellaneous) => (
        <article key={miscellaneous.id}>
          {JSON.stringify(miscellaneous, null, 2)}
        </article>
      ))}
    </section>
  );
}
