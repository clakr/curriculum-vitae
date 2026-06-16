import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import type { ArrayLinkComponent, Info } from "./strapi.types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const listFormatter = new Intl.ListFormat(undefined, {
  style: "long",
  type: "conjunction",
});

export function getInitials(input: string) {
  return input.charAt(0) + ".";
}

export function buildFullName({
  first_name,
  last_name,
  middle_name,
}: Pick<Info, "first_name" | "last_name" | "middle_name">) {
  const middleInitials = getInitials(middle_name);

  return [first_name, middleInitials, last_name].join(" ");
}

export function formatDuration({
  from,
  to,
  options,
}: {
  from: string;
  to: string | null;
  options?: Intl.DateTimeFormatOptions;
}) {
  const formatter = new Intl.DateTimeFormat(undefined, {
    month: "long",
    year: "numeric",
    ...options,
  });

  return [from, to]
    .map((date) => {
      if (date === null) return "Present";

      return formatter.format(new Date(date));
    })
    .join(" - ");
}

export function getLiveSiteLink(links: Array<ArrayLinkComponent>) {
  return links.find((link) => link.label === "Live Site");
}
