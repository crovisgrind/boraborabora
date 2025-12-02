import type { Metadata, Viewport } from "next"; // 🚨 Importar Metadata
import { Inter } from "next/font/google";
//import { CookieBanner } from "@/components/CookieBanner"; 
//import { Footer } from "@/components/Footer";
import "./globals.css"; // 🚨 Garanta que o caminho do CSS é este

const inter = Inter({ subsets: ["latin"] });

// ----------------------------------------------------
// METADATA CORRIGIDA E TRADUZIDA PARA O BRASIL
// ----------------------------------------------------
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "BoraBoraBora - Encontre Corridas de Rua e Trilhas no Brasil", // 🇧🇷 TRADUÇÃO
  description:
    "Descubra as próximas corridas, maratonas, e meias maratonas perto de você no Brasil. Busque por distância, localização e data. Encontre sua próxima corrida com BoraBoraBora.", // 🇧🇷 TRADUÇÃO
  keywords:
    "corridas de rua, maratonas, meias maratonas, 5K, 10K, corridas de trilha, eventos de corrida no Brasil", // 🇧🇷 TRADUÇÃO
  authors: [{ name: "BoraBoraBora" }],
  creator: "BoraBoraBora",
  publisher: "BoraBoraBora",
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
  openGraph: {
    type: "website",
    locale: "pt_BR", // 🇧🇷 Locale
    url: "https://seu-dominio.com.br", // 🚨 Troque pelo seu domínio se houver
    siteName: "BoraBoraBora",
    title: "BoraBoraBora - Encontre Corridas no Brasil", // 🇧🇷 TRADUÇÃO
    description:
      "Descubra corridas, maratonas e meias maratonas. Busque por distância, localização e data no Brasil.", // 🇧🇷 TRADUÇÃO
    images: [{ url: "/og-image.jpg" }], // 🚨 Adicione uma imagem OpenGraph se tiver
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR"> {/* 🇧🇷 Linguagem corrigida */}
      <head>
        {/* Scripts e metas de verificação podem ser adicionados aqui ou no metadata */}
        {/* Exemplo: <link rel="preconnect" href="https://algum-servico-externo" /> */}
      </head>
      {/* 🚨 A classe do Tailwind é essencial para que o CSS funcione */}
      <body className={`${inter.className} bg-[var(--bg)] min-h-screen`}>
        {children}
        
        {/* <CookieBanner /> Se você não tiver o componente, comente ou remova */}
      </body>
    </html>
  );
}