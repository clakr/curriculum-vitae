import prisma from "@/utils/prisma";
import Section from "./Section";
import Organization from "./Organization";

export default async function Experience() {
  const experiences = await prisma.experience.findMany({
    include: {
      organization: true,
    },
    orderBy: {
      organization: {
        durationFrom: "desc",
      },
    },
  });

  return (
    <Section heading="Experience">
      {experiences.map((experience) => (
        <article key={experience.id}>
          <Organization {...experience.organization} />
          <ul className="list-inside list-disc">
            {experience.responsibilities.map((responsibility, index) => (
              <li key={index}>{responsibility}</li>
            ))}
          </ul>
        </article>
      ))}
    </Section>
  );
}
