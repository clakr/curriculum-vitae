import prisma from "@/utils/prisma";
import Section from "./main/Section";
import Organization from "./Organization";

export default async function Education() {
  const educations = await prisma.education.findMany({
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
    <Section heading="Education">
      {educations.map((education) => (
        <article className="[&:not(:last-of-type)]:mb-4" key={education.id}>
          <Organization {...education.organization} />
          <dl className="[&>dd:not(:last-child)]:mb-2 [&>dt]:font-semibold">
            {education.degree ? (
              <>
                <dt>Degree</dt>
                <dd>{education.degree}</dd>
              </>
            ) : null}
            {education.thesis ? (
              <>
                <dt>Thesis/Capstone</dt>
                <dd>{education.thesis}</dd>
              </>
            ) : null}
            {education.awards ? (
              <>
                <dt>Awards</dt>
                <dd>{education.awards}</dd>
              </>
            ) : null}
          </dl>
        </article>
      ))}
    </Section>
  );
}
