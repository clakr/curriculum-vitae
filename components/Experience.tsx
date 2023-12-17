import Section from "./Section";
import Organization from "./Organization";
import { GetData } from "@/utils/getData";

type Props = { data: Pick<GetData, "experience"> };

export default async function Experience({ data: { experience } }: Props) {
  return (
    <Section heading="Experience">
      {experience.map(({ id, responsibilities, organization }) => (
        <article className="ml-4 [&:not(:last-of-type)]:mb-8" key={id}>
          <Organization {...organization} />
          <ul className="list-inside list-disc text-sm leading-6">
            {responsibilities.map((responsibility, index) => (
              <li key={index}>{responsibility}</li>
            ))}
          </ul>
        </article>
      ))}
    </Section>
  );
}
