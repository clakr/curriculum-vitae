export default function slugToString(input: string) {
  const slug = input.startsWith("/") ? input.slice(1) : input;

  return slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toLocaleUpperCase());
}
