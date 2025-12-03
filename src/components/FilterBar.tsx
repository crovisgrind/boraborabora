// components/FilterBar.tsx
import React, { Dispatch, SetStateAction } from "react";

export interface FilterBarProps {
  activeFilter: string | null;
  onFilterChangeAction: Dispatch<SetStateAction<string | null>>;
}

export function FilterBar({ activeFilter, onFilterChangeAction }: FilterBarProps) {
  const distances = ["5K", "10K", "21.1K", "42.2K", "ULTRA"];

  const colors = ["bg-orange", "bg-cyan", "bg-yellow", "bg-purple", "bg-green"];

  const handleFilterClick = (distance: string | null) => {
    if (distance === activeFilter) {
      onFilterChangeAction(null);
    } else {
      onFilterChangeAction(distance);
    }
  };

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {/* Todas */}
      <button
        onClick={() => handleFilterClick(null)}
        className={`btn-neo font-black neo-shadow-hover ${
          activeFilter === null
            ? "bg-black text-white neo-shadow-lg scale-110"
            : "bg-white text-black hover:bg-gray-100"
        }`}
      >
        TODAS
      </button>

      {/* Distâncias */}
      {distances.map((d, idx) => (
        <button
          key={d}
          onClick={() => handleFilterClick(d)}
          className={`btn-neo font-black neo-shadow-hover ${
            activeFilter === d
              ? `${colors[idx]} text-black neo-shadow-lg scale-110`
              : "bg-white text-black hover:bg-gray-100"
          }`}
        >
          {d}
        </button>
      ))}
    </div>
  );
}