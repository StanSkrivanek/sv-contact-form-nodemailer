/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		fontFamily: {
			sansInter: ['Inter', 'sans-serif']
		},
		extend: {
			colors: {
				primary: '#1E1E1E',
				scarlet: '#FF2D55',
				red: '#FF4D6a'
			}
		}
	},
	plugins: []
};
