import * as Dialog from "@radix-ui/react-dialog";
import exportToPdf from "@utils/exportToPdf";
import { useEffect, useState } from "react";
import Button from "./Button";
import ProjectInformation from "./ProjectInformation";
import Theme from "./Theme";

export default function () {
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		const keydown = (event: KeyboardEvent) => {
			if (event.key !== "/") return;

			event.preventDefault();
			setIsOpen((isOpen) => !isOpen);
		};

		document.addEventListener("keydown", keydown);

		return () => document.removeEventListener("keydown", keydown);
	}, []);

	return (
		<Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
			<Dialog.Portal>
				<Dialog.Overlay className="fixed inset-0 z-10 animate-overlay bg-white/75 dark:bg-black/75" />
				<Dialog.Content className="fixed left-1/2 top-1/2 z-20 grid w-full max-w-[85%] -translate-x-1/2 -translate-y-1/2 animate-modal grid-rows-[50px_auto] rounded-md border border-neutral-300 bg-neutral-200 text-sm dark:border-neutral-800 dark:bg-neutral-900 xl:max-w-sm">
					<header className="grid grid-cols-[auto_50px] border-b border-neutral-300 dark:border-neutral-800">
						<Dialog.Title className="self-center whitespace-nowrap ps-3">
							Command Menu
						</Dialog.Title>
						<Dialog.Close className="self-center p-3 focus:bg-neutral-300 dark:focus:bg-neutral-800">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								className="w-4 h-4"
							>
								<title>Close Modal Icon</title>
								<path
									fill="none"
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M18 6L6 18M6 6l12 12"
								/>
							</svg>
						</Dialog.Close>
					</header>
					<div className="flex flex-col border-b border-neutral-300 p-3 dark:border-neutral-800">
						<h3 className="flex items-center gap-x-1.5 pb-2 text-xs font-semibold opacity-50">
							Theme
						</h3>
						<Theme />
					</div>
					<div className="flex flex-col py-3">
						<h3 className="px-3 pb-2 text-xs font-semibold opacity-50">
							Other Actions
						</h3>

						<ProjectInformation />
						<Button onClick={exportToPdf}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								className="w-4 h-4"
							>
								<title>Export to PDF Icon</title>
								<g
									fill="none"
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
								>
									<path d="M14 3v4a1 1 0 0 0 1 1h4" />
									<path d="M5 12V5a2 2 0 0 1 2-2h7l5 5v4M5 18h1.5a1.5 1.5 0 0 0 0-3H5v6m12-3h2m1-3h-3v6m-6-6v6h1a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2z" />
								</g>
							</svg>
							Export to PDF
						</Button>
					</div>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
