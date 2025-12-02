"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Race } from "@/types/races";

export function RaceCard({ race }: { race: Race }) {
  // Format date in Portuguese (e.g., "Sábado, 9 de Dezembro de 2025")
  const formatDate = (isoDate: string) => {
    try {
      // Alteração: "en-US" -> "pt-BR"
      return new Date(isoDate).toLocaleDateString("pt-BR", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return "Data não disponível";
    }
  };

  return (
    <Card className="rounded-3xl shadow-sm border border-(--surface-2) bg-(--surface-1) hover:shadow-md transition-all">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-(--text-primary) line-clamp-2">
              {race.title}
            </h3>
            <p className="text-sm text-(--text-secondary) mt-1 line-clamp-1">
              📍 {race.location}
            </p>
          </div>
          <Badge
            className={`whitespace-nowrap ${
              race.type === "trail"
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
            }`}
          >
            {/* Tradução: Trail -> Trilha; Road -> Asfalto */}
            {race.type === "trail" ? "⛰️ Trilha" : "🏃 Asfalto"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Data */}
        <div className="flex items-center gap-2 text-sm">
          <span className="text-lg">📅</span>
          <time className="text-(--text-primary) font-medium">
            {formatDate(race.date)}
          </time>
        </div>

        {/* Distâncias */}
        <div className="flex flex-wrap gap-2">
          {race.distances
            .filter((d): d is string => typeof d === "string" && d.length > 0)
            .map((distance) => (
              <Badge
                key={distance}
                className="bg-(--surface-2) text-(--text-primary)"
              >
                🏁 {distance}
              </Badge>
            ))}
        </div>

        {/* Link to race */}
        {race.url && (
          <a
            href={race.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 text-sm font-medium text-(--accent) hover:underline"
          >
            Ver detalhes →
          </a>
        )}
      </CardContent>
    </Card>
  );
}