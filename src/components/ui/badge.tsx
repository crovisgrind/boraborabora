"use client";

// Removidas as importações de Card e Badge para simplificar e garantir que o estilo Tailwind puro funcione.
import { Badge } from "@/components/ui/badge"; // Mantendo a Badge, mas a importação pode precisar ser ajustada para o seu projeto

import type { Race } from "@/types/races";
import { ArrowRight } from "lucide-react";

// Assume-se que a interface Race pode ter um imageUrl para o visual premium.
interface RaceWithImage extends Race {
    imageUrl?: string;
}

export function RaceCard({ race }: { race: RaceWithImage }) {
  const formatDate = (isoDate: string) => {
    try {
      const localDateString = isoDate + 'T00:00:00';

      return new Date(localDateString).toLocaleDateString("pt-BR", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return "Data não disponível";
    }
  };

  const formattedDate = formatDate(race.date);
  const typeText = race.type === "trail" ? "⛰️ Trilha" : "🏃 Asfalto";
  
  // Imagem de fundo placeholder.
  const backgroundImage = race.imageUrl || 'https://images.unsplash.com/photo-1549216172-e56c5a2c42c9?q=80&w=2000&auto=format&fit=crop';

  return (
    // 🚨 CORRIGIDO: Card usa variáveis para fundo, texto e borda.
    <div className="rounded-xl overflow-hidden shadow-lg border border-[var(--border)] bg-[var(--surface-1)] hover:shadow-xl transition-all duration-300">
      
      {/* Imagem de Fundo do Card */}
      <div 
        className="h-32 bg-cover bg-center flex items-end p-4"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[var(--surface-1)] text-[var(--text-primary)] shadow-md">
          {race.city} - {race.state}
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="p-4 space-y-3">
        
        {/* Título e Tipo */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-xl font-bold text-[var(--text-primary)] leading-tight">
            {race.name}
          </h3>

          {/* Badge de Tipo de Corrida - 🚨 AJUSTADO PARA USAR VARIÁVEIS */}
          <Badge
            className={`
              text-xs font-medium px-2 py-0.5 rounded-full
              border border-[var(--border)] shadow-sm whitespace-nowrap
              ${race.type === "trail"
                ? "bg-[var(--surface-2)] text-[var(--smart-blue)]" // Exemplo: Trail usa a cor azul do tema
                : "bg-[var(--surface-2)] text-[var(--text-primary)]" // Exemplo: Road usa a cor primária do tema
              }
            `}
          >
            {typeText}
          </Badge>
        </div>

        {/* Data */}
        <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
          <span className="text-lg">📅</span>
          <time className="font-medium">
            {formattedDate}
          </time>
        </div>

        {/* Distâncias */}
        <div className="flex flex-wrap gap-2 pt-2">
          {race.distances
            .filter((d): d is string => typeof d === "string" && d.length > 0)
            .map((distance) => (
              <div
                key={distance}
                className="
                    px-3 py-1 rounded-full text-xs
                    bg-[var(--surface-2)] text-[var(--text-primary)] 
                    font-bold border border-[var(--border)] shadow-sm
                "
              >
                {distance}
              </div>
            ))}
        </div>

        {/* Link de Detalhes (Botão/CTA) */}
        {race.url && (
            <div className="flex justify-end pt-3">
                <a
                    href={race.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                        p-2 rounded-full transition-colors inline-flex items-center justify-center
                        bg-[var(--accent)] text-[var(--accent-foreground)]
                        hover:bg-opacity-90 active:bg-opacity-80
                        focus:outline-none focus:ring-4 focus:ring-[var(--accent)]/50
                        ml-4
                    "
                    aria-label="Ver detalhes da corrida"
                >
                    <ArrowRight className="w-5 h-5"/>
                </a>
            </div>
        )}
      </div>
    </div>
  );
}