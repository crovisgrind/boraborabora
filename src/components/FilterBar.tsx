// ========================================
// 6. FILTER BAR PREMIUM COM ANIMATIONS
// ========================================

// components/FilterBar.tsx
import React, { Dispatch, SetStateAction } from "react";

export interface FilterBarProps {
  activeFilter: string | null;
  onFilterChangeAction: Dispatch<SetStateAction<string | null>>;
}

export function FilterBar({ activeFilter, onFilterChangeAction }: FilterBarProps) {
  const distances = ["5K", "10K", "21.1K", "42.2K", "ULTRA"];

  const handleFilterClick = (distance: string | null) => {
    if (distance === activeFilter) {
      onFilterChangeAction(null);
    } else {
      onFilterChangeAction(distance);
    }
  };

  return (
    <div className="flex flex-wrap justify-center gap-3">
      {/* Todas as Distâncias */}
      <button
        onClick={() => handleFilterClick(null)}
        className={`
          px-6 py-3 rounded-full text-sm font-semibold
          transition-all duration-300 smooth-transition hover-lift
          ${activeFilter === null
            ? "bg-gradient-to-r from-[var(--accent)] to-[var(--smart-blue)] text-white shadow-lg scale-105"
            : "bg-[var(--surface-2)] text-[var(--text-primary)] hover:bg-[var(--surface-3)] hover:shadow-md"
          }
        `}
      >
        Todas
      </button>

      {/* Distâncias Específicas */}
      {distances.map((d, idx) => (
        <button
          key={d}
          onClick={() => handleFilterClick(d)}
          className={`
            px-6 py-3 rounded-full text-sm font-semibold
            transition-all duration-300 smooth-transition hover-lift
            ${activeFilter === d
              ? "bg-gradient-to-r from-[var(--accent)] to-[var(--smart-blue)] text-white shadow-lg scale-105"
              : "bg-[var(--surface-2)] text-[var(--text-primary)] hover:bg-[var(--surface-3)] hover:shadow-md"
            }
          `}
          style={{ transitionDelay: `${idx * 50}ms` }}
        >
          {d}
        </button>
      ))}
    </div>
  );
}