/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				primary: '#FF5C35',
				secondary: '#D74697',
				accent: '#7DE261',
				'accent-light': '#CCF6B1',
			},
		},
	},
	plugins: [],
}