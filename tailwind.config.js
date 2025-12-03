/** @type {import('tailwindcss').Config} */
module.exports = {
  // A seção 'content' é CRÍTICA. Ela diz ao Tailwind onde procurar as classes
  // que você está usando (como 'flex', 'bg-[var(--surface-1)]', 'text-xl', etc.)
  content: [
    // Escaneia a pasta app (onde está seu HomePage.tsx e layout.tsx)
    './app/**/*.{js,ts,jsx,tsx,mdx}', 
    
    // Escaneia a pasta components (onde estão RaceCard.tsx, FilterBar.tsx, etc.)
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    
    // Inclui a pasta 'src' por segurança, caso você use 'src/app', 'src/components', etc.
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Aqui você pode adicionar personalizações de fontes, cores, etc., se necessário.
      // Por agora, vamos deixar simples.
    },
  },
  plugins: [],
}