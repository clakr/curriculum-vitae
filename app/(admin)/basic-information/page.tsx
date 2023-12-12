import prisma from "@/utils/prisma";
import Form from "./Form.client";
import Heading from "@/components/admin/Heading";
import formDataToObject from "@/utils/formDataToObject";

async function handleSubmit(formData: FormData) {
  "use server";

  const { id, ...rest } = formDataToObject(formData);

  await prisma.basicInformation.update({
    where: { id },
    data: { ...rest },
  });
}

export default async function Page() {
  const info = await prisma.basicInformation.findFirst();

  return (
    <>
      <Heading>Basic Information</Heading>
      <Form action={handleSubmit} data={info} />
    </>
  );
}
