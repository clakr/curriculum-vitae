import { strapi } from "@strapi/client";

export const client = strapi({
  baseURL: new URL("/api", import.meta.env.STRAPI_BASE_URL).href,
  auth: import.meta.env.STRAPI_AUTH_TOKEN,
});
