import * as Accordion from "@radix-ui/react-accordion";
import Button from "./Button";
import Link from "./Link";

export default function () {
	return (
		<Accordion.Root type="single" collapsible>
			<Accordion.Item value="links">
				<Accordion.Trigger asChild>
					<Button>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="512"
							height="512"
							viewBox="0 0 512 512"
							className="w-4 h-4"
						>
							<title>Project Information Icon</title>
							<path
								fill="none"
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="40"
								d="M196 220h64v172"
							/>
							<path
								fill="none"
								stroke="currentColor"
								strokeLinecap="round"
								strokeMiterlimit="10"
								strokeWidth="40"
								d="M187 396h138"
							/>
							<path
								fill="currentColor"
								d="M256 160a32 32 0 1 1 32-32a32 32 0 0 1-32 32"
							/>
						</svg>
						Project Information
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							className="w-4 h-4 transition-transform duration-300 ease-[cubic-bezier(0.87,_0,_0.13,_1)] group-data-[state=open]:rotate-180"
						>
							<title>Expand Project Information Icon</title>
							<path
								fill="none"
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="m6 9l6 6l6-6"
							/>
						</svg>
					</Button>
				</Accordion.Trigger>
				<Accordion.Content className="overflow-hidden text-xs data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown">
					<ul className="list-inside list-disc px-9 py-2 [&>li]:ms-2 [&>li]:mt-0.5 ">
						<figcaption className="mb-2">
							This project is a reiteration of{" "}
							<Link href="https://clakr.vercel.app/">
								https://clakr.vercel.app/
							</Link>{" "}
							and uses the following technology stack:
						</figcaption>

						<li>
							<Link href="https://astro.build/">Astro</Link>
						</li>
						<li>
							<Link href="https://react.dev/">React</Link>
						</li>
						<li>
							<Link href="https://tailwindcss.com/">TailwindCSS</Link>
						</li>
						<li>
							<Link href="https://www.radix-ui.com/">RadixUI</Link>
						</li>
						<li>
							<Link href="https://www.typescriptlang.org/">TypeScript</Link>
						</li>
					</ul>
				</Accordion.Content>
			</Accordion.Item>
		</Accordion.Root>
	);
}
