"use client";

import Form from "@/components/admin/Form";
import { FormField } from "@/components/admin/FormField";
import { BasicInformation } from "@prisma/client";
import * as RadixForm from "@radix-ui/react-form";

type Form = RadixForm.FormProps & { data: BasicInformation | null };

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
      <RadixForm.Submit className="mt-3 rounded-[4px] border border-neutral-300 bg-neutral-200 py-2 text-sm hover:border-neutral-400 hover:bg-neutral-300 focus:border-neutral-400 focus:bg-neutral-300 focus:outline-neutral-950 disabled:bg-red-400 dark:border-neutral-600 dark:bg-neutral-700 dark:hover:border-neutral-700 dark:hover:bg-neutral-800 dark:focus:border-neutral-700 dark:focus:bg-neutral-800 dark:focus:outline-neutral-50">
        Edit Basic Information
      </RadixForm.Submit>
    </Form>
  );
}
