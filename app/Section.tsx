import { PropsWithChildren } from "react";

type Props = PropsWithChildren & { heading: string };

export default function Section({ children, heading }: Props) {
  return (
    <section className="p-4">
      <h3 className="font-medium">{heading}</h3>
      {children}
    </section>
  );
}
