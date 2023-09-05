import * as Dialog from "@radix-ui/react-dialog";
import { PropsWithChildren } from "react";

export default function Modal({
  open,
  onOpenChange,
  children,
}: Dialog.DialogProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-10 animate-overlay bg-white/75 dark:bg-black/75" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-20 grid w-full max-w-[85%] -translate-x-1/2 -translate-y-1/2 animate-modal grid-rows-[50px_auto] rounded-md border border-neutral-200 bg-neutral-100 text-sm dark:border-neutral-800 dark:bg-neutral-900 mobileLarge:max-w-sm">
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function ModalTitle({ children }: PropsWithChildren) {
  return (
    <Dialog.Title className="self-center whitespace-nowrap px-3">
      {children}
    </Dialog.Title>
  );
}

function ModalClose({ children }: PropsWithChildren) {
  return (
    <Dialog.Close className="self-center justify-self-end p-3 focus:bg-neutral-200 dark:focus:bg-neutral-800">
      {children}
    </Dialog.Close>
  );
}

Modal.Title = ModalTitle;
Modal.Close = ModalClose;
