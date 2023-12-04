"use client";

import * as RadioGroup from "@radix-ui/react-radio-group";
import * as Accordion from "@radix-ui/react-accordion";
import { PropsWithChildren, forwardRef, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import {
  FaFilePdf,
  FaSun,
  FaMoon,
  FaGithub,
  FaDesktop,
  FaInfo,
  FaChevronDown,
  FaSpinner,
} from "react-icons/fa6";
import { IconType } from "react-icons";
import { cx } from "cva";
import { twMerge } from "tailwind-merge";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
import Modal from "./Modal";
import * as NextLink from "next/link";
import { Url } from "next/dist/shared/lib/router/router";
import getAllData from "@/utils/getCVData";
import { signIn, signOut, useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { routes } from "@/utils/constants";

type Button = {
  icon: IconType;
  label: string;
  identifier: string;
};

const buttons: Button[] = [
  {
    icon: FaFilePdf,
    label: "Export to PDF",
    identifier: "export-to-pdf",
  },
  {
    icon: FaGithub,
    label: "Sign in with GitHub",
    identifier: "sign-in",
  },
];

export default function CommandMenu(
  data: Awaited<ReturnType<typeof getAllData>>
) {
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
    <Modal title="Command Menu" open={isOpen} onOpenChange={setIsOpen}>
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
          onValueChange={(value) => {
            setTheme(value);
          }}
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
                <Button leftIcon={FaInfo} rightIcon={FaChevronDown}>
                  Project Information
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
                <ListLink href="https://tailwindcss.com/">TailwindCSS</ListLink>
                <ListLink href="https://www.radix-ui.com/">RadixUI</ListLink>
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
                  Reiterated to learn and make use of React Server Components
                  together with React Server Actions.
                </figcaption>
              </ul>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>
        {buttons.map(({ icon, label, ...rest }, index) => (
          <Button key={index} leftIcon={icon} data={data} {...rest}>
            {label}
          </Button>
        ))}
      </div>
    </Modal>
  );
}

const Button = forwardRef<
  HTMLButtonElement,
  JSX.IntrinsicElements["button"] & {
    leftIcon: IconType;
    rightIcon?: IconType;
    identifier?: string;
    data?: Awaited<ReturnType<typeof getAllData>>;
  }
>(
  (
    {
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      identifier,
      data,
      children,
      className,
      disabled,
      ...rest
    },
    forwardedRef
  ) => {
    const [isLoading, setIsLoading] = useState(false);
    let onClick = undefined;
    const search = useSearchParams();
    const { data: session } = useSession();

    switch (identifier) {
      case "export-to-pdf":
        onClick = async () => {
          setIsLoading(true);
          const blob = await (
            await fetch("https://pdfgen.app/api/generate?templateId=2b18184", {
              headers: {
                "Content-Type": "application/json",
                api_key: process.env.NEXT_PUBLIC_PDFGEN_API_KEY || "",
              },
              method: "POST",
              body: JSON.stringify({ data }),
            })
          ).blob();

          const a = document.createElement("a");
          document.body.appendChild(a);
          a.style.display = "none";
          a.href = URL.createObjectURL(blob);
          a.download = `${data?.info?.lastName}_CV.pdf`;
          a.click();
          setIsLoading(false);
        };
        break;

      case "sign-in":
        onClick = () => {
          setIsLoading(true);

          if (session) {
            signOut();
            return;
          }

          signIn("github", {
            callbackUrl: search.get("callbackUrl") ?? routes[0].href,
          });
        };
        break;

      default:
        break;
    }

    return (
      <button
        className={twMerge(
          cx(
            "group grid h-8 w-full grid-cols-[20px_auto_20px] items-center gap-x-2 px-3 text-start hover:bg-neutral-300 focus:bg-neutral-300 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
          ),
          className
        )}
        onClick={onClick}
        disabled={disabled || isLoading}
        ref={forwardedRef}
        {...rest}
      >
        {isLoading ? (
          <FaSpinner className="animate-spin justify-self-center" />
        ) : (
          <LeftIcon className="justify-self-center" />
        )}
        {identifier === "sign-in" && session ? "Sign out" : children}
        {RightIcon ? (
          <RightIcon className="justify-self-center text-[.5rem] transition-transform duration-300 ease-[cubic-bezier(0.87,_0,_0.13,_1)] group-data-[state=open]:rotate-180" />
        ) : null}
      </button>
    );
  }
);
Button.displayName = "Button";

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
