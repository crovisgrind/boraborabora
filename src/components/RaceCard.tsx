// ========================================
// 7. RACE CARD PREMIUM COM HOVER EFFECTS
// ========================================

// components/RaceCard.tsx
"use client";

import type { Race } from "@/types/races";
import { MapPin, Calendar } from "lucide-react";

interface RaceWithImage extends Race {
  imageUrl?: string;
}

export function RaceCard({ race }: { race: RaceWithImage }) {
  const formatDate = (isoDate: string) => {
    try {
      const localDateString = isoDate + "T00:00:00";
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
  const backgroundImage =
    race.imageUrl ||
    "https://images.unsplash.com/photo-1549216172-e56c5a2c42c9?q=80&w=2000&auto=format&fit=crop";

  return (
    <div
      className={`
        group rounded-2xl overflow-hidden 
        bg-[var(--surface-1)] border border-[var(--border)]
        hover:shadow-2xl hover:border-[var(--accent)] transition-all duration-500
        hover:-translate-y-2 flex flex-col h-full
      `}
    >
      {/* Image Section */}
      <div
        className="relative h-56 bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-all duration-300" />

        {/* Type Badge */}
        <div className="absolute top-4 right-4 z-10">
          <div
            className={`
              px-4 py-2 rounded-full text-sm font-bold text-white
              backdrop-blur-md border border-white/30
              ${race.type === "trail" ? "bg-green-600/80" : "bg-indigo-600/80"}
            `}
          >
            {typeText}
          </div>
        </div>

        {/* Date Overlay */}
        <div className="absolute bottom-4 left-4 z-10 text-white">
          <p className="text-2xl font-bold drop-shadow-lg">
            {formattedDate.split(",")[1]?.trim() || "Data"}
          </p>
          <p className="text-xs font-semibold opacity-90">
            {formattedDate.split(",")[0]?.trim()}
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 p-6 flex flex-col">
        {/* Title & Location */}
        <div className="mb-4">
          <a
            href={race.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-xl font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors line-clamp-2 mb-3"
          >
            {race.title}
          </a>

          <div className="flex items-center gap-2 text-[var(--text-secondary)] text-sm">
            <MapPin size={16} className="flex-shrink-0" />
            <span>{race.location}</span>
            <span className="text-xs font-semibold px-2 py-1 rounded bg-[var(--surface-2)]">
              {race.state}
            </span>
          </div>
        </div>

        {/* Distances */}
        <div className="mb-4 flex flex-wrap gap-2">
          {race.distances.map((d: string) => (
            <div
              key={d}
              className="px-3 py-1 rounded-full text-xs font-bold bg-[var(--surface-2)] text-[var(--accent)] border border-[var(--border)]"
            >
              {d}
            </div>
          ))}
        </div>

        {/* CTA Button */}
        {race.url && (
          <a
            href={race.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`
              mt-auto px-4 py-3 rounded-full text-white font-semibold
              bg-gradient-to-r from-[var(--accent)] to-[var(--smart-blue)]
              hover:shadow-lg hover:scale-105 transition-all duration-300
              text-center group-hover:gap-2 inline-flex items-center justify-center
            `}
          >
            Ver Detalhes →
          </a>
        )}
      </div>
    </div>
  );
}