import type { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export default function Name({
  children,
  className,
}: HTMLAttributes<HTMLElement>) {
  return (
    <h1 className={twMerge("text-3xl font-bold tracking-tighter", className)}>
      {children}
    </h1>
  );
}
