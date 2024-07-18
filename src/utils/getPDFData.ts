import type { InferEntrySchema } from "astro:content";
import { readdir } from "node:fs/promises";

type WithOrganization<T> = T & {
  organization: InferEntrySchema<"organization">;
};

export default async function getPDFData() {
  const experience = (
    await Promise.allSettled<WithOrganization<InferEntrySchema<"experience">>>(
      (await readdir("./src/content/experience")).map(async (f) => ({
        ...(await Bun.file(`./src/content/experience/${f}`).json()),
        organization: await Bun.file(`./src/content/organization/${f}`).json(),
      })),
    )
  )
    .map((promise) =>
      promise.status === "rejected" ? undefined : promise.value,
    )
    .filter((e) => e !== undefined);

  const project = (
    await Promise.allSettled<InferEntrySchema<"project">>(
      (await readdir("./src/content/project")).map(
        async (f) => await Bun.file(`./src/content/project/${f}`).json(),
      ),
    )
  )
    .map((promise) =>
      promise.status === "rejected" ? undefined : promise.value,
    )
    .filter((p) => p !== undefined);

  const education = (
    await Promise.allSettled<WithOrganization<InferEntrySchema<"education">>>(
      (await readdir("./src/content/education")).map(async (f) => ({
        ...(await Bun.file(`./src/content/education/${f}`).json()),
        organization: await Bun.file(`./src/content/organization/${f}`).json(),
      })),
    )
  )
    .map((promise) =>
      promise.status === "rejected" ? undefined : promise.value,
    )
    .filter((e) => e !== undefined);

  const technical = (await Bun.file(`./src/technical.json`).json())
    .list as string[];
  const framework = (await Bun.file(`./src/framework.json`).json())
    .list as string[];
  const tool = (await Bun.file(`./src/tool.json`).json()).list as string[];
  const language = (await Bun.file(`./src/language.json`).json())
    .list as string[];
  const interest = (await Bun.file(`./src/interest.json`).json())
    .list as string[];

  return {
    experience,
    project,
    education,
    technical,
    framework,
    tool,
    language,
    interest,
  };
}
