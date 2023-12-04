import stringToSlug from "./stringToSlug";

export const models = [
  "Basic Information",
  "About",
  "Organization",
  "Education",
  "Experience",
  "Leadership",
  "Technical",
  "Tool",
  "Language",
  "Interest",
];

export const routes = models.map((model) => ({
  label: model,
  href: stringToSlug(model),
}));
