import prisma from "@/utils/prisma";
import Section from "./Section";

export default async function Experience() {
  const experiences = await prisma.experience.findMany();

  return (
    <Section heading="Experience">
      {experiences.map((experience) => (
        <article key={experience.id}>
          {JSON.stringify(experience, null, 2)}
        </article>
      ))}
    </Section>
  );
}
