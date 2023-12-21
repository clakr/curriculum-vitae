import { name } from "@content/information/index.json";

function getMiddleInitial() {
	return `${name.middle.trim().charAt(0).toLocaleUpperCase()}.`;
}

export default function () {
	return `${name.first} ${getMiddleInitial()} ${name.last}`;
}
