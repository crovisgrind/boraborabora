// components/RaceCard.tsx
"use client";

import type { Race } from "@/types/races";

interface RaceWithImage extends Race {
  imageUrl?: string;
}

export function RaceCard({ race }: { race: RaceWithImage }) {
  const formatDate = (isoDate: string) => {
    try {
      const localDateString = isoDate + "T00:00:00";
      return new Date(localDateString).toLocaleDateString("pt-BR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
    } catch {
      return "Data N/A";
    }
  };

  const formattedDate = formatDate(race.date);
  const backgroundImage =
    race.imageUrl ||
    "https://images.unsplash.com/photo-1549216172-e56c5a2c42c9?q=80&w=2000&auto=format&fit=crop";

  const colors = ["bg-orange", "bg-cyan", "bg-yellow", "bg-purple", "bg-green"];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  return (
    <div className={`card-neo overflow-hidden neo-lift`}>
      {/* Image Section */}
      <div
        className="h-56 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black/40" />

        {/* Badge */}
        <div className="absolute top-4 right-4">
          <span className={`${randomColor} text-black font-black px-4 py-2 neo-border text-sm`}>
            {race.type === "trail" ? "⛰️ TRAIL" : "🏃 ASFALTO"}
          </span>
        </div>

        {/* Date */}
        <div className="absolute bottom-4 left-4 bg-white neo-border-thick px-4 py-2">
          <p className="font-black text-lg">{formattedDate}</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <a
          href={race.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block font-black text-xl mb-3 hover:text-orange transition-colors line-clamp-2"
        >
          {race.title}
        </a>

        {/* Location */}
        <div className="flex items-center gap-2 mb-4 font-bold">
          <span>📍 {race.location}</span>
          <span className="bg-yellow text-black font-black px-2 py-1 neo-border text-xs">
            {race.state}
          </span>
        </div>

        {/* Distances */}
        <div className="flex gap-2 flex-wrap mb-6">
          {race.distances.map((d: string) => (
            <span
              key={d}
              className="bg-cyan text-black font-black px-3 py-1 neo-border text-xs"
            >
              {d}
            </span>
          ))}
        </div>

        {/* CTA Button */}
        {race.url && (
          <a
            href={race.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-neo block w-full text-center bg-orange text-white font-black neo-shadow neo-shadow-hover"
          >
            VER DETALHES →
          </a>
        )}
      </div>
    </div>
  );
}