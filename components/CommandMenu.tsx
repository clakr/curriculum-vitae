"use client";

import * as RadioGroup from "@radix-ui/react-radio-group";
import * as Accordion from "@radix-ui/react-accordion";
import { PropsWithChildren, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import {
  FaSun,
  FaMoon,
  FaDesktop,
  FaXmark,
  FaInfo,
  FaChevronDown,
  FaFilePdf,
} from "react-icons/fa6";
import * as NextLink from "next/link";
import { Url } from "next/dist/shared/lib/router/router";
import { GetData } from "@/utils/getData";
import * as Dialog from "@radix-ui/react-dialog";
import { twMerge } from "tailwind-merge";
import { cx } from "cva";

type Props = { data: GetData };
type ButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  asyncAction?: () => Promise<void>;
};

function capitalizeFirstLetter(input: string) {
  return input.charAt(0).toUpperCase() + input.slice(1);
}

async function handleExport(data: GetData) {
  const response = await fetch(
    "https://pdfgen.app/api/generate?templateId=2b18184",
    {
      headers: {
        "Content-Type": "application/json",
        api_key: process.env.NEXT_PUBLIC_PDFGEN_API_KEY || "",
      },
      method: "POST",
      body: JSON.stringify({ data }),
    }
  );
  const blob = await response.blob();

  const a = document.createElement("a");
  document.body.appendChild(a);
  a.style.display = "none";
  a.href = URL.createObjectURL(blob);
  a.download = `${data?.info?.lastName}_CV.pdf`;
  a.click();
}

export default function CommandMenu({ data }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme, themes } = useTheme();

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
        <Dialog.Content className="fixed left-1/2 top-1/2 z-20 grid w-full max-w-[85%] -translate-x-1/2 -translate-y-1/2 animate-modal grid-rows-[50px_auto] rounded-md border border-neutral-300 bg-neutral-200 text-sm dark:border-neutral-800 dark:bg-neutral-900 mobileLarge:max-w-sm">
          <header className="grid grid-cols-2 border-b border-neutral-300 dark:border-neutral-800">
            <Dialog.Title className="self-center whitespace-nowrap px-3">
              Command Menu
            </Dialog.Title>
            <Dialog.Close className="self-center justify-self-end p-3 focus:bg-neutral-300 dark:focus:bg-neutral-800">
              <FaXmark />
            </Dialog.Close>
          </header>
          <div className="flex flex-col border-b border-neutral-300 p-3 dark:border-neutral-800">
            <h3 className="flex items-center gap-x-1.5 pb-2 text-xs font-semibold opacity-50">
              Theme
              {theme === "light" ? (
                <FaSun />
              ) : theme === "dark" ? (
                <FaMoon />
              ) : (
                <FaDesktop />
              )}
            </h3>
            <RadioGroup.Root
              className="flex flex-col gap-y-2"
              defaultValue={theme}
              onValueChange={(value) => setTheme(value)}
            >
              {themes.map((theme, index) => (
                <div key={index} className="flex items-center gap-x-2">
                  <RadioGroup.Item
                    value={theme}
                    id={theme}
                    className="h-[16px] w-[16px] rounded-full border border-neutral-300 bg-white dark:border-neutral-700 dark:bg-neutral-800"
                  >
                    <RadioGroup.Indicator className="relative flex h-full w-full items-center justify-center after:block after:h-[8px] after:w-[8px] after:rounded-full after:bg-neutral-800 dark:after:bg-neutral-300" />
                  </RadioGroup.Item>
                  <label htmlFor={theme}>{capitalizeFirstLetter(theme)}</label>
                </div>
              ))}
            </RadioGroup.Root>
          </div>
          <div className="flex flex-col py-3">
            <h3 className="px-3 pb-2 text-xs font-semibold opacity-50">
              Other Actions
            </h3>
            <Accordion.Root type="single" collapsible>
              <Accordion.Item value="item-1">
                <Accordion.Header asChild>
                  <Accordion.Trigger asChild>
                    <Button>
                      <FaInfo />
                      Project Information
                      <FaChevronDown className="text-[.5rem] transition-transform duration-300 ease-[cubic-bezier(0.87,_0,_0.13,_1)] group-data-[state=open]:rotate-180" />
                    </Button>
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden text-xs data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown">
                  <ul className="list-inside list-disc px-9 py-2 [&>li]:ms-2 [&>li]:mt-0.5 ">
                    <figcaption className="mb-2">
                      This project is a reiteration of{" "}
                      <Link href="https://clakr.vercel.app/">
                        https://clakr.vercel.app/
                      </Link>{" "}
                      and uses the following technology stack:
                    </figcaption>
                    <ListLink href="https://nextjs.org/docs/app">
                      NextJS app directory
                    </ListLink>
                    <ListLink href="https://tailwindcss.com/">
                      TailwindCSS
                    </ListLink>
                    <ListLink href="https://www.radix-ui.com/">
                      RadixUI
                    </ListLink>
                    <ListLink href="https://www.typescriptlang.org/">
                      TypeScript
                    </ListLink>
                    <ListLink href="https://nextjs.org/docs/app/building-your-application/rendering/server-components">
                      React Server Components
                    </ListLink>
                    <ListLink href="https://nextjs.org/docs/app/api-reference/functions/server-actions">
                      React Server Actions
                    </ListLink>
                    <ListLink href="https://www.prisma.io/">Prisma</ListLink>
                    <ListLink href="https://vercel.com/storage/postgres">
                      Vercel Postgres
                    </ListLink>
                    <figcaption className="mt-2">
                      Reiterated to learn and make use of React Server
                      Components together with React Server Actions.
                    </figcaption>
                  </ul>
                </Accordion.Content>
              </Accordion.Item>
            </Accordion.Root>
            <Button onClick={async () => await handleExport(data)}>
              <FaFilePdf />
              Export To PDF
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function Button({ children, className, asyncAction, ...props }: ButtonProps) {
  return (
    <button
      className={twMerge(
        cx(
          "group grid h-8 w-full grid-cols-[20px_auto_20px] items-center gap-x-2 px-3 text-start hover:bg-neutral-300 focus:bg-neutral-300 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800",
          className
        )
      )}
      {...props}
    >
      {children}
    </button>
  );
}

function Link({ children, ...rest }: PropsWithChildren<NextLink.LinkProps>) {
  return (
    <NextLink.default
      target="_blank"
      className="text-blue-500 underline underline-offset-2 dark:text-blue-400"
      {...rest}
    >
      {children}
    </NextLink.default>
  );
}

function ListLink({
  children,
  href,
  ...rest
}: JSX.IntrinsicElements["li"] & { href: Url }) {
  return (
    <li {...rest}>
      <Link href={href}>{children}</Link>
    </li>
  );
}
