/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
          "ozura-blue": "#1794fc",
        "color-1": "#9e325f",
        "color-2": "#8e5f43",
        "color-3": "#252031",
        "color-4": "#573e91",
        "color-5": "#436ba2",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
         animate: {
          '0%': {
            borderRadius: '30% 70% 70% 30% / 30% 30% 70% 60%',
            transform: 'scale(0) rotate(0deg) translate(20%, 20%)',
          },
          '100%': {
            borderRadius: '88% 10% 22% 58% / 73% 56% 34% 77%',
            transform: 'scale(2) rotate(180deg) translate(20%, -20%)',
          },
        },
      },
      backdropBlur: {
        '200': '100px'
  
      
      },
       borderGrad: {
        '1': {
            borderWidth: '2px',
            borderStyle: 'solid',
            borderImage: 'linear-gradient(to right,#436ba2,#573e91,#9e325f) 1',
        }
      },
       backgroundImage: {
        'auth': "url('/img/hero-pattern.svg')",
        'footer-texture': "url('/img/footer-texture.png')",
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        'flip': 'animate 15s ease-in-out infinite alternate',
        'backflip': 'animate 15s ease-in-out infinite alternate-reverse',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}