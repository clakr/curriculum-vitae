import Section from "./Section";
import { Fragment } from "react";
import { GetData } from "@/utils/getData";

type Props = { data: Pick<GetData, "miscellaneous"> };

function formatList(list: string[]) {
  return new Intl.ListFormat("en", {
    style: "long",
    type: "conjunction",
  }).format(list);
}

export default async function Miscellaneous({
  data: { miscellaneous },
}: Props) {
  return (
    <Section>
      <dl className="tablet:grid tablet:grid-cols-[25%_1fr] tablet:gap-x-4 [&>dd:not(:last-child)]:mb-4 [&>dd]:ml-4 [&>dd]:text-sm [&>dt]:font-bold">
        {miscellaneous.map(({ id, type, list }) => (
          <Fragment key={id}>
            <dt>{type}</dt>
            <dd>{formatList(list)}</dd>
          </Fragment>
        ))}
      </dl>
    </Section>
  );
}
