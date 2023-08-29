/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{html,js,svelte,ts}"],
	theme: {
		extend: {}
	},
	plugins: [require("daisyui")],
	daisyui: {
		themes: [
			{
				light: {
					// eslint-disable-next-line @typescript-eslint/no-var-requires
					...require("daisyui/src/theming/themes")["[data-theme=light]"],
					"base-300": "#0a092d"
				}
			}
		]
	}
};
