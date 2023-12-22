import { name } from "@content/information/index.json";
import getData from "./getData";

export default async function () {
	const data = await getData();

	const response = await fetch(
		"https://pdfgen.app/api/generate?templateId=2b18184",
		{
			headers: {
				"Content-Type": "application/json",
				api_key: import.meta.env.PUBLIC_PDFGEN_APP_API_KEY,
			},
			method: "POST",
			body: JSON.stringify({ data }),
		},
	);
	const blob = await response.blob();

	const a = document.createElement("a");
	document.body.appendChild(a);
	a.style.display = "none";
	a.href = URL.createObjectURL(blob);
	a.download = `${name.last}_CV.pdf`;
	a.click();
}
