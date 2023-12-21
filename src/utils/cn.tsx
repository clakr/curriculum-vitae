import { cx } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

export default function (...args: Parameters<typeof cx>) {
	return twMerge(cx(...args));
}
