"use client";

import { routes } from "@/utils/constants";
import { signOut } from "next-auth/react";
import Link from "next/link";

export default function Aside() {
  return (
    <aside className="absolute h-screen w-60 border-r border-r-neutral-300 bg-neutral-100 dark:border-r-neutral-600 dark:bg-neutral-900">
      <div className="flex flex-col">
        {routes.map(({ label, ...rest }, index) => (
          <Link {...rest} key={index}>
            {label}
          </Link>
        ))}
      </div>
      <div>
        <button onClick={() => signOut()}>Sign Out</button>
      </div>
    </aside>
  );
}
