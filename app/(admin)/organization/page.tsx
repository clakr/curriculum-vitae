import Main from "@/components/admin/Main";
import Table from "@/components/admin/Table";
import formatDate from "@/utils/formatDate";
import prisma from "@/utils/prisma";

export default async function Page() {
  const organizations = await prisma.organization.findMany();

  return (
    <Main heading="Organization">
      <Table>
        <Table.Head>
          <th>Name</th>
          <th>Location</th>
          <th>Position</th>
          <th>Mode</th>
          <th>Timeframe</th>
          <th></th>
        </Table.Head>
        <tbody>
          {organizations.map(
            ({
              id,
              name,
              location,
              position,
              mode,
              durationFrom,
              durationTo,
            }) => (
              <Table.BodyRow key={id}>
                <td>{name}</td>
                <td>{location}</td>
                <td>{position}</td>
                <td>{mode}</td>
                <td>{formatDate({ durationFrom, durationTo })}</td>
                <td>actions here</td>
              </Table.BodyRow>
            )
          )}
        </tbody>
      </Table>
    </Main>
  );
}
