import type { ButtonHTMLAttributes } from "react";
import ProjectInformation from "#components/CommandGroup/ProjectInformation.tsx";
import DarkMode from "#components/CommandGroup/DarkMode.tsx";
import PDF from "#components/CommandGroup/PDF.tsx";

export default function CommandGroup() {
  return (
    <section className="fixed bottom-4 right-4 flex flex-col lg:right-6">
      <ProjectInformation />
      <PDF />
      <DarkMode />
    </section>
  );
}

export function Button({
  children,
  className,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className="self-end rounded p-2 hover:bg-neutral-950/5 disabled:pointer-events-none disabled:opacity-50 hover:dark:bg-neutral-50/5"
      {...rest}
    >
      {children}
    </button>
  );
}
