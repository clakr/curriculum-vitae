"use client";

import { formatToFullName } from "@/utils/formatToFullName";
import { About, BasicInformation } from "@prisma/client";
import { cx } from "cva";
import { HTMLAttributes, useState } from "react";
import { FaAngleDown } from "react-icons/fa6";

type Props = HTMLAttributes<HTMLElement> & {
  info: BasicInformation | null;
  aboutData: About[] | null;
};

export default function Header({ info, aboutData }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <header
      className={cx(
        "relative border-b border-b-neutral-300 bg-neutral-100 laptop:hidden",
        isExpanded ? "" : ""
      )}
    >
      <article className="z-10 px-4 pt-4">
        <h1 className="text-3xl font-bold leading-7">
          {formatToFullName(info)}
        </h1>
        <h2 className="text-2xl font-semibold">{info?.position}</h2>
      </article>
      <div
        className={cx(
          "mt-4 flex flex-col gap-y-4 px-4 transition-transform",
          isExpanded
            ? "visible relative translate-y-0"
            : "invisible absolute -translate-y-4"
        )}
      >
        <article className="flex flex-col gap-y-1.5 [&>address]:text-sm">
          <h3 className="mb-0.5 text-lg font-medium">Contact</h3>
          <address>{info?.address}</address>
          <address>{info?.email}</address>
          <address>{info?.phoneNumber}</address>
        </article>
        <article className="flex flex-col gap-y-1.5 [&>p]:text-sm">
          <h3 className="mb-0.5 text-lg font-medium">About</h3>
          {aboutData?.map((about) => (
            <p key={about.id}>{about.desc}</p>
          ))}
        </article>
      </div>

      <button
        className="grid w-full place-items-center p-4"
        onClick={() => setIsExpanded((prevState) => !prevState)}
      >
        <FaAngleDown
          className={cx(
            isExpanded ? "rotate-180" : "animate-[bounce_2s_infinite] "
          )}
        />
      </button>
    </header>
  );
}
