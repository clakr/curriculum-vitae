import { PropsWithChildren } from "react";

type Props = PropsWithChildren & { heading?: string };

export default function Section({ children, heading }: Props) {
  return (
    // <section className="relative p-4 after:absolute after:inset-0 after:-z-10 after:bg-neutral-800 after:opacity-90">
    <section className="p-4">
      {heading ? <h3 className="mb-1 font-medium">{heading}</h3> : null}
      {children}
    </section>
  );
}
