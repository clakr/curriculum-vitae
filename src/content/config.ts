import { defineCollection, z } from "astro:content";

const organization = defineCollection({
  type: "data",
  schema: z.object({
    name: z.string(),
    position: z.string().optional(),
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

const education = defineCollection({
  type: "data",
  schema: z.object({
    degree: z.string().optional(),
    thesis: z.string().optional(),
    awards: z.string().optional(),
  }),
});

const project = defineCollection({
  type: "data",
  schema: z.object({
    name: z.string(),
    description: z.string(),
    link: z.string().url(),
    repository: z.string().url(),
  }),
});

export const collections = {
  organization,
  experience,
  education,
  project,
};
