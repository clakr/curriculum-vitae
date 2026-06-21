import { z } from "astro/zod";

export const requestPDFSchema = z.object({
  email: z.email("Invalid Email Address"),
});
