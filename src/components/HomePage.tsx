// pages/HomePage.tsx
"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { SearchBar } from "@/components/SearchBar";
import { FilterBar } from "@/components/FilterBar";
import { StateSelector } from "@/components/StateSelector";
import { RaceCard } from "@/components/RaceCard";
import { SkeletonCard } from "@/components/SkeletonCard";
import type { Race } from "@/types/races";
import { Loader2, TrendingUp } from "lucide-react";

export default function HomePage() {
  const [races, setRaces] = useState<Race[]>([]);
  const [loading, setLoading] = useState(true);
  const [locationMessage, setLocationMessage] = useState("Buscando eventos de corrida no Brasil...");

  // Filter states
  const [activeDistance, setActiveDistance] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedState, setSelectedState] = useState<string | null>("SP");

  // Loading skeleton count
  const SKELETON_COUNT = 6;

  // --- MAIN DATA FETCH ---
  const loadRaces = useCallback(async () => {
    setLoading(true);
    setRaces([]);

    try {
      const url = `/api/races`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Erro de rede: ${response.statusText}`);
      }

      const data: Race[] = await response.json();
      setRaces(data);
      setLocationMessage(`Encontramos ${data.length} eventos em todo o Brasil.`);
    } catch (err) {
      console.error("Fetch error:", err);
      setLocationMessage("Erro ao carregar os eventos. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRaces();
  }, [loadRaces]);

  // --- CLIENT-SIDE FILTERING ---
  const filteredRaces = useMemo(() => {
    return races.filter((race) => {
      const distanceMatch = activeDistance
        ? race.distances.includes(activeDistance)
        : true;

      const searchLower = searchTerm.toLowerCase();
      const searchMatch =
        race.title.toLowerCase().includes(searchLower) ||
        race.location.toLowerCase().includes(searchLower);

      const stateMatch =
        selectedState && selectedState !== "Todas"
          ? race.state.toLowerCase() === selectedState.toLowerCase()
          : true;

      return distanceMatch && searchMatch && stateMatch;
    });
  }, [races, activeDistance, searchTerm, selectedState]);

  return (
    <>
      <Header />

      {/* === HERO SECTION === */}
      <HeroSection />

      <main className="min-h-screen bg-[var(--bg)]">
        {/* === FILTER SECTION === */}
        <section className="relative -mt-32 z-20 px-4 sm:px-6 lg:px-8 pb-16">
          <div className="max-w-6xl mx-auto">
            {/* Glass Container */}
            <div className="glass-lg rounded-3xl p-8 md:p-12 space-y-8 backdrop-blur-xl">
              {/* Search Bar */}
              <div className="max-w-3xl mx-auto">
                <SearchBar onTextSearchChange={setSearchTerm} />
              </div>

              {/* Filters Row */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <StateSelector selectedState={selectedState} onStateChange={setSelectedState} />
                
                <div className="hidden sm:block w-px h-8 bg-[var(--border)]" />
                
                <FilterBar activeFilter={activeDistance} onFilterChangeAction={setActiveDistance} />
              </div>
            </div>
          </div>
        </section>

        {/* === STATUS INDICATOR === */}
        {!loading && (
          <section className="px-4 sm:px-6 lg:px-8 pb-8">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[var(--success)] animate-pulse" />
                  <p className="text-sm text-[var(--text-secondary)]">{locationMessage}</p>
                </div>
                <p className="text-sm font-semibold text-[var(--accent)]">
                  {filteredRaces.length} evento{filteredRaces.length !== 1 ? "s" : ""} encontrado{filteredRaces.length !== 1 ? "s" : ""}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* === RACES GRID === */}
        <section className="px-4 sm:px-6 lg:px-8 pb-20">
          <div className="max-w-6xl mx-auto">
            {loading ? (
              // Loading Skeletons
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            ) : filteredRaces.length === 0 ? (
              // Empty State
              <div className="text-center py-20">
                <div className="mb-6 flex justify-center">
                  <div className="p-4 rounded-2xl bg-[var(--surface-2)]">
                    <TrendingUp className="w-12 h-12 text-[var(--text-secondary)]" />
                  </div>
                </div>

                <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-2">
                  Nenhum evento encontrado
                </h2>
                <p className="text-[var(--text-secondary)] mb-8 max-w-md mx-auto">
                  Não há corridas que correspondam aos seus filtros. Tente remover ou ajustar alguns filtros para ver mais eventos.
                </p>

                <button
                  onClick={() => {
                    setActiveDistance(null);
                    setSearchTerm("");
                    setSelectedState(null);
                  }}
                  className={`
                    px-6 py-3 rounded-full font-semibold
                    bg-gradient-to-r from-[var(--accent)] to-[var(--smart-blue)]
                    text-white hover:shadow-lg transition-all duration-300
                  `}
                >
                  Limpar Filtros
                </button>
              </div>
            ) : (
              // Race Cards Grid
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredRaces.map((race, idx) => (
                  <div
                    key={race.id}
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${idx * 50}ms` }}
                  >
                    <RaceCard race={race} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* === CTA SECTION === */}
        {!loading && filteredRaces.length > 0 && (
          <section className="px-4 sm:px-6 lg:px-8 py-16 border-t border-[var(--border)]">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
                Não encontrou o que procura?
              </h2>
              <p className="text-[var(--text-secondary)] mb-8 text-lg">
                Novos eventos são adicionados diariamente. Acompanhe as atualizações!
              </p>

              <button className={`
                px-8 py-4 rounded-full font-semibold text-white
                bg-gradient-to-r from-[var(--accent)] to-[var(--smart-blue)]
                hover:shadow-lg hover:scale-105 transition-all duration-300
              `}>
                📧 Receber Notificações
              </button>
            </div>
          </section>
        )}
      </main>

      {/* === FOOTER === */}
      <Footer />
    </>
  );
}

