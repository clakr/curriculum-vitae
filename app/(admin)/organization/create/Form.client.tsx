"use client";

import Form from "@/components/admin/Form";
import { FormField } from "@/components/admin/FormField";
import FormSubmit from "@/components/admin/FormSubmit";
import { FormProps } from "@radix-ui/react-form";
import { useState } from "react";

export default function FormClient({ ...props }: FormProps) {
  const [isCountryDisabled, setIsCountryDisabled] = useState(true);
  const [isFinishedDisabled, setIsFinishedDisabled] = useState(true);

  return (
    <Form className="flex flex-col gap-y-3 p-4" {...props}>
      <FormField label="Name" />
      <div className="flex gap-x-3">
        <FormField label="City" formFieldClassName="grow-[4]" />
        <FormField
          label="Philippines"
          type="checkbox"
          formFieldClassName="grow self-end mb-2.5"
          checked={isCountryDisabled}
          onChange={() => setIsCountryDisabled((b) => !b)}
        />
      </div>
      <FormField
        label="Country"
        defaultValue="PH"
        formFieldClassName="grow"
        disabled={isCountryDisabled}
      />

      <FormField
        label="Position"
        required={false}
        formFieldClassName="grow-[9]"
      />
      <div className="flex flex-col gap-y-0.5">
        <label className="text-xs">Mode</label>
        <div className="flex gap-x-4">
          <FormField label="Onsite" type="radio" name="mode" />
          <FormField label="WFH" type="radio" name="mode" />
          <FormField label="Hybrid" type="radio" name="mode" />
          <FormField label="N/A" type="radio" name="mode" defaultChecked />
        </div>
      </div>

      <div className="flex gap-x-3">
        <FormField label="Started" type="date" formFieldClassName="grow-[4]" />
        <FormField
          label="Present"
          type="checkbox"
          formFieldClassName="grow self-end mb-2.5"
          checked={isFinishedDisabled}
          onChange={() => setIsFinishedDisabled((b) => !b)}
        />
      </div>

      <FormField
        label="Finished"
        type="date"
        required={false}
        disabled={isFinishedDisabled}
      />
      <FormSubmit className="mt-3">Create Organization</FormSubmit>
    </Form>
  );
}
