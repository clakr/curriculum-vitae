import { GetData } from "@/utils/getData";
import { formatToFullName } from "@/utils/helpers";

type Props = { data: Pick<GetData, "info"> };

export default function Author({ data: { info } }: Props) {
  if (!info) return null;

  const { position } = info;

  return (
    <address className="hidden px-6 pt-7 not-italic dark:relative dark:after:absolute dark:after:inset-0 dark:after:-z-10 dark:after:bg-neutral-800 dark:after:opacity-90 laptop:block">
      <h1 className="text-4xl font-extrabold">{formatToFullName(info)}</h1>
      <h2 className="text-3xl font-bold">{position}</h2>
    </address>
  );
}
