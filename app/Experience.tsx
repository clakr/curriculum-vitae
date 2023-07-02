import prisma from "@/utils/prisma";

export default async function Experience() {
  const experiences = await prisma.experience.findMany();

  return (
    <section>
      {experiences.map((experience) => (
        <article key={experience.id}>
          {JSON.stringify(experience, null, 2)}
        </article>
      ))}
    </section>
  );
}
