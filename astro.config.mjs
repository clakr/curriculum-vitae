import { URL, fileURLToPath } from "url";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
	integrations: [
		tailwind({
			applyBaseStyles: false,
		}),
		react(),
	],
	vite: {
		resolve: {
			alias: [
				{
					find: "@content",
					replacement: fileURLToPath(new URL("./src/content", import.meta.url)),
				},
				{
					find: "@components",
					replacement: fileURLToPath(
						new URL("./src/components", import.meta.url),
					),
				},
				{
					find: "@utils",
					replacement: fileURLToPath(new URL("./src/utils", import.meta.url)),
				},
			],
		},
	},
});
