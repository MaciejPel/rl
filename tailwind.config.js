/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{html,js,svelte,ts}"],
	theme: {
		extend: {
			fontFamily: {
				quicksand: ["Quicksand"]
			}
		}
	},
	plugins: [require("daisyui")],
	daisyui: {
		themes: [
			{
				light: {
					// eslint-disable-next-line @typescript-eslint/no-var-requires
					...require("daisyui/src/theming/themes")["[data-theme=light]"],
					"base-content": "#000",
					"base-300": "#f6f7fb"
				}
			},
			{
				dark: {
					// eslint-disable-next-line @typescript-eslint/no-var-requires
					...require("daisyui/src/theming/themes")["[data-theme=dark]"],
					"base-content": "#fff",
					"base-300": "#0a092d"
				}
			}
		]
	}
};
