// ========================================
// 3. HEADER PREMIUM COM GLASSMORPHISM
// ========================================

// components/Header.tsx
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export function Header() {
  const [theme, setTheme] = useState("light");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const current = document.documentElement.classList.contains("dark") ? "dark" : "light";
    setTheme(current);

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function toggleTheme() {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.className = next;
    localStorage.setItem("theme", next);
  }

  return (
    <header
      className={`
        sticky top-0 z-40 transition-all duration-300
        ${scrolled 
          ? "glass shadow-lg backdrop-blur-md" 
          : "bg-[var(--surface-1)] border-b border-transparent"
        }
      `}
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a 
          href="/" 
          className="text-2xl font-bold text-gradient hover:opacity-80 transition-opacity"
        >
          BoraBoraBora
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#" className="text-[var(--text-secondary)] hover:text-[var(--accent)] smooth-transition">
            Eventos
          </a>
          <a href="#" className="text-[var(--text-secondary)] hover:text-[var(--accent)] smooth-transition">
            Sobre
          </a>
          <a href="#" className="text-[var(--text-secondary)] hover:text-[var(--accent)] smooth-transition">
            Contato
          </a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={toggleTheme}
            className="rounded-full hover:bg-[var(--surface-2)]"
            aria-label="Toggle theme"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </Button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden hover:text-[var(--accent)] transition-colors"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[var(--surface-1)] border-t border-[var(--border)] animate-fade-in-down">
          <nav className="px-6 py-4 space-y-3">
            <a href="#" className="block py-2 text-[var(--text-secondary)] hover:text-[var(--accent)]">
              Eventos
            </a>
            <a href="#" className="block py-2 text-[var(--text-secondary)] hover:text-[var(--accent)]">
              Sobre
            </a>
            <a href="#" className="block py-2 text-[var(--text-secondary)] hover:text-[var(--accent)]">
              Contato
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}