"use client";

import { useEffect, useState } from "react";
// Certifique-se de que o caminho para o componente Button está correto
import { Button } from "@/components/ui/button"; 

export function Header() {
  const [theme, setTheme] = useState("light");

  // Hook para ler o tema do localStorage e aplicar ao HTML na inicialização
  useEffect(() => {
    // Verifica se a classe 'dark' está presente no elemento <html>
    const current = document.documentElement.classList.contains("dark")
      ? "dark"
      : "light";
    setTheme(current);
  }, []);

  // Função para alternar o tema
  function toggleTheme() {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    // Aplica a classe 'dark' ou remove
    document.documentElement.className = next;
    // Salva a preferência
    localStorage.setItem("theme", next);
  }

  return (
    <header className="sticky top-0 z-40 bg-(--surface-1) border-b border-(--surface-2) backdrop-blur">
      <div className="container mx-auto px-6 py-4 flex items-center justify-center relative">
        <h1 className="text-2xl font-semibold text-(--text-primary)">
          <a href="/" className="hover:opacity-80 transition-opacity">
            BoraBoraBora {/* NOME DO PROJETO TEMPORÁRIO / TRADUÇÃO */}
          </a>
        </h1>

        {/* Botão de Tema */}
        <Button
          variant="outline"
          onClick={toggleTheme}
          className="rounded-full hover:bg-(--surface-2) absolute right-6"
          aria-label="Alternar modo claro/escuro" /* TRADUÇÃO */
        >
          {theme === "light" ? "🌙" : "☀️"}
        </Button>
      </div>
    </header>
  );
}