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
          {abouts.map((about) => (
            <Table.BodyRow key={about.id}>
              <td>{about.desc}</td>
              <td>actions here</td>
            </Table.BodyRow>
          ))}
        </tbody>
      </Table>
    </Main>
  );
}
