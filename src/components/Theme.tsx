import * as RadioGroup from "@radix-ui/react-radio-group";
import { useEffect, useState } from "react";

const themes = ["light", "dark"];

function capitalizeFirstLetter(input: string) {
	if (!input.length) return input;

	return input.charAt(0).toLocaleUpperCase() + input.slice(1);
}

export default function () {
	const [theme, setTheme] = useState(localStorage.getItem("theme") ?? "light");

	useEffect(() => {
		if (theme === "dark") {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
		localStorage.setItem("theme", theme);
	}, [theme]);

	return (
		<RadioGroup.Root
			className="flex flex-col gap-y-2"
			defaultValue={theme}
			onValueChange={(value) => setTheme(value)}
		>
			{themes.map((theme) => (
				<div className="flex items-center gap-x-2" key={theme}>
					<RadioGroup.Item
						value={theme}
						id={theme}
						className="h-[16px] w-[16px] rounded-full border border-neutral-300 bg-white dark:border-neutral-700 dark:bg-neutral-800"
					>
						<RadioGroup.Indicator className="relative flex h-full w-full items-center justify-center after:block after:h-[8px] after:w-[8px] after:rounded-full after:bg-neutral-800 dark:after:bg-neutral-300" />
					</RadioGroup.Item>
					<label htmlFor={theme} className="w-full">
						{capitalizeFirstLetter(theme)}
					</label>
				</div>
			))}
		</RadioGroup.Root>
	);
}
