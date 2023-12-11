import Heading from "@/components/admin/Heading";
import Table, {
  TableHead,
  TableBodyRow,
  TableFoot,
} from "@/components/admin/Table";
import prisma from "@/utils/prisma";

export default async function Page() {
  const experiences = await prisma.experience.findMany({
    select: {
      id: true,
      responsibilities: true,
      organization: { select: { name: true } },
    },
    orderBy: {
      organization: {
        durationFrom: "asc",
      },
    },
  });

  return (
    <>
      <Heading>Experience</Heading>
      <div className="space-y-6 rounded-xl border border-neutral-300 bg-neutral-50/75 p-4 dark:border-neutral-600 dark:bg-neutral-950/75">
        {experiences.map(({ id, responsibilities, organization: { name } }) => (
          <article key={id} className="space-y-3">
            <h2 className="text-lg font-medium">{name}</h2>
            <Table>
              <TableHead>
                <th>Responsibility</th>
                <th />
              </TableHead>
              <tbody>
                {responsibilities.map((responsibility, index) => (
                  <TableBodyRow key={index}>
                    <td>{responsibility}</td>
                    <td>actions here</td>
                  </TableBodyRow>
                ))}
              </tbody>
              <TableFoot colSpan={2} />
            </Table>
          </article>
        ))}
      </div>
    </>
  );
}
