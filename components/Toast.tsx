"use client";

import * as ToastPrimitive from "@radix-ui/react-toast";
import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";
import { FaXmark } from "react-icons/fa6";

const errors = {
  NOT_AUTHORIZED: "🤔 hmmm you can't go through there.",
} as const;

export default function Toast() {
  const search = useSearchParams();
  const searchError = search.get("error") as keyof typeof errors;
  const [isOpen, setIsOpen] = useState(!!searchError);

  return (
    <ToastPrimitive.Provider swipeDirection="right">
      <ToastPrimitive.Root
        className="space-y-1 rounded-md border border-neutral-200 bg-white text-xs data-[swipe=cancel]:translate-x-0 data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[state=closed]:animate-hide data-[state=open]:animate-slideIn data-[swipe=end]:animate-swipeOut data-[swipe=cancel]:transition-[transform_200ms_ease-out] dark:border-neutral-700 dark:bg-neutral-800"
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <header className="flex justify-between">
          <ToastPrimitive.Title className="px-4 pt-3 font-bold uppercase">
            ERROR: {searchError}
          </ToastPrimitive.Title>
          <ToastPrimitive.Close className="self-center justify-self-end p-3 focus:bg-neutral-300 dark:focus:bg-neutral-800">
            <FaXmark />
          </ToastPrimitive.Close>
        </header>
        <ToastPrimitive.Description className="px-4 pb-3">
          {errors[searchError]}
        </ToastPrimitive.Description>
      </ToastPrimitive.Root>
      <ToastPrimitive.Viewport className="fixed bottom-0 right-0 z-20 flex max-h-screen w-full flex-col-reverse p-4 md:max-w-xs" />
    </ToastPrimitive.Provider>
  );
}
