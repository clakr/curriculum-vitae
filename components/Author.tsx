import { formatToFullName } from "@/utils/formatToFullName";
import { About, BasicInformation } from "@prisma/client";
import { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLElement> & {
  info: BasicInformation | null;
};

export default function Author({ info }: Props) {
  return (
    <address className="hidden px-6 pt-7 not-italic dark:relative dark:after:absolute dark:after:inset-0 dark:after:-z-10 dark:after:bg-neutral-800 dark:after:opacity-90 laptop:block">
      <h1 className="text-4xl font-extrabold">{formatToFullName(info)}</h1>
      <h2 className="text-3xl font-bold">{info?.position}</h2>
    </address>
  );
}
