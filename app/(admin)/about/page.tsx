import Main from "@/components/admin/Main";
import Table from "@/components/admin/Table";
import prisma from "@/utils/prisma";

export default async function Page() {
  const abouts = await prisma.about.findMany();

  return (
    <Main heading="About">
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
    </Main>
  );
}
