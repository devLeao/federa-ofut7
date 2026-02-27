import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class', // A MÁGICA FICA AQUI FORA!
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'fem-red': '#B31312', // Vermelho da logo
        'fem-dark': '#0A0A0A', // Preto chique
        'fem-gray': '#1A1A1A',
      },
    },
  },
  plugins: [],
};
export default config;