import Main from "@/components/admin/Main";
import Table from "@/components/admin/Table";
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
    <Main heading="Education">
      <Table>
        <Table.Head>
          <th>Organization Name</th>
          <th>Degree</th>
          <th>Thesis</th>
          <th>Awards</th>
          <th />
        </Table.Head>
        <tbody>
          {educations.map(
            ({ id, degree, thesis, awards, organization: { name } }) => (
              <Table.BodyRow key={id}>
                <td>{name}</td>
                <td>{degree}</td>
                <td>{thesis}</td>
                <td>{awards}</td>
                <td>actions here</td>
              </Table.BodyRow>
            )
          )}
        </tbody>
      </Table>
    </Main>
  );
}
