import { formatToFullName } from "@/utils/formatToFullName";
import { About, BasicInformation } from "@prisma/client";
import { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLElement> & {
  info: BasicInformation | null;
};

export default function Author({ info }: Props) {
  return (
    <address className="hidden px-4 pt-4 laptop:block laptop:px-8 laptop:pt-8">
      <h1 className="text-4xl font-extrabold">{formatToFullName(info)}</h1>
      <h2 className="text-3xl font-bold">{info?.position}</h2>
    </address>
  );
}
