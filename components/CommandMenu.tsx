"use client";

import * as Dialog from "@radix-ui/react-dialog";
import * as RadioGroup from "@radix-ui/react-radio-group";
import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  useEffect,
  useState,
} from "react";
import { useTheme } from "next-themes";
import {
  FaXmark,
  FaFilePdf,
  FaInfo,
  FaSun,
  FaMoon,
  FaGithub,
  FaDesktop,
} from "react-icons/fa6";
import { IconType } from "react-icons";
import { cx } from "cva";
import { twMerge } from "tailwind-merge";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";

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
  {
    icon: FaGithub,
    label: "Sign in with GitHub",
  },
];

export default function CommandMenu() {
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
        <Dialog.Content className="fixed left-1/2 top-1/2 z-20 grid w-full max-w-[85%] -translate-x-1/2 -translate-y-1/2 animate-modal grid-rows-[50px_auto] rounded-md border border-neutral-200 bg-neutral-100 text-sm dark:border-neutral-800 dark:bg-neutral-900 mobileLarge:max-w-sm">
          <header className="grid grid-cols-2 border-b border-neutral-200 dark:border-neutral-800">
            <Dialog.Title className="self-center whitespace-nowrap px-3">
              Command Menu
            </Dialog.Title>
            <Dialog.Close className="self-center justify-self-end p-3 focus:bg-neutral-200 dark:focus:bg-neutral-800">
              <FaXmark />
            </Dialog.Close>
          </header>
          <div className="flex flex-col border-b border-neutral-200 p-3 dark:border-neutral-800">
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
                    className="h-[16px] w-[16px] rounded-full border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-800"
                  >
                    <RadioGroup.Indicator className="relative flex h-full w-full items-center justify-center after:block after:h-[8px] after:w-[8px] after:rounded-full after:bg-neutral-800 dark:after:bg-neutral-200" />
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
            {buttons.map(({ icon, label }, index) => (
              <Button key={index} icon={icon} disabled>
                {label}
              </Button>
            ))}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function Button({
  children,
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
          "grid h-8 grid-cols-[20px_auto] items-center gap-x-2 px-3 text-start hover:bg-neutral-200 focus:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800",
          className
        )
      )}
      {...rest}
    >
      <Icon className="justify-self-center" />
      {children}
    </button>
  );
}
