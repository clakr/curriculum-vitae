"use client";

import * as Dialog from "@radix-ui/react-dialog";
import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  useEffect,
  useState,
} from "react";
import { useTheme } from "next-themes";
import { FaXmark, FaFilePdf, FaInfo, FaSun, FaMoon } from "react-icons/fa6";
import { IconType } from "react-icons";
import { cx } from "cva";
import { twMerge } from "tailwind-merge";

type Button = {
  icon: IconType;
  label: string;
};

const buttons: Button[] = [
  {
    icon: FaFilePdf,
    label: "Export to PDF",
  },
  {
    icon: FaInfo,
    label: "Project Information",
  },
];

export default function CommandMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();

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
      <Dialog.Portal container={document.body}>
        <Dialog.Overlay className="fixed inset-0 z-10 bg-white/75 dark:bg-black/75" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-20 grid w-full max-w-[85%] -translate-x-1/2 -translate-y-1/2 grid-cols-1 grid-rows-[45px_auto] rounded-md border border-neutral-200 bg-neutral-100 pb-3 text-sm dark:border-neutral-800 dark:bg-neutral-900 mobileLarge:max-w-sm">
          <header className="grid grid-cols-2 border-b border-neutral-200 dark:border-neutral-800">
            <Dialog.Title className="self-center whitespace-nowrap px-3">
              Command Menu
            </Dialog.Title>
            <Dialog.Close className="self-center justify-self-end p-3 focus:bg-neutral-200 dark:focus:bg-neutral-800">
              <FaXmark />
            </Dialog.Close>
          </header>
          <Button
            icon={theme === "dark" ? FaSun : FaMoon}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="mt-2"
          >
            Switch to {theme === "dark" ? "light" : "dark"}
          </Button>
          {buttons.map(({ icon, label }, index) => (
            <Button key={index} icon={icon}>
              {label}
            </Button>
          ))}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function Button({
  children,
  onClick,
  icon,
  className,
  ...rest
}: DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & { icon: IconType }) {
  const Icon = icon;

  return (
    <button
      className={twMerge(
        cx(
          "grid h-9 grid-cols-[30px_auto] items-center gap-x-2 px-3 text-start hover:bg-neutral-200 focus:bg-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800",
          className
        )
      )}
      onClick={onClick}
      {...rest}
    >
      <Icon className="justify-self-center" />
      {children}
    </button>
  );
}
