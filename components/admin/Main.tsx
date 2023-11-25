import { cx } from "cva";
import { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

export default function Main({ children }: PropsWithChildren) {
  return (
    <main
      className={twMerge(
        cx(
          "ml-60 dark:after:absolute dark:after:inset-0 dark:after:-z-10 dark:after:bg-neutral-800 dark:after:opacity-90"
        )
      )}
    >
      {children}
    </main>
  );
}
