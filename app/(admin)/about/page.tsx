import Heading from "@/components/admin/Heading";
import Table from "@/components/admin/Table";
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
        <Table.Head>
          <th>Description</th>
        </Table.Head>
        <tbody>
          {abouts.map(({ id, desc }) => (
            <Table.BodyRow key={id}>
              <td>{desc}</td>
              <td>actions here</td>
            </Table.BodyRow>
          ))}
        </tbody>
      </Table>
    </>
  );
}
