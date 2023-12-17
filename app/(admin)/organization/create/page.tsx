import Heading from "@/components/admin/Heading";
import Form from "../Form.client";
import formDataToObject from "@/utils/formDataToObject";
import prisma from "@/utils/prisma";

async function handleSubmit(formData: FormData) {
  "use server";

  const data = formDataToObject(formData);
  const { name, city, country, position, mode, started, finished } = data;

  await prisma.organization.create({
    data: {
      name,
      location: "philippines" in data ? `${city}, PH` : `${city}, ${country}`,
      position,
      mode: mode === "n/a" ? "" : mode.toLocaleUpperCase(),
      durationFrom: new Date(started),
      durationTo: "present" in data ? null : new Date(finished),
    },
  });
}

export default function Page() {
  return (
    <>
      <Heading>Create Organization</Heading>
      <Form action={handleSubmit} />
    </>
  );
}
