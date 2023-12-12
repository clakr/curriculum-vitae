export default function formDataToObject(formData: FormData) {
  const object: { [index: string]: string } = {};

  for (const [key, value] of formData.entries()) {
    if (/^\$/.test(key)) continue;
    object[key] = value.toString();
  }

  return object;
}
