import prisma from "@/utils/prisma";
import Section from "./Section";

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
          <div className="flex flex-wrap items-baseline gap-x-4 [&>*]:whitespace-nowrap">
            <h4 className="text-lg font-bold">{education.organization.name}</h4>
            <span className="text-sm font-extrabold">
              {education.organization.location}
            </span>
          </div>
          <div className="mb-2 text-sm font-medium">
            {education.organization.durationFrom.toISOString()} -{" "}
            {education.organization.durationTo?.toISOString()}
          </div>
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
