// components/Header.tsx
"use client";

import { useEffect, useState } from "react";

export function Header() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const current = document.documentElement.classList.contains("dark") ? "dark" : "light";
    setTheme(current);
  }, []);

  function toggleTheme() {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.className = next;
    localStorage.setItem("theme", next);
  }

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-black neo-border-thick border-l-0 border-r-0 neo-shadow">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <div className="w-12 h-12 bg-orange neo-border flex items-center justify-center">
            <span className="text-2xl font-bold text-white">🏃</span>
          </div>
          <span className="text-2xl font-bold">
            Bora<span className="text-orange">Bora</span>
          </span>
        </a>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="btn-neo bg-yellow text-black font-bold px-4 py-2"
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </div>
    </header>
  );
}