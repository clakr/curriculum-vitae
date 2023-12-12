import prisma from "@/utils/prisma";
import Form from "./Form.client";
import Heading from "@/components/admin/Heading";

function formDataToObject(formData: FormData) {
  const object: { [index: string]: string } = {};

  for (const [key, value] of formData.entries()) {
    if (/^\$/.test(key)) continue;
    object[key] = value.toString();
  }

  return object;
}

async function handleSubmit(formData: FormData) {
  "use server";

  const data = formDataToObject(formData);

  await prisma.basicInformation.update({
    where: { id: data.id },
    data,
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
