import type { Config } from "tailwindcss";

const config: Config = {
  // 🚨 ESSENCIAL: Diz ao Tailwind onde procurar por classes (app/ e src/)
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Aqui você pode adicionar cores, fontes, etc., se desejar usar os nomes
      // das variáveis que você definiu no globals.css de forma nativa no Tailwind.
    },
  },
  plugins: [],
};

export default config;