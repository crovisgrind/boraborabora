import type { Metadata } from "next";
import './globals.css';

export const metadata: Metadata = {
  title: 'Corridas BR | Encontre seu PrÃ³ximo Evento',
  description: 'Seu catÃ¡logo de eventos de corrida de rua e trilha no Brasil.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme') || 'light';
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })()
            `,
          }}
        />
        {children}
      </body>
    </html>
  );
}