import type { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export default function Name({
  children,
  className,
}: HTMLAttributes<HTMLElement>) {
  return (
    <h2 className={twMerge("text-2xl font-semibold", className)}>{children}</h2>
  );
}
