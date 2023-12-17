"use client";

import { GetData } from "@/utils/getData";
import { formatToFullName } from "@/utils/helpers";
import { cx } from "cva";
import { useState } from "react";
import { FaAngleDown } from "react-icons/fa6";

type Props = {
  data: Pick<GetData, "info" | "about">;
};

export default function Header({ data: { info, about } }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!info || !about) return null;

  const { position, address, email, phoneNumber } = info;

  return (
    <header
      className={cx(
        "relative border-b border-b-neutral-300 bg-neutral-100 dark:border-b-neutral-600 dark:bg-neutral-900 laptop:hidden"
      )}
    >
      <article className="z-10 px-4 pt-4 tablet:px-6 tablet:pt-6">
        <h1 className="text-3xl font-bold leading-7">
          {formatToFullName(info)}
        </h1>
        <h2 className="text-2xl font-semibold">{position}</h2>
      </article>
      <div
        className={cx(
          "mt-4 flex flex-col gap-y-4 px-4 transition-transform tablet:px-6",
          isExpanded
            ? "visible relative translate-y-0"
            : "invisible absolute -translate-y-4"
        )}
      >
        <article className="flex flex-col gap-y-2 [&>address]:text-sm [&>address]:not-italic">
          <h3 className="mb-1 text-lg font-bold">Contact</h3>
          <address>{address}</address>
          <address>{email}</address>
          <address>{phoneNumber}</address>
        </article>
        <article className="flex flex-col gap-y-2 [&>p]:text-sm">
          <h3 className="mb-1 text-lg font-bold">About</h3>
          {about.map(({ id, desc }) => (
            <p key={id}>{desc}</p>
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
