import { cva, type VariantProps } from "cva";
import { twMerge } from "tailwind-merge";

const main = cva(
  "ml-60 dark:after:absolute dark:after:inset-0 dark:after:-z-10 dark:after:bg-neutral-800 dark:after:opacity-90 p-6"
);

export interface MainProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof main> {
  heading: string;
}

export default function Button({
  className,
  children,
  heading,
  ...props
}: MainProps) {
  return (
    <main className={twMerge(main({ className }))} {...props}>
      <h1 className="mb-4 text-3xl font-semibold">{heading}</h1>
      {children}
    </main>
  );
}
