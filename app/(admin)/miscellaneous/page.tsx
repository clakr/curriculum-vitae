import Heading from "@/components/admin/Heading";
import Table, {
  TableHead,
  TableBodyRow,
  TableFoot,
} from "@/components/admin/Table";
import formatList from "@/utils/formatList";
import prisma from "@/utils/prisma";

export default async function Page() {
  const technicals = await prisma.miscellaneous.findMany();

  return (
    <>
      <Heading>Miscellaneous</Heading>
      <Table>
        <TableHead>
          <th>Type</th>
          <th>List</th>
          <th></th>
        </TableHead>
        <tbody>
          {technicals.map(({ id, type, list }) => (
            <TableBodyRow key={id}>
              <td>{type}</td>
              <td>{formatList(list)}</td>
              <td>actions here</td>
            </TableBodyRow>
          ))}
        </tbody>
        <TableFoot colSpan={3} />
      </Table>
    </>
  );
}
