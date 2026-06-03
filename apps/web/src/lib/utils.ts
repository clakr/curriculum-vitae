import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const listFormatter = new Intl.ListFormat(undefined, {
  style: "long",
  type: "conjunction",
});
