import Main from "@/components/admin/Main";
import Table from "@/components/admin/Table";
import prisma from "@/utils/prisma";

export default async function Page() {
  const experiences = await prisma.experience.findMany({
    select: {
      responsibilities: true,
      organization: { select: { id: true, name: true } },
    },
    orderBy: {
      organization: {
        durationFrom: "asc",
      },
    },
  });

  return (
    <Main heading="Experience">
      <div className="space-y-6 rounded-xl border border-neutral-300 bg-neutral-50/75 p-4 dark:border-neutral-600 dark:bg-neutral-950/75">
        {experiences.map(({ responsibilities, organization: { id, name } }) => (
          <article key={id} className="space-y-3">
            <h2 className="text-lg font-medium">{name}</h2>
            <Table>
              <Table.Head>
                <th>Responsibility</th>
                <th />
              </Table.Head>
              <tbody>
                {responsibilities.map((responsibility, index) => (
                  <Table.BodyRow key={index}>
                    <td>{responsibility}</td>
                    <td>actions here</td>
                  </Table.BodyRow>
                ))}
              </tbody>
            </Table>
          </article>
        ))}
      </div>
    </Main>
  );
}
