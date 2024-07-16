import type { ButtonHTMLAttributes, PropsWithChildren } from "react";
import * as Dialog from "@radix-ui/react-dialog";

function handleDarkModeClick() {
  document.documentElement.classList.toggle("dark");
}

export default function CommandGroup() {
  return (
    <section className="fixed bottom-4 right-4 flex flex-col lg:right-6">
      <ProjectInformation />
      <Button disabled>
        <span className="sr-only">Download PDF</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 32 32"
        >
          <path
            fill="currentColor"
            d="M24 24v4H8v-4H6v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4Z"
          />
          <path
            fill="currentColor"
            d="m21 21l-1.414-1.414L17 22.172V14h-2v8.172l-2.586-2.586L11 21l5 5zm7-17V2h-6v10h2V8h3V6h-3V4zm-11 8h-4V2h4a3.003 3.003 0 0 1 3 3v4a3.003 3.003 0 0 1-3 3m-2-2h2a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-2zM9 2H4v10h2V9h3a2.003 2.003 0 0 0 2-2V4a2 2 0 0 0-2-2M6 7V4h3l.001 3z"
          />
        </svg>
      </Button>
      <Button onClick={handleDarkModeClick}>
        <span className="sr-only">Toggle Color Scheme</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 24 24"
        >
          <g fill="currentColor">
            <path d="M12 16a4 4 0 0 0 0-8z" />
            <path
              fillRule="evenodd"
              d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2m0 2v4a4 4 0 1 0 0 8v4a8 8 0 1 0 0-16"
              clipRule="evenodd"
            />
          </g>
        </svg>
      </Button>
    </section>
  );
}

function Button({
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

function ProjectInformation() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button>
          <span className="sr-only">Project Information</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
          >
            <g fill="currentColor">
              <path d="M11 10.98a1 1 0 1 1 2 0v6a1 1 0 1 1-2 0zm1-4.929a1 1 0 1 0 0 2a1 1 0 0 0 0-2" />
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2M4 12a8 8 0 1 0 16 0a8 8 0 0 0-16 0"
                clipRule="evenodd"
              />
            </g>
          </svg>
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-10 bg-neutral-950/25 dark:bg-neutral-950/50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-20 flex max-w-[450px] -translate-x-1/2 -translate-y-1/2 flex-col gap-y-4 rounded border border-neutral-300 bg-neutral-50 p-4 dark:border-neutral-700 dark:bg-neutral-950">
          <Dialog.Title className="font-bold">Project Information</Dialog.Title>
          <ul className="list-inside list-disc text-sm">
            <figcaption className="mb-2">
              This project is an iteration of{" "}
              <a
                href="https://clakr.vercel.app"
                target="_blank"
                className="font-medium text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-600"
              >
                https://clakr.vercel.app
              </a>
              . It currently uses the following technology:
            </figcaption>
            <ListItem href="https://astro.build/">Astro</ListItem>
            <ListItem href="https://react.dev/">React</ListItem>
            <ListItem href="https://tailwindcss.com/">Tailwind</ListItem>
            <ListItem href="https://www.radix-ui.com/">RadixUI</ListItem>
            <ListItem href="https://www.typescriptlang.org/">
              TypeScript
            </ListItem>
          </ul>
          <Dialog.Close>
            <span className="sr-only">Close Button</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute right-3 top-3 h-4 w-4"
              viewBox="0 0 24 24"
            >
              <g fill="currentColor">
                <path d="M16.34 9.322a1 1 0 1 0-1.364-1.463l-2.926 2.728L9.322 7.66A1 1 0 0 0 7.86 9.024l2.728 2.926l-2.927 2.728a1 1 0 1 0 1.364 1.462l2.926-2.727l2.728 2.926a1 1 0 1 0 1.462-1.363l-2.727-2.926z" />
                <path
                  fill-rule="evenodd"
                  d="M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11s-4.925 11-11 11S1 18.075 1 12m11 9a9 9 0 1 1 0-18a9 9 0 0 1 0 18"
                  clip-rule="evenodd"
                />
              </g>
            </svg>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function ListItem({ children, href }: PropsWithChildren<{ href: string }>) {
  return (
    <li className="ms-2 mt-0.5">
      <a
        href={href}
        target="_blank"
        className="text-xs font-medium text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-600"
      >
        {children}
      </a>
    </li>
  );
}
