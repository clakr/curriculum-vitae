import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import type { Info } from "./strapi.types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const listFormatter = new Intl.ListFormat(undefined, {
  style: "long",
  type: "conjunction",
});

export function buildFullName({
  first_name,
  last_name,
  middle_name,
}: Pick<Info, "first_name" | "last_name" | "middle_name">) {
  const middleInitials = middle_name.charAt(0) + ".";

  return [first_name, middleInitials, last_name].join(" ");
}
