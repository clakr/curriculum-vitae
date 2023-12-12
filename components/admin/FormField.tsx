import * as RadixForm from "@radix-ui/react-form";
import { twMerge } from "tailwind-merge";
import { cx } from "cva";

type FormField = RadixForm.FormControlProps & {
  label: string;
  asTextarea?: boolean;
};

const inputClassNames =
  "rounded-[4px] px-3 py-1.5 text-sm shadow-[0_0_0_1px] shadow-neutral-400 hover:shadow-neutral-950 focus:outline-neutral-950 dark:shadow-neutral-500 dark:hover:shadow-neutral-50 dark:focus:outline-neutral-50 dark:bg-neutral-800 ";

export function FormField({
  label,
  className,
  asTextarea,
  ...props
}: FormField) {
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
