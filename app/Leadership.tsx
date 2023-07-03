import prisma from "@/utils/prisma";
import Organization from "./Organization";
import Section from "./Section";

export default async function Leadership() {
  const leaderships = await prisma.leadership.findMany({
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
    <Section heading="Leadership">
      {leaderships.map((leadership) => (
        <article key={leadership.id}>
          <Organization {...leadership.organization} />
          {JSON.stringify(leadership, null, 2)}
        </article>
      ))}
    </Section>
  );
}
