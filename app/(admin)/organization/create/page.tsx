import Heading from "@/components/admin/Heading";
import FormClient from "./Form.client";
import formDataToObject from "@/utils/formDataToObject";

async function handleSubmit(formData: FormData) {
  "use server";

  const data = formDataToObject(formData);

  /**
   * {
  name: 'Adish International Corporation',
  city: 'MKC',
  philippines: 'philippines',
  position: 'Fullstack Web Developer',
  mode: 'wfh',
  started: '2023-04-12',
  present: 'present'
}
   */
}

export default function Page() {
  return (
    <>
      <Heading>Create Organization</Heading>
      <FormClient action={handleSubmit} />
    </>
  );
}
