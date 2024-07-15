import type { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type Props = HTMLAttributes<HTMLElement> & { heading: string };
export default function Section({ children, className, heading }: Props) {
  return (
    <section className={twMerge("mt-3", className)}>
      <h3 className="font-bold uppercase">{heading}</h3>
      {children}
    </section>
  );
}
