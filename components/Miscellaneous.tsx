import prisma from "@/utils/prisma";
import Section from "./main/Section";
import { Fragment } from "react";
import formatList from "@/utils/formatList";

export default async function Miscellaneous() {
  const miscellaneouses = await prisma.miscellaneous.findMany();

  return (
    <Section>
      <dl className="tablet:grid tablet:grid-cols-[25%_1fr] tablet:gap-x-4 [&>dd:not(:last-child)]:mb-4 [&>dd]:ml-4 [&>dd]:text-sm [&>dt]:font-bold">
        {miscellaneouses.map(({ id, type, list }) => (
          <Fragment key={id}>
            <dt>{type}</dt>
            <dd>{formatList(list)}</dd>
          </Fragment>
        ))}
      </dl>
    </Section>
  );
}
