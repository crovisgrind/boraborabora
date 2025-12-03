import './globals.css';

export const metadata = {
  title: 'Corridas BR | Encontre seu Próximo Evento',
  description: 'Seu catálogo de eventos de corrida de rua e trilha no Brasil.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        {/* Script para aplicar dark mode no carregamento */}
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