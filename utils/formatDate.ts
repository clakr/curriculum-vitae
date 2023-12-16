type FormatDateArgs = {
  durationFrom: Date;
  durationTo: Date | null;
};

export default function formatDate({
  durationFrom,
  durationTo,
}: FormatDateArgs) {
  const formatter = new Intl.DateTimeFormat("en-PH", {
    year: "numeric",
    month: "long",
  });

  if (!durationTo) return `${formatter.format(durationFrom)} - Present`;

  return `${formatter.format(durationFrom)} - ${formatter.format(durationTo)}`;
}
