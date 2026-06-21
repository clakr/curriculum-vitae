import { IconFileTypePdf } from "@tabler/icons-react";
import { useForm } from "@tanstack/react-form";
import { z } from "astro/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldDescription, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { requestPDFSchema } from "@/lib/schemas";

import { Spinner } from "./ui/spinner";

const label = "Request resume as PDF via e-mail";

export function RequestPDFDialog() {
  const form = useForm({
    defaultValues: {
      email: "",
    } satisfies z.input<typeof requestPDFSchema>,
    validators: {
      onBlur: requestPDFSchema,
    },
    onSubmit: async ({ value }) => {
      const closeButton = document.querySelector<HTMLButtonElement>('[data-slot="dialog-close"]');
      closeButton?.click();

      toast.promise(
        fetch("/api/request-pdf", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(value),
        }).then((response) => {
          if (!response.ok) throw new Error(`Error: ${response.statusText}`);

          return response;
        }),
        {
          loading: "Sending request...",
          success: () => ({
            message: "PDF request sent",
            description:
              "Thanks. I’ll review your request and send the PDF resume directly to your email.",
          }),
          error: (error) => {
            return {
              message: error instanceof Error ? error.message : "Unknown error happened!",
              description:
                "Something went wrong while sending your request. Please try again in a moment.",
            };
          },
        },
      );
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon-lg" variant="ghost" title={label} aria-label={label}>
          <IconFileTypePdf />
          <span className="sr-only">{label}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[66ch]">
        <DialogHeader>
          <DialogTitle>Request PDF Resume</DialogTitle>
          <DialogDescription>
            For confidentiality purposes, I manually review PDF resume requests before sending a
            copy. Please provide your email address so I can send it to you directly.
          </DialogDescription>
        </DialogHeader>
        <form
          id="form"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field name="email">
              {(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                const errorElementId = `${field.name}-error`;

                return (
                  <Field data-invalid={isInvalid}>
                    <Label htmlFor={field.name}>Email</Label>
                    <Input
                      type="email"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      aria-describedby={isInvalid ? errorElementId : undefined}
                    />
                    <FieldDescription>
                      Your email will only be used for this request and will not be exposed, shared,
                      or used for any other purpose.
                    </FieldDescription>
                    {isInvalid && (
                      <FieldError id={errorElementId} errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
          </FieldGroup>
        </form>
        <DialogFooter>
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <Button form="form" type="submit" disabled={!canSubmit}>
                {isSubmitting ? (
                  <>
                    <Spinner data-icon="inline-start" />
                    Requesting...
                  </>
                ) : (
                  "Request"
                )}
              </Button>
            )}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
