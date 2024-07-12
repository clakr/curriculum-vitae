import { defineCollection, z } from "astro:content";

const organization = defineCollection({
  type: "data",
  schema: z.object({
    name: z.string(),
    position: z.string(),
    location: z.string(),
    duration: z.object({
      from: z.string().transform((string) => new Date(string)),
      to: z
        .string()
        .transform((string) => new Date(string))
        .optional(),
    }),
  }),
});

const experience = defineCollection({
  type: "data",
  schema: z.object({
    responsibilities: z.array(z.string()),
  }),
});

export const collections = {
  organization,
  experience,
};
