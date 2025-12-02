"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface FilterBarProps {
  activeFilter: string | null;
  onFilterChangeAction: (value: string | null) => void;
}

export function FilterBar({
  activeFilter,
  onFilterChangeAction,
}: FilterBarProps) {
  // Distances in Kilometers (adapted for Brazilian standard races)
  const filters = [
    { label: "Todas", value: null }, // "All" -> "Todas"
    { label: "5K", value: "5K" }, // Corresponds to 3.1 Miles
    { label: "10K", value: "10K" }, // Corresponds to approx 6.2 Miles
    { label: "21.1K", value: "21.1K" }, // Meia Maratona (Half Marathon)
    { label: "42.2K", value: "42.2K" }, // Maratona (Marathon)
    { label: "Ultra", value: "ULTRA" }, // Novo filtro para ultras
  ];

  return (
    <div className="flex gap-3 flex-wrap mb-6">
      {filters.map((f) => {
        const isActive = activeFilter === f.value;

        return (
          <button
            key={f.label}
            onClick={() => onFilterChangeAction(f.value)}
            className={cn(
              `
              px-4 py-2 rounded-full text-sm font-medium transition-all
              active:scale-95 border duration-200
            `,
              isActive
                ? "bg-(--accent) text-(--accent-foreground) border-(--accent)"
                : "bg-(--surface-1) text-(--text-secondary) border-(--border) hover:bg-(--surface-2)"
            )}
          >
            {f.label}
          </button>
        );
      })}
    </div>
  );
}