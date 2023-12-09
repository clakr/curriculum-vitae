import { PropsWithChildren } from "react";

export default function Heading({ children }: PropsWithChildren) {
  return <h1 className="mb-4 text-3xl font-semibold">{children}</h1>;
}
