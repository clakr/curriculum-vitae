import Heading from "@/components/admin/Heading";
import Table, {
  TableHead,
  TableBodyRow,
  TableFoot,
} from "@/components/admin/Table";
import formatDate from "@/utils/formatDate";
import prisma from "@/utils/prisma";

export default async function Page() {
  const organizations = await prisma.organization.findMany({
    orderBy: { durationFrom: "asc" },
  });

  return (
    <>
      <Heading>Organization</Heading>
      <Table>
        <TableHead>
          <th>Name</th>
          <th>Location</th>
          <th>Position</th>
          <th>Mode</th>
          <th>Timeframe</th>
          <th></th>
        </TableHead>
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
              <TableBodyRow
                key={id}
                className="[&>td:not(:first-child)]:text-center"
              >
                <td>{name}</td>
                <td>{location}</td>
                <td>{position}</td>
                <td>{mode}</td>
                <td>{formatDate({ durationFrom, durationTo })}</td>
                <td>actions here</td>
              </TableBodyRow>
            )
          )}
        </tbody>
        <TableFoot colSpan={6} />
      </Table>
    </>
  );
}
