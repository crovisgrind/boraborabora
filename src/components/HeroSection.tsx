// components/HeroSection.tsx
"use client";

import { useEffect, useState } from "react";
import type { Race } from "@/types/races";

export function HeroSection() {
  const [featuredRace, setFeaturedRace] = useState<Race | null>(null);

  useEffect(() => {
    // Busca um evento do crawler para destaque
    const fetchFeaturedRace = async () => {
      try {
        const response = await fetch("/api/races");
        const data: Race[] = await response.json();
        if (data.length > 0) {
          // Pega o primeiro evento como destaque
          setFeaturedRace(data[0]);
        }
      } catch (error) {
        console.error("Erro ao carregar race destaque:", error);
      }
    };

    fetchFeaturedRace();
  }, []);

  return (
    <section className="px-6 py-12 bg-yellow dark:bg-purple">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-block bg-cyan dark:bg-green neo-border-thick px-6 py-3 mb-6 -rotate-2 animate-fade-in-up">
              <span className="font-black text-xl text-black dark:text-black">🎯 +5.000 corridas</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6 animate-fade-in-up text-black dark:text-white">
              Encontre sua <span className="bg-orange dark:bg-cyan text-white dark:text-black px-4 neo-border-thick inline-block rotate-1">PRÓXIMA CORRIDA</span>
            </h1>

            <p className="text-2xl font-bold mb-8 animate-fade-in-up text-black dark:text-white max-w-xl">
              O maior buscador de corridas do Brasil. Filtro inteligente. Zero complicação.
            </p>
          </div>

          {/* Right - Featured Race Card */}
          {featuredRace && (
            <div className="relative hidden md:block">
              <div className="bg-cyan dark:bg-green neo-border-xl neo-shadow-xl p-6 -rotate-3">
                <div className="bg-white dark:bg-black neo-border-thick p-6 mb-4">
                  <div className="flex justify-between items-start mb-4">
                    <span className="bg-orange text-white font-black px-4 py-2 neo-border text-sm">
                      🌟 DESTAQUE
                    </span>
                    <span className="font-black text-2xl text-black dark:text-white">TOP</span>
                  </div>
                  <h3 className="font-black text-xl mb-3 text-black dark:text-white line-clamp-2">
                    {featuredRace.title}
                  </h3>
                  <p className="font-bold mb-4 text-black dark:text-white">
                    📍 {featuredRace.location} • 📅 {featuredRace.date}
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {featuredRace.distances.map((d: string) => (
                      <span
                        key={d}
                        className="bg-orange text-white font-black px-3 py-2 neo-border text-sm"
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}