/** @type {import('tailwindcss').Config} */
import themes from "daisyui/src/theming/themes";

function withOpacityValue(variable) {
	return ({ opacityValue }) => {
		if (opacityValue === undefined) {
			return `hsl(var(${variable}))`;
		}
		return `hsl(var(${variable}) / ${opacityValue})`;
	};
}

export default {
	content: ["./src/**/*.{html,js,svelte,ts}"],
	theme: {
		extend: {
			colors: {
				// border: withOpacityValue("--border")
				// contrary: withOpacityValue("--contrary")
			},
			fontFamily: {
				"open-sans": "Open sans, sans-serif"
			}
		}
	},
	plugins: [require("daisyui")],
	daisyui: {
		logs: false,
		themes: [
			{
				light: {
					...themes["[data-theme=light]"],
					"base-content": "#000"
					// "base-300": "#f6f7fb",
					// "--border": "338 83% 66%"
					// "--contrary": "0 100% 100%"
				}
			},
			{
				dark: {
					...themes["[data-theme=dark]"],
					"base-content": "#fff"
					// "base-300": "#0a092d",
					// "--border": "224 22% 20%"
					// "--contrary": "0 100% 0%"
				}
			}
		]
	}
};
