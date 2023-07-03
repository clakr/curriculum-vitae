import { Organization } from "@prisma/client";

type FormatDateArgs = {
  durationFrom: Date;
  durationTo: Date | null;
};

function formatDate({ durationFrom, durationTo }: FormatDateArgs) {
  const formatter = new Intl.DateTimeFormat("en-PH", {
    year: "numeric",
    month: "long",
  });

  if (!durationTo) return formatter.format(durationFrom);

  return `${formatter.format(durationFrom)} - ${formatter.format(durationTo)}`;
}

export default function Organization({
  name,
  location,
  durationFrom,
  durationTo,
}: Organization) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-4 [&>*]:whitespace-nowrap">
      <h4 className="text-lg font-bold">{name}</h4>
      <span className="text-sm font-extrabold">{location}</span>
      <span className="mb-2 w-full text-sm font-medium">
        {formatDate({ durationFrom, durationTo })}
      </span>
    </div>
  );
}
