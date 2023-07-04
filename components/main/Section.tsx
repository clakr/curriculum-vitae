import { PropsWithChildren } from "react";

type Props = PropsWithChildren & { heading?: string };

export default function Section({ children, heading }: Props) {
  return (
    // <section className="relative p-4 after:absolute after:inset-0 after:-z-10 after:bg-neutral-800 after:opacity-90">
    <section className="px-4 py-2 tablet:px-6 tablet:py-3 laptop:px-8 laptop:py-4">
      {heading ? <h3 className="mb-1 font-medium">{heading}</h3> : null}
      {children}
    </section>
  );
}
