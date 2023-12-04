export default function stringToSlug(input: string) {
  const slug = input.trim().toLocaleLowerCase().replace(/\s+/g, "-");
  return `/${slug}`;
}
