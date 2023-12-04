export default function formatList(list: string[]) {
  return new Intl.ListFormat("en", {
    style: "long",
    type: "conjunction",
  }).format(list);
}
