import type { PropsWithChildren } from "react";

export default function Address({ children }: PropsWithChildren) {
  return <address className="mt-1 text-sm not-italic">{children}</address>;
}
