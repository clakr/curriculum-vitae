import Heading from "@/components/admin/Heading";
import Table from "@/components/admin/Table";
import formatList from "@/utils/formatList";
import prisma from "@/utils/prisma";

export default async function Page() {
  const technicals = await prisma.miscellaneous.findMany();

  return (
    <>
      <Heading>Miscellaneous</Heading>
      <Table>
        <Table.Head>
          <th>Type</th>
          <th>List</th>
          <th></th>
        </Table.Head>
        <tbody>
          {technicals.map(({ id, type, list }) => (
            <Table.BodyRow key={id}>
              <td>{type}</td>
              <td>{formatList(list)}</td>
              <td>actions here</td>
            </Table.BodyRow>
          ))}
        </tbody>
      </Table>
    </>
  );
}
