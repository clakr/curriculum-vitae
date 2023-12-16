"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { FaXmark } from "react-icons/fa6";

export default function Modal({
  open,
  onOpenChange,
  children,
  title,
  trigger,
}: Dialog.DialogProps & {
  title: string;
  trigger?: React.ReactNode;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {trigger ? <Dialog.Trigger asChild>{trigger}</Dialog.Trigger> : null}
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-10 animate-overlay bg-white/75 dark:bg-black/75" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-20 grid w-full max-w-[85%] -translate-x-1/2 -translate-y-1/2 animate-modal grid-rows-[50px_auto] rounded-md border border-neutral-300 bg-neutral-200 text-sm dark:border-neutral-800 dark:bg-neutral-900 mobileLarge:max-w-sm">
          <header className="grid grid-cols-2 border-b border-neutral-300 dark:border-neutral-800">
            <Dialog.Title className="self-center whitespace-nowrap px-3">
              {title}
            </Dialog.Title>
            <Dialog.Close className="self-center justify-self-end p-3 focus:bg-neutral-300 dark:focus:bg-neutral-800">
              <FaXmark />
            </Dialog.Close>
          </header>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
