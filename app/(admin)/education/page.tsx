import Heading from "@/components/admin/Heading";
import Table, {
  TableHead,
  TableBodyRow,
  TableFoot,
} from "@/components/admin/Table";
import prisma from "@/utils/prisma";

export default async function Page() {
  const educations = await prisma.education.findMany({
    select: {
      id: true,
      degree: true,
      thesis: true,
      awards: true,
      organization: {
        select: { name: true },
      },
    },
    orderBy: { organization: { durationFrom: "asc" } },
  });

  return (
    <>
      <Heading>Education</Heading>
      <Table>
        <TableHead>
          <th>Organization Name</th>
          <th>Degree</th>
          <th>Thesis</th>
          <th>Awards</th>
          <th />
        </TableHead>
        <tbody>
          {educations.map(
            ({ id, degree, thesis, awards, organization: { name } }) => (
              <TableBodyRow key={id}>
                <td>{name}</td>
                <td>{degree}</td>
                <td>{thesis}</td>
                <td>{awards}</td>
                <td>actions here</td>
              </TableBodyRow>
            )
          )}
        </tbody>
        <TableFoot colSpan={5} />
      </Table>
    </>
  );
}
