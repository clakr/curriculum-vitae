import Main from "@/components/admin/Main";
import Table from "@/components/admin/Table";
import prisma from "@/utils/prisma";

export default async function Page() {
  const info = await prisma.basicInformation.findFirst();

  return <Main heading="Contact">{JSON.stringify(info, null, 2)}</Main>;
}
