// src/pages/open-graph/[...route].ts
import { resolve } from "node:path";

import { OGImageRoute } from "astro-og-canvas";
import { experimental_getFontFileURL, fontData } from "astro:assets";

import { getMetaTags } from "@/lib/loaders";

const { author, description } = await getMetaTags();

export const { getStaticPaths, GET } = await OGImageRoute({
  param: "route",

  pages: {
    index: {
      title: author,
      description,
    },
  },

  getImageOptions: (_, page) => ({
    title: page.title,
    description: page.description,
    logo: {
      path: resolve(process.cwd(), "public/logo-with-text.png"),
      size: [200],
    },
    bgGradient: [
      [33, 41, 43],
      [22, 26, 28],
      [9, 11, 12],
    ],
    font: {
      title: {
        families: ["Geist"],
        weight: "ExtraBold",
        color: [249, 251, 251],
        size: 60,
        lineHeight: 1.1,
      },
      description: {
        families: ["Geist"],
        weight: "Normal",
        color: [103, 120, 124],
        size: 30,
        lineHeight: 1.3,
      },
    },
    fonts: [
      experimental_getFontFileURL(fontData["--font-geist"][0].src[0].url),
    ],
  }),
});
