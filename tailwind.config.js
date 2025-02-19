/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	darkMode: 'class',
	theme: {
		extend: {
			screens: {
				mdlg: '800px'
			},
			colors: {
				primary: {
					50: 'hsl(32, 100%, 96%)',
					100: 'hsl(34, 100%, 91%)',
					200: 'hsl(31, 100%, 83%)',
					300: 'hsl(30, 100%, 71%)',
					400: 'hsl(26, 100%, 60%)',
					500: 'hsl(23, 100%, 52%)',
					600: 'hsl(19, 99%, 50%)',
					700: 'hsl(16, 97%, 40%)',
					800: 'hsl(14, 87%, 34%)',
					900: 'hsl(13, 82%, 28%)',
					950: 'hsl(11, 89%, 15%)',
					DEFAULT: 'hsl(19, 99%, 50%)'
				},
				secondary: {
					50: 'hsl(194, 100%, 96%)',
					100: 'hsl(196, 100%, 90%)',
					200: 'hsl(194, 100%, 83%)',
					300: 'hsl(191, 100%, 71%)',
					400: 'hsl(194, 100%, 57%)',
					500: 'hsl(200, 100%, 50%)',
					600: 'hsl(210, 100%, 50%)',
					700: 'hsl(217, 100%, 50%)',
					800: 'hsl(218, 100%, 45%)',
					900: 'hsl(215, 100%, 35%)',
					950: 'hsl(213, 100%, 19%)',
					DEFAULT: 'hsl(213, 100%, 19%)'
				},
				terciary: {
					50: 'hsl(141, 100%, 97%)',
					100: 'hsl(147, 100%, 92%)',
					200: 'hsl(147, 100%, 85%)',
					300: 'hsl(147, 100%, 73%)',
					400: 'hsl(147, 92%, 58%)',
					500: 'hsl(147, 94%, 45%)',
					600: 'hsl(147, 100%, 36%)',
					700: 'hsl(148, 95%, 33%)',
					800: 'hsl(148, 85%, 24%)',
					900: 'hsl(149, 81%, 20%)',
					950: 'hsl(149, 100%, 10%)',
					DEFAULT: 'hsl(148, 95%, 33%)'
				},
				quaternary: {
					50: 'hsl(5, 86%, 97%)',
					100: 'hsl(2, 93%, 94%)',
					200: 'hsl(3, 100%, 89%)',
					300: 'hsl(3, 96%, 82%)',
					400: 'hsl(3, 93%, 71%)',
					500: 'hsl(3, 86%, 60%)',
					600: 'hsl(3, 74%, 48%)',
					700: 'hsl(3, 76%, 42%)',
					800: 'hsl(3, 72%, 35%)',
					900: 'hsl(3, 64%, 31%)',
					950: 'hsl(3, 77%, 15%)',
					DEFAULT: 'hsl(3, 74%, 48%)'
				},
				error: '#d32f2f',
				success: '#2e7d32',
				focus: '#1976d2',
				cancel: '#77838f'
			}
		},
		animation: {
			'pulse-fast': 'pulse 2s ease-in-out 0s infinite',
			'pulse-medium': 'pulse 2s ease-in-out 1.5s infinite',
			'pulse-slow': 'pulse 2s ease-in-out 3s infinite'
		},
		fontFamily: {
			montserrat: [
				'Montserrat',
				'sans-serif',
				'Roboto',
				'Helvetica Neue'
			],
			body: [
				'Roboto',
				'ui-sans-serif',
				'system-ui',
				'-apple-system',
				'system-ui',
				'Segoe UI',
				'Roboto',
				'Helvetica Neue',
				'Arial',
				'Noto Sans',
				'sans-serif',
				'Apple Color Emoji',
				'Segoe UI Emoji',
				'Segoe UI Symbol',
				'Noto Color Emoji'
			],
			sans: [
				'Roboto',
				'ui-sans-serif',
				'system-ui',
				'-apple-system',
				'system-ui',
				'Segoe UI',
				'Roboto',
				'Helvetica Neue',
				'Arial',
				'Noto Sans',
				'sans-serif',
				'Apple Color Emoji',
				'Segoe UI Emoji',
				'Segoe UI Symbol',
				'Noto Color Emoji'
			]
		}
	},
	plugins: []
}
