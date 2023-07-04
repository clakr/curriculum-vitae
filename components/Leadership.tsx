import prisma from "@/utils/prisma";
import Organization from "./Organization";
import Section from "./main/Section";

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

  const organizations = leaderships.map(
    (leadership) => leadership.organization
  );

  const uniqueOrganizations = organizations.filter(
    (filterValue, index) =>
      organizations.findIndex(
        (findIndexValue) => filterValue.id === findIndexValue.id
      ) === index
  );

  return (
    <Section heading="Leadership">
      {uniqueOrganizations.map((organization) => (
        <article key={organization.id}>
          <Organization {...organization} />
          {leaderships
            .filter(
              (leadership) => leadership.organizationId === organization.id
            )
            .map((leadership) => (
              <article
                className="[&:not(:last-of-type)]:mb-4 [&>dl]:mb-2 [&>figure]:mb-2"
                key={leadership.id}
              >
                <h5 className="font-bold">{leadership.course}</h5>
                <dl className="[&>dt]:font-semibold">
                  <dt>Project</dt>
                  <dd>{leadership.project}</dd>
                </dl>
                <figure>
                  <figcaption className="font-semibold">
                    Other Positions
                  </figcaption>
                  <ul>
                    {leadership.positions.map((position, index) => (
                      <li key={index}>{position}</li>
                    ))}
                  </ul>
                </figure>
                {leadership.responsibilities.length ? (
                  <figure>
                    <figcaption className="font-semibold">
                      Responsibilities
                    </figcaption>
                    <ul>
                      {leadership.responsibilities.map(
                        (responsibility, index) => (
                          <li key={index}>{responsibility}</li>
                        )
                      )}
                    </ul>
                  </figure>
                ) : null}
              </article>
            ))}
        </article>
      ))}
    </Section>
  );
}
