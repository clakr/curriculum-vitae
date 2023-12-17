import Section from "./Section";
import Organization from "./Organization";
import { GetData } from "@/utils/getData";

type Props = { data: Pick<GetData, "education"> };

export default async function Education({ data: { education } }: Props) {
  return (
    <Section heading="Education">
      {education.map(({ id, degree, thesis, awards, organization }) => (
        <article className="ml-4 [&:not(:last-of-type)]:mb-8" key={id}>
          <Organization {...organization} />
          <dl className="tablet:grid tablet:grid-cols-[25%_1fr] tablet:gap-x-4 [&>*]:text-sm [&>dd:not(:last-child)]:mb-2 [&>dt]:font-bold [&>dt]:text-neutral-950/75 dark:[&>dt]:text-neutral-200/75">
            {degree ? (
              <>
                <dt>Degree</dt>
                <dd>{degree}</dd>
              </>
            ) : null}
            {thesis ? (
              <>
                <dt>Thesis/Capstone</dt>
                <dd>{thesis}</dd>
              </>
            ) : null}
            {awards ? (
              <>
                <dt>Awards</dt>
                <dd>{awards}</dd>
              </>
            ) : null}
          </dl>
        </article>
      ))}
    </Section>
  );
}
