import formatDate from "@/utils/formatDate";
import { Organization } from "@prisma/client";

export default function Organization({
  name,
  location,
  durationFrom,
  durationTo,
  position,
  mode,
}: Organization) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-2 [&>*]:whitespace-nowrap [&>*]:leading-[1.375rem] [&>span]:text-neutral-950/50 dark:[&>span]:text-neutral-200/50">
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
