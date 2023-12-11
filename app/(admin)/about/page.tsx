import Heading from "@/components/admin/Heading";
import Table, {
  TableHead,
  TableBodyRow,
  TableFoot,
} from "@/components/admin/Table";
import prisma from "@/utils/prisma";

/**
 * Todo
 * - [] add ordering sa about
 * - [] drag n drop
 */

export default async function Page() {
  const abouts = await prisma.about.findMany();

  return (
    <>
      <Heading>About</Heading>
      <Table>
        <TableHead>
          <th>Description</th>
        </TableHead>
        <tbody>
          {abouts.map(({ id, desc }) => (
            <TableBodyRow key={id}>
              <td>{desc}</td>
              <td>actions here</td>
            </TableBodyRow>
          ))}
        </tbody>
        <TableFoot colSpan={2} />
      </Table>
    </>
  );
}
