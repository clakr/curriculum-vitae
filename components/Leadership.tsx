import Organization from "./Organization";
import Section from "./Section";
import { GetData } from "@/utils/getData";

type Props = { data: Pick<GetData, "leadership"> };

export default async function Leadership({ data: { leadership } }: Props) {
  const organizations = leadership.map(({ organization }) => organization);

  const uniqueOrganizations = organizations.filter(
    (filterValue, index) =>
      organizations.findIndex(
        (findIndexValue) => filterValue.id === findIndexValue.id
      ) === index
  );

  return (
    <Section heading="Leadership">
      {uniqueOrganizations.map(({ id: organizationId, ...rest }) => (
        <article
          className="ml-4 [&:not(:last-of-type)]:mb-12"
          key={organizationId}
        >
          <Organization id={organizationId} {...rest} />
          {leadership
            .filter(
              ({ organizationId: leadershipOrganizationId }) =>
                leadershipOrganizationId === organizationId
            )
            .map(({ id, course, project, positions, responsibilities }) => (
              <article
                className="[&:not(:last-of-type)]:mb-6 [&>*:not(h5)]:text-sm [&>dl]:mb-4 [&>figure:not(:last-of-type)]:mb-4"
                key={id}
              >
                <h5 className="mb-1 font-bold">{course}</h5>
                <dl className="[&>dd]:ml-5 [&>dd]:leading-6 [&>dt]:mb-1 [&>dt]:font-bold [&>dt]:text-neutral-950/75 dark:[&>dt]:text-neutral-200/75">
                  <dt>Research Title</dt>
                  <dd>{project}</dd>
                </dl>
                <figure>
                  <figcaption className="mb-1 font-bold text-neutral-950/75 dark:text-neutral-200/75">
                    Other Positions
                  </figcaption>
                  <ul className="list-inside list-disc leading-6">
                    {positions.map((position, index) => (
                      <li key={index}>{position}</li>
                    ))}
                  </ul>
                </figure>
                {responsibilities.length ? (
                  <figure>
                    <figcaption className="mb-1 font-bold text-neutral-950/75 dark:text-neutral-200/75">
                      Responsibilities
                    </figcaption>
                    <ul className="list-inside list-disc leading-6">
                      {responsibilities.map((responsibility, index) => (
                        <li key={index}>{responsibility}</li>
                      ))}
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
