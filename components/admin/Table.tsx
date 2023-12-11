import { cx } from "cva";
import { HTMLAttributes, PropsWithChildren, TdHTMLAttributes } from "react";
import { FaPlus } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";

export default function Table({ children }: PropsWithChildren) {
  return (
    <div className="grid rounded-xl border border-neutral-300 bg-neutral-50/75 dark:border-neutral-600 dark:bg-neutral-950/75">
      <table>{children}</table>
    </div>
  );
}

export function TableHead({ children }: PropsWithChildren) {
  return (
    <thead className="relative z-0 text-sm before:absolute before:inset-1.5 before:-z-10 before:rounded-md before:bg-neutral-200 before:dark:bg-neutral-800 [&>tr>th]:whitespace-nowrap [&>tr>th]:px-1.5 [&>tr>th]:py-3">
      <tr>{children}</tr>
    </thead>
  );
}

export function TableBodyRow({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLElement>) {
  return (
    <tr
      className={twMerge(
        cx(
          "border-b last:border-none dark:border-neutral-600 [&>td]:px-4 [&>td]:py-2 [&>td]:text-xs [&>td]:first:pt-0.5",
          className
        )
      )}
      {...props}
    >
      {children}
    </tr>
  );
}

export function TableFoot({
  children,
  className,
  ...props
}: TdHTMLAttributes<HTMLElement>) {
  return (
    <tfoot>
      <tr>
        <td className={twMerge(cx("p-1.5", className))} {...props}>
          <button className="flex w-full items-center justify-center gap-x-1 rounded-md bg-neutral-200/50 py-1.5 text-xs hover:bg-neutral-200">
            <FaPlus />
            {children}
          </button>
        </td>
      </tr>
    </tfoot>
  );
}

Table.Head = TableHead;
Table.BodyRow = TableBodyRow;
Table.Foot = TableFoot;
