import { FormProps, Form as RadixForm } from "@radix-ui/react-form";
import { cx } from "cva";
import { twMerge } from "tailwind-merge";

export default function Form({ children, className, ...props }: FormProps) {
  return (
    <RadixForm
      className={twMerge(
        cx(
          "rounded-xl border border-neutral-300 bg-neutral-50/75 dark:border-neutral-600 dark:bg-neutral-950/75",
          className
        )
      )}
      {...props}
    >
      {children}
    </RadixForm>
  );
}
