import { PropsWithChildren } from "react";

type Props = PropsWithChildren & { heading?: string };

export default function Section({ children, heading }: Props) {
  return (
    <section className="p-4">
      {heading ? <h3 className="mb-1 font-medium">{heading}</h3> : null}
      {children}
    </section>
  );
}
