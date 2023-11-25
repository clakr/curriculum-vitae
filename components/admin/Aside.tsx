import Link from "next/link";

export default function Aside() {
  return (
    <aside className="absolute h-screen w-60 border-r border-r-neutral-300 bg-neutral-100 dark:border-r-neutral-600 dark:bg-neutral-900">
      <Link href="/education">Education</Link>
      <Link href="/experience">Experience</Link>
    </aside>
  );
}
