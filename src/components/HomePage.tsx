// app/HomePage.tsx

"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
// O seu projeto pode ter a Header e Footer na layout.tsx.
// Mantenha apenas os imports que você usa nesta página.
import { Header } from "@/components/Header"; 
import { SearchBar } from "@/components/SearchBar";
import { FilterBar } from "@/components/FilterBar";
// Import comentado: remova esta linha se você não a tiver no seu projeto original
// import { StateSelector } from "@/components/StateSelector"; 
import { RaceCard } from "@/components/RaceCard";
import type { Race } from "@/types/races";

// REMOVER: DEFAULT_ZIPCODE, DEFAULT_RADIUS e LocationParams

export default function HomePage() {
  const [races, setRaces] = useState<Race[]>([]);
  const [loading, setLoading] = useState(true);

  // REMOVER: locationParams state

  // Ajustado para o Brasil/Crawler
  const [locationMessage, setLocationMessage] = useState(
    "Buscando eventos de corrida no Brasil..."
  );

  // Local filter states
  const [activeDistance, setActiveDistance] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedState, setSelectedState] = useState<string | null>(null);

  // --- 1. MAIN DATA FETCH FUNCTION ---
  const loadRaces = useCallback(
    async () => {
      setLoading(true);
      setRaces([]);

      try {
        // Nova URL que chama o endpoint de crawling/normalização
        const url = `/api/races`; 
        
        const response = await fetch(url);
        const data: Race[] = await response.json();
        
        setRaces(data);
        setLocationMessage(
          `Encontramos ${data.length} eventos em todo o Brasil (via crawlers).`
        );
      } catch (err) {
        console.error("Fetch error:", err);
        setLocationMessage("Erro ao carregar os eventos.");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    loadRaces();
  }, [loadRaces]);

  // --- 2. CLIENT-SIDE FILTERING ---
  const filteredRaces = useMemo(() => {
    return races.filter((race) => {
      // Filter by Distance
      const distanceMatch = activeDistance
        ? race.distances.includes(activeDistance)
        : true;

      // Filter by Search Term (Title or Location)
      const searchLower = searchTerm.toLowerCase();
      const searchMatch =
        race.title.toLowerCase().includes(searchLower) ||
        race.location.toLowerCase().includes(searchLower);

      // Filter by State (if StateSelector is used)
      const stateMatch = selectedState
        ? race.state.toLowerCase() === selectedState.toLowerCase()
        : true;

      return distanceMatch && searchMatch && stateMatch;
    });
  }, [races, activeDistance, searchTerm, selectedState]);


  return (
    <>
      <Header />
      <SearchBar onTextSearchChange={setSearchTerm} />

      <div className="container mx-auto px-6 py-10">
        <h2 className="text-3xl font-semibold tracking-tight mb-4">
          Corridas Disponíveis
        </h2>

        <p className="text-(--text-secondary) mb-6">
          {loading ? "Buscando eventos..." : locationMessage}
        </p>

        {/* REMOVER: LocationInput ou StateSelector aqui, se não for usar o filtro de estado */}

        <FilterBar
          activeFilter={activeDistance}
          onFilterChangeAction={setActiveDistance}
        />

        {loading ? (
          <div className="flex justify-center items-center mt-12">
            <p className="text-(--text-secondary)">Carregando...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            {filteredRaces.length === 0 ? (
              <div className="md:col-span-2">
                <p className="text-(--text-secondary) text-lg">
                  Nenhum evento encontrado no Brasil que corresponda aos filtros atuais. Tente remover ou ajustar os filtros.
                </p>
              </div>
            ) : (
              filteredRaces.map((race) => (
                <RaceCard key={race.id} race={race} />
              ))
            )}
          </div>
        )}
      </div>
    </>
  );
}