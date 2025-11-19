import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				'sans': ['Inter', 'system-ui', 'sans-serif'],
				'heading': ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
			},
			colors: {
				// Brand colors
				brand: {
					DEFAULT: 'hsl(262 86% 60%)',
					50: 'hsl(262 86% 97%)',
					100: 'hsl(262 86% 94%)',
					600: 'hsl(262 70% 52%)',
					700: 'hsl(262 60% 45%)',
					foreground: 'hsl(0 0% 100%)'
				},
				// Base colors
				border: 'hsl(214 32% 91%)',
				input: 'hsl(214 32% 91%)',
				ring: 'hsl(262 86% 60%)',
				background: 'hsl(0 0% 100%)',
				foreground: 'hsl(240 10% 10%)',
				// Semantic colors (keeping shadcn structure)
				primary: {
					DEFAULT: 'hsl(262 86% 60%)',
					foreground: 'hsl(0 0% 100%)'
				},
				secondary: {
					DEFAULT: 'hsl(210 14% 95%)',
					foreground: 'hsl(240 10% 10%)'
				},
				destructive: {
					DEFAULT: 'hsl(0 84% 60%)',
					foreground: 'hsl(0 0% 100%)'
				},
				muted: {
					DEFAULT: 'hsl(240 4% 96%)',
					foreground: 'hsl(240 4% 46%)'
				},
				accent: {
					DEFAULT: 'hsl(210 14% 95%)',
					foreground: 'hsl(240 10% 10%)'
				},
				popover: {
					DEFAULT: 'hsl(0 0% 100%)',
					foreground: 'hsl(240 10% 10%)'
				},
				card: {
					DEFAULT: 'hsl(0 0% 100%)',
					foreground: 'hsl(240 10% 10%)'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
