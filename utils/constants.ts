import stringToSlug from "./stringToSlug";

export const models = [
  "Basic Information",
  "About",
  "Organization",
  "Education",
  "Experience",
  "Leadership",
  "Miscellaneous",
];

export const routes = models.map((model) => ({
  label: model,
  href: stringToSlug(model),
}));
