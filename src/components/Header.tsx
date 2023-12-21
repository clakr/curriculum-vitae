import { address, phone, position } from "@content/information/index.json";
import cn from "@utils/cn";
import formatToFullName from "@utils/formatToFullName";
import { type PropsWithChildren, useState } from "react";

export default function ({ children }: PropsWithChildren) {
	const [isExpanded, setIsExpanded] = useState(false);

	return (
		<header className="bg-neutral-100 border-b border-neutral-300 [&_address]:not-italic [&_address]:text-sm [&_p]:text-sm relative lg:hidden dark:border-neutral-600 dark:bg-neutral-900">
			<address className="px-4 pt-4">
				<h1 className="text-3xl font-bold leading-7">{formatToFullName()}</h1>
				<h2 className="text-2xl font-semibold">{position}</h2>
			</address>
			<div
				className={cn(
					"[&>section]:flex [&>section]:flex-col [&>section]:gap-y-2 px-4 mt-4 flex flex-col gap-y-4 transition-transform [&_h3]:text-lg [&_h3]:font-bold [&_h3]:mb-1",
					isExpanded
						? "visible relative translate-y-0"
						: "invisible absolute -translate-y-4",
				)}
			>
				<section>
					<h3>Contact</h3>
					<address>{address.physical}</address>
					<address>{address.email}</address>
					<address>{phone}</address>
				</section>
				<section>
					<h3>About</h3>
					{children}
				</section>
			</div>
			<button
				type="button"
				className="w-full grid place-items-center p-4"
				onClick={() => setIsExpanded((prevState) => !prevState)}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					className={cn(
						isExpanded ? "rotate-180" : "animate-[bounce_2s_infinite]",
					)}
				>
					<title>Expand Header Icon</title>
					<path
						fill="none"
						stroke="currentColor"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="m6 9l6 6l6-6"
					/>
				</svg>
			</button>
		</header>
	);
}
