import prisma from "@/utils/prisma";
import Section from "./main/Section";
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
        <article
          className="ml-4 [&:not(:last-of-type)]:mb-8"
          key={experience.id}
        >
          <Organization {...experience.organization} />
          <ul className="list-inside list-disc text-sm leading-6">
            {experience.responsibilities.map((responsibility, index) => (
              <li key={index}>{responsibility}</li>
            ))}
          </ul>
        </article>
      ))}
    </Section>
  );
}
