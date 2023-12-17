import { PropsWithChildren } from "react";

type Props = PropsWithChildren & { heading?: string };

export default function Section({ children, heading }: Props) {
  return (
    <section className="px-4 py-5 dark:relative dark:after:absolute dark:after:inset-0 dark:after:-z-10 dark:after:bg-neutral-800 dark:after:opacity-90 tablet:px-5 tablet:py-6 laptop:px-6 laptop:py-7">
      {heading ? <h3 className="mb-4 font-bold uppercase">{heading}</h3> : null}
      {children}
    </section>
  );
}
