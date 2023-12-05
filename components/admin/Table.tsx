import { PropsWithChildren } from "react";

export default function Table({ children }: PropsWithChildren) {
  return (
    <div className="grid rounded-xl border border-neutral-300 bg-neutral-50/75 dark:border-neutral-600 dark:bg-neutral-950/75">
      <table>{children}</table>
    </div>
  );
}

function TableHead({ children }: PropsWithChildren) {
  return (
    <thead className="relative z-0 before:absolute before:inset-1.5 before:-z-10 before:rounded-md before:bg-neutral-200 before:dark:bg-neutral-800 [&>tr>th]:whitespace-nowrap [&>tr>th]:px-1.5 [&>tr>th]:py-3">
      <tr>{children}</tr>
    </thead>
  );
}

function TableBodyRow({ children }: PropsWithChildren) {
  return (
    <tr className="border-b last:border-none dark:border-neutral-600 [&>td]:px-4 [&>td]:py-2 [&>td]:first:pt-0">
      {children}
    </tr>
  );
}

Table.Head = TableHead;
Table.BodyRow = TableBodyRow;