// === FOOTER COMPONENT ===
function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--surface-1)] border-t border-[var(--border)] mt-20">
      <div className="container mx-auto px-6 py-16">
        {/* Grid Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold text-gradient mb-3">BoraBoraBora</h3>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
              Encontre sua próxima corrida no Brasil. Busque por distância, localização e data com nossa plataforma inteligente.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-[var(--text-primary)] uppercase tracking-wider mb-4">
              Links Rápidos
            </h4>
            <ul className="space-y-2">
              {["Eventos", "Sobre", "Blog", "Contato"].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors text-sm"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-bold text-[var(--text-primary)] uppercase tracking-wider mb-4">
              Recursos
            </h4>
            <ul className="space-y-2">
              {["FAQ", "Guias", "Comunidade", "Feedback"].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors text-sm"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm font-bold text-[var(--text-primary)] uppercase tracking-wider mb-4">
              Redes Sociais
            </h4>
            <div className="flex gap-4">
              {[
                { icon: "𝕏", url: "https://twitter.com" },
                { icon: "📧", url: "https://instagram.com" },
                { icon: "💻", url: "https://github.com" },
              ].map((social) => (
                <a
                  key={social.icon}
                  href={social.url}
                  className="w-10 h-10 rounded-full bg-[var(--surface-2)] hover:bg-[var(--accent)] flex items-center justify-center transition-all duration-300 hover:scale-110"
                  aria-label={social.icon}
                >
                  <span className="text-lg">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[var(--border)] my-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between text-sm text-[var(--text-secondary)]">
          <p>&copy; {currentYear} BoraBoraBora. Todos os direitos reservados.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-[var(--accent)] transition-colors">
              Privacidade
            </a>
            <a href="#" className="hover:text-[var(--accent)] transition-colors">
              Termos
            </a>
            <a href="#" className="hover:text-[var(--accent)] transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}