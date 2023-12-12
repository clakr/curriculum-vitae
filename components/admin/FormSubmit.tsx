import { FormSubmitProps, Submit } from "@radix-ui/react-form";
import { cx } from "cva";
import { twMerge } from "tailwind-merge";

export default function FormSubmit({
  children,
  className,
  ...props
}: FormSubmitProps) {
  return (
    <Submit
      className={twMerge(
        cx(
          "rounded-[4px] border border-neutral-300 bg-neutral-200 py-2 text-sm hover:border-neutral-400 hover:bg-neutral-300 focus:border-neutral-400 focus:bg-neutral-300 focus:outline-neutral-950 disabled:bg-red-400 dark:border-neutral-600 dark:bg-neutral-700 dark:hover:border-neutral-700 dark:hover:bg-neutral-800 dark:focus:border-neutral-700 dark:focus:bg-neutral-800 dark:focus:outline-neutral-50",
          className
        )
      )}
      {...props}
    >
      {children}
    </Submit>
  );
}
