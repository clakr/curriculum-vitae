"use client";

import Form from "@/components/admin/Form";
import { FormField } from "@/components/admin/FormField";
import FormSubmit from "@/components/admin/FormSubmit";
import { BasicInformation } from "@prisma/client";
import { FormProps } from "@radix-ui/react-form";

type Form = FormProps & { data: BasicInformation | null };

export default function FormClient({ data, ...props }: Form) {
  if (!data) return;

  const {
    id,
    firstName,
    middleName,
    lastName,
    position,
    address,
    email,
    phoneNumber,
  } = data;

  return (
    <Form className="flex flex-col gap-y-3 p-4" {...props}>
      <input type="hidden" name="id" defaultValue={id} />
      <FormField label="First Name" defaultValue={firstName} />
      <FormField label="Middle Name" defaultValue={middleName} />
      <FormField label="Last Name" defaultValue={lastName} />
      <FormField label="Position" defaultValue={position} />
      <FormField label="Address" defaultValue={address} asTextarea />
      <FormField label="Email" type="email" defaultValue={email} />
      <FormField label="Phone Number" defaultValue={phoneNumber} />
      <FormSubmit className="mt-3">Edit Basic Information</FormSubmit>
    </Form>
  );
}
