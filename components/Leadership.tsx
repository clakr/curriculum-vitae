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
        <article
          className="ml-4 [&:not(:last-of-type)]:mb-12"
          key={organization.id}
        >
          <Organization {...organization} />
          {leaderships
            .filter(
              (leadership) => leadership.organizationId === organization.id
            )
            .map((leadership) => (
              <article
                className="[&:not(:last-of-type)]:mb-6 [&>*:not(h5)]:text-sm [&>dl]:mb-4 [&>figure:not(:last-of-type)]:mb-4"
                key={leadership.id}
              >
                <h5 className="mb-1 font-bold">{leadership.course}</h5>
                <dl className="[&>dd]:ml-5 [&>dd]:leading-6 [&>dt]:mb-1 [&>dt]:font-bold">
                  <dt>Research Title</dt>
                  <dd>{leadership.project}</dd>
                </dl>
                <figure>
                  <figcaption className="mb-1 font-bold">
                    Other Positions
                  </figcaption>
                  <ul className="list-inside list-disc leading-6">
                    {leadership.positions.map((position, index) => (
                      <li key={index}>{position}</li>
                    ))}
                  </ul>
                </figure>
                {leadership.responsibilities.length ? (
                  <figure>
                    <figcaption className="mb-1 font-bold">
                      Responsibilities
                    </figcaption>
                    <ul className="list-inside list-disc leading-6">
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
