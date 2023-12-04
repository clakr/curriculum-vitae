"use client";

import { BasicInformation } from "@prisma/client";
import * as RadixForm from "@radix-ui/react-form";
import { cx } from "cva";
import { twMerge } from "tailwind-merge";

type Form = RadixForm.FormProps & { data: BasicInformation | null };

type FormField = RadixForm.FormControlProps & {
  label: string;
  asTextarea?: boolean;
};

export default function Form({ data, ...props }: Form) {
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
    <RadixForm.Root
      className="flex flex-col gap-y-3 rounded-xl border border-neutral-300 bg-neutral-50/75 p-4 dark:border-neutral-600 dark:bg-neutral-950/75"
      {...props}
    >
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
    </RadixForm.Root>
  );
}

const inputClassNames =
  "rounded-[4px] px-3 py-1.5 text-sm shadow-[0_0_0_1px] shadow-neutral-400 hover:shadow-neutral-950 focus:outline-neutral-950 dark:shadow-neutral-500 dark:hover:shadow-neutral-50 dark:focus:outline-neutral-50 dark:bg-neutral-800 ";

function FormField({ label, className, asTextarea, ...props }: FormField) {
  const name = label
    .toLocaleLowerCase()
    .replace(/\s(\w)/g, (_, char) => char.toUpperCase());

  return (
    <RadixForm.Field name={name} className="grid gap-y-1">
      <RadixForm.Label className="text-xs">{label}</RadixForm.Label>

      {asTextarea ? (
        <RadixForm.Control
          className={twMerge(cx(inputClassNames, className))}
          required
          asChild
          {...props}
        >
          <textarea rows={3} />
        </RadixForm.Control>
      ) : (
        <RadixForm.Control
          className={twMerge(cx(inputClassNames, className))}
          type="text"
          required
          {...props}
        />
      )}
    </RadixForm.Field>
  );
}
