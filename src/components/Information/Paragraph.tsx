import type { PropsWithChildren } from "react";

export default function Paragraph({ children }: PropsWithChildren) {
  return <p className="mt-1.5 text-sm">{children}</p>;
}
