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

export default function HomePage() {
  const [races, setRaces] = useState<Race[]>([]);
  const [loading, setLoading] = useState(true);
  const [locationMessage, setLocationMessage] = useState("🔍 Buscando eventos...");

  const [activeDistance, setActiveDistance] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedState, setSelectedState] = useState<string | null>("SP");

  const SKELETON_COUNT = 6;

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
      setLocationMessage(`✅ ${data.length} corridas encontradas!`);
    } catch (err) {
      console.error("Fetch error:", err);
      setLocationMessage("❌ Erro ao carregar eventos");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRaces();
  }, [loadRaces]);

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
      <HeroSection />

      <main className="bg-white">
        {/* FILTER SECTION - NEOBRUTAL */}
        <section className="px-6 py-12 bg-cyan neo-border-thick border-l-0 border-r-0">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white neo-border-xl neo-shadow-xl p-8 space-y-8">
              {/* Search */}
              <div className="max-w-3xl mx-auto">
                <SearchBar onTextSearchChange={setSearchTerm} />
              </div>

              {/* Filters */}
              <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                <StateSelector selectedState={selectedState} onStateChange={setSelectedState} />
                <div className="hidden md:block w-1 h-12 bg-black" />
                <FilterBar activeFilter={activeDistance} onFilterChangeAction={setActiveDistance} />
              </div>
            </div>
          </div>
        </section>

        {/* STATUS */}
        {!loading && (
          <section className="px-6 py-6 bg-yellow neo-border-thick border-l-0 border-r-0">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
              <p className="font-black text-lg">{locationMessage}</p>
              <p className="font-black text-orange text-lg">
                {filteredRaces.length} evento{filteredRaces.length !== 1 ? "s" : ""}
              </p>
            </div>
          </section>
        )}

        {/* RACES GRID */}
        <section className="px-6 py-16 bg-white">
          <div className="max-w-6xl mx-auto">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            ) : filteredRaces.length === 0 ? (
              <div className="text-center py-20 bg-yellow neo-border-xl neo-shadow-xl p-12">
                <h2 className="text-4xl font-black mb-4">😞 NENHUMA CORRIDA</h2>
                <p className="text-xl font-bold mb-8 max-w-md mx-auto">
                  Nenhuma corrida corresponde aos seus filtros. Tente remover ou ajustar!
                </p>
                <button
                  onClick={() => {
                    setActiveDistance(null);
                    setSearchTerm("");
                    setSelectedState(null);
                  }}
                  className="btn-neo bg-orange text-white font-black neo-shadow-lg neo-shadow-hover"
                >
                  LIMPAR FILTROS
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

        {/* CTA */}
        {!loading && filteredRaces.length > 0 && (
          <section className="px-6 py-16 bg-purple neo-border-thick border-l-0 border-r-0">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-4xl font-black mb-4">📬 RECEBA NOTIFICAÇÕES</h2>
              <p className="text-xl font-bold mb-8">
                Novos eventos são adicionados diariamente!
              </p>
              <button className="btn-neo bg-white text-black font-black neo-shadow-lg neo-shadow-hover">
                INSCREVER
              </button>
            </div>
          </section>
        )}
      </main>

      {/* FOOTER */}
      <Footer />
    </>
  );
}

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black dark:bg-white text-white dark:text-black py-8 px-6 neo-border-thick border-l-0 border-r-0 border-b-0">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-bold">
          © {currentYear} <span className="text-orange font-black">BoraBoraBora</span>
        </p>
        <p className="font-bold text-center">
          O maior buscador de corridas do Brasil 🏃
        </p>
      </div>
    </footer>
  );
}