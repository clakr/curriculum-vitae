import Heading from "@/components/admin/Heading";
import Table, {
  TableHead,
  TableBodyRow,
  TableFoot,
} from "@/components/admin/Table";
import getUniqueOrganizations from "@/utils/getUniqueOrganizations";
import prisma from "@/utils/prisma";

export default async function Page() {
  const leaderships = await prisma.leadership.findMany({
    select: {
      id: true,
      course: true,
      project: true,
      positions: true,
      responsibilities: true,
      organizationId: true,
      organization: true,
    },
    orderBy: {
      organization: { durationFrom: "desc" },
    },
  });

  const organizations = leaderships.map(
    (leadership) => leadership.organization
  );

  const uniqueOrganizations = getUniqueOrganizations(organizations);

  return (
    <>
      <Heading>Leadership</Heading>
      <div className="space-y-6 rounded-xl border border-neutral-300 bg-neutral-50/75 p-4 dark:border-neutral-600 dark:bg-neutral-950/75">
        {uniqueOrganizations.map((organization) => (
          <article key={organization.id} className="space-y-3">
            <h2 className="text-lg font-medium">{organization.name}</h2>
            <Table>
              <TableHead>
                <th>Course</th>
                <th>Project</th>
                <th>Positions</th>
                <th>Responsibilities</th>
                <th />
              </TableHead>
              <tbody>
                {leaderships
                  .filter(
                    (leadership) =>
                      leadership.organizationId === organization.id
                  )
                  .map(
                    ({ id, course, project, positions, responsibilities }) => (
                      <TableBodyRow key={id}>
                        <td>{course}</td>
                        <td>{project}</td>
                        <td>
                          <List list={positions} />
                        </td>
                        <td>
                          <List list={responsibilities} />
                        </td>
                        <td>actions here</td>
                      </TableBodyRow>
                    )
                  )}
              </tbody>
              <TableFoot colSpan={5} />
            </Table>
          </article>
        ))}
      </div>
    </>
  );
}

type ListProps = { list: Array<string> };

function List({ list }: ListProps) {
  return (
    <ul className="list-inside list-disc space-y-1.5">
      {list.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}
