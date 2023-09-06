"use client";

import * as RadioGroup from "@radix-ui/react-radio-group";
import * as Accordion from "@radix-ui/react-accordion";
import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  forwardRef,
  useEffect,
  useState,
} from "react";
import { useTheme } from "next-themes";
import {
  FaFilePdf,
  FaSun,
  FaMoon,
  FaGithub,
  FaDesktop,
  FaS,
} from "react-icons/fa6";
import { IconType } from "react-icons";
import { cx } from "cva";
import { twMerge } from "tailwind-merge";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
import Modal from "./Modal";

type Button = {
  icon: IconType;
  label: string;
  disabled?: boolean;
};

const buttons: Button[] = [
  {
    icon: FaFilePdf,
    label: "Export to PDF",
    disabled: true,
  },
  {
    icon: FaGithub,
    label: "Sign in with GitHub",
    disabled: true,
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
    <Modal title="Command Menu" open={isOpen} onOpenChange={setIsOpen}>
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
        <Accordion.Root type="single">
          <Accordion.Item value="item-1">
            {/* <Accordion.Header asChild>
              <Accordion.Trigger asChild>
                <Button icon={FaSun}>qwe</Button>
              </Accordion.Trigger>
            </Accordion.Header> */}
            <Accordion.Header asChild>
              <Accordion.Trigger asChild>
                <Button icon={FaSun}>qwe</Button>
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>asd</Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>
        {buttons.map(({ icon, label, ...rest }, index) => (
          <Button key={index} icon={icon} {...rest}>
            {label}
          </Button>
        ))}
      </div>
    </Modal>
  );
}

const Button = forwardRef<
  HTMLButtonElement,
  JSX.IntrinsicElements["button"] & { icon: IconType }
>(({ icon, children, className, ...rest }, forwardedRef) => {
  const Icon = icon;
  return (
    <button
      className={twMerge(
        cx(
          "grid h-8 w-full grid-cols-[20px_auto] items-center gap-x-2 px-3 text-start hover:bg-neutral-200 focus:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
        ),
        className
      )}
      {...rest}
    >
      <Icon className="justify-self-center" />
      {children}
    </button>
  );
});

Button.displayName = "Button";
