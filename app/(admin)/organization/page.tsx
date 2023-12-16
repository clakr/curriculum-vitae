import Heading from "@/components/admin/Heading";
import Table, {
  TableHead,
  TableBodyRow,
  TableFoot,
} from "@/components/admin/Table";
import formDataToObject from "@/utils/formDataToObject";
import formatDate from "@/utils/formatDate";
import prisma from "@/utils/prisma";
import { revalidatePath } from "next/cache";
import { FaTrash } from "react-icons/fa6";

async function handleDelete(formData: FormData) {
  "use server";

  const { id } = formDataToObject(formData);

  await prisma.organization.delete({
    where: {
      id,
    },
  });

  revalidatePath("/organizations");
}

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
                <td>
                  <form>
                    <input type="hidden" name="id" value={id} />
                    <button formAction={handleDelete}>
                      <FaTrash />
                    </button>
                  </form>
                </td>
              </TableBodyRow>
            )
          )}
        </tbody>
        <TableFoot colSpan={6} />
      </Table>
    </>
  );
}
