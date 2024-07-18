import { DATETIME_FORMATTER } from "./constants";

export default function (from: Date, to?: Date) {
  if (!to) return `${DATETIME_FORMATTER.format(from)} - Present`;
  return `${DATETIME_FORMATTER.format(from)} - ${DATETIME_FORMATTER.format(to)}`;
}
