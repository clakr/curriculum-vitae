import { defineCollection, reference, z } from "astro:content";

const about = defineCollection({
	type: "content",
	schema: z.object({
		list: z.array(z.string()),
	}),
});

const organization = defineCollection({
	type: "data",
	schema: z.object({
		name: z.string(),
		location: z.string(),
		mode: z.string().optional(),
		position: z.string().optional(),
		durationFrom: z.string().transform((value) => new Date(value)),
		durationTo: z
			.string()
			.transform((value) => new Date(value))
			.optional(),
	}),
});

const education = defineCollection({
	type: "content",
	schema: z.object({
		organization: reference("organization"),
		degree: z.string().optional(),
		thesis: z.string().optional(),
		awards: z.string().optional(),
	}),
});

const experience = defineCollection({
	type: "content",
	schema: z.object({
		organization: reference("organization"),
		responsibilities: z.array(z.string()),
	}),
});

const leadership = defineCollection({
	type: "content",
	schema: z.object({
		organization: reference("organization"),
		course: z.string(),
		title: z.string(),
		positions: z.array(z.string()),
		responsibilities: z.array(z.string()).optional(),
		isHidden: z.boolean().default(false),
	}),
});

const miscellaneousCollection = defineCollection({
	type: "content",
	schema: z.object({
		list: z.array(z.string()),
	}),
});

const technical = miscellaneousCollection;
const framework = miscellaneousCollection;
const tool = miscellaneousCollection;
const language = miscellaneousCollection;
const interest = miscellaneousCollection;

export const collections = {
	about,
	organization,
	education,
	experience,
	leadership,
	technical,
	framework,
	tool,
	language,
	interest,
};
