/** @type {import('tailwindcss').Config} */
export default {
	darkMode: "class",
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {
			backgroundImage: {
				noise: "url(/noise.png)",
			},
			keyframes: {
				overlayShow: {
					from: { opacity: "0" },
					to: { opacity: "1" },
				},
				contentShow: {
					from: {
						opacity: "0",
						transform: "translate(-50%, 47.5%) scale(0.95)",
					},
					to: {
						opacity: "1",
						transform: "translate(-50%, -50%) scale(1)",
					},
				},
				slideDown: {
					from: { height: 0 },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				slideUp: {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: 0 },
				},
			},
			animation: {
				overlay: "overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
				modal: "contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
				slideDown: "slideDown 300ms cubic-bezier(0.87, 0, 0.13, 1)",
				slideUp: "slideUp 300ms cubic-bezier(0.87, 0, 0.13, 1)",
			},
		},
	},
	plugins: [],
};
