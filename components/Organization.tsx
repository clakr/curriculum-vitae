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
  position,
  mode,
}: Organization) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-2 [&>*]:whitespace-nowrap [&>*]:leading-[1.375rem] [&>span]:text-neutral-950/50">
      {position ? (
        <strong className="text-lg font-black">{position}, </strong>
      ) : null}
      <h4 className="text-lg font-bold">{name}</h4>
      <span className="text-sm font-bold ">
        {location} {mode ? `| ${mode}` : null}
      </span>
      <span className="mb-4 w-full text-sm font-bold ">
        {formatDate({ durationFrom, durationTo })}
      </span>
    </div>
  );
}
