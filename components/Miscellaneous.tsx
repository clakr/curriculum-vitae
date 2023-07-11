import prisma from "@/utils/prisma";
import Section from "./main/Section";

function formatList(list: string[]) {
  return new Intl.ListFormat("en", {
    style: "long",
    type: "conjunction",
  }).format(list);
}

export default async function Miscellaneous() {
  const miscellaneouses = await prisma.miscellaneous.findMany();

  return (
    <Section>
      <dl className="[&>dd:not(:last-child)]:mb-4 [&>dd]:ml-4 [&>dd]:text-sm [&>dt]:font-semibold">
        {miscellaneouses.map((miscellaneous) => (
          <>
            <dt>{miscellaneous.type}</dt>
            <dd>{formatList(miscellaneous.list)}</dd>
          </>
        ))}
      </dl>
    </Section>
  );
}
