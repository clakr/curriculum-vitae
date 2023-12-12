import * as RadixForm from "@radix-ui/react-form";
import { twMerge } from "tailwind-merge";
import { cx } from "cva";

type FormField = Omit<RadixForm.FormControlProps, "className"> & {
  label: string;
  asTextarea?: boolean;
  formFieldClassName?: string;
  formLabelClassName?: string;
  formControlClassName?: string;
};

const inputClassNames =
  "rounded-[4px] px-3 py-1.5 text-sm shadow-[0_0_0_1px] shadow-neutral-400 hover:shadow-neutral-950 focus:outline-neutral-950 dark:shadow-neutral-500 dark:hover:shadow-neutral-50 dark:focus:outline-neutral-50 dark:bg-neutral-800 ";

export function FormField({
  label,
  asTextarea,
  formFieldClassName,
  formLabelClassName,
  formControlClassName,
  ...props
}: FormField) {
  const name = label
    .toLocaleLowerCase()
    .replace(/\s(\w)/g, (_, char) => char.toUpperCase());

  const { type } = props;

  if (asTextarea) {
    return (
      <RadixForm.Field
        name={name}
        className={twMerge(cx("grid gap-y-1", formFieldClassName))}
      >
        <RadixForm.Label className={twMerge(cx("text-xs", formLabelClassName))}>
          {label}
        </RadixForm.Label>
        <RadixForm.Control
          className={twMerge(cx(inputClassNames, formLabelClassName))}
          required
          asChild
          {...props}
        >
          <textarea rows={3} />
        </RadixForm.Control>
      </RadixForm.Field>
    );
  }

  if (type === "checkbox" || type === "radio") {
    return (
      <RadixForm.Field
        name={name}
        className={twMerge(cx("flex items-center gap-x-2", formFieldClassName))}
      >
        <RadixForm.Control
          className={formControlClassName}
          value={name}
          required
          {...props}
        />
        <RadixForm.Label className={twMerge(cx("text-xs", formLabelClassName))}>
          {label}
        </RadixForm.Label>
      </RadixForm.Field>
    );
  }

  return (
    <RadixForm.Field
      name={name}
      className={twMerge(cx("grid gap-y-1", formFieldClassName))}
    >
      <RadixForm.Label className={twMerge(cx("text-xs", formLabelClassName))}>
        {label}
      </RadixForm.Label>
      <RadixForm.Control
        className={twMerge(cx(inputClassNames, formControlClassName))}
        type="text"
        required
        {...props}
      />
    </RadixForm.Field>
  );
}
