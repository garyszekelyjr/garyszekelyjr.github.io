/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.svelte"],
	theme: {
		colors: {
			'blue': '#89b4fa',
			'yellow': '#f9e2af',
			'subtext': '#a6adc8'
		},
		extend: {},
	},
	plugins: [],
	safelist: [{
		pattern: /(text-yellow)/
	}]
}

