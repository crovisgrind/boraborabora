// components/StateSelector.tsx

"use client";

import React from "react";

interface StateSelectorProps {
  selectedState: string | null;
  onStateChange: (state: string | null) => void;
}

const brazilianStates = [
  { label: "📍 TODOS OS ESTADOS", value: null },
  { label: "🏙️ SÃO PAULO (SP)", value: "SP" },
  { label: "🏖️ RIO DE JANEIRO (RJ)", value: "RJ" },
  { label: "⛰️ MINAS GERAIS (MG)", value: "MG" },
  { label: "🌳 PARANÁ (PR)", value: "PR" },
  { label: "❄️ SANTA CATARINA (SC)", value: "SC" },
  { label: "🏔️ RIO GRANDE DO SUL (RS)", value: "RS" },
];

export function StateSelector({ selectedState, onStateChange }: StateSelectorProps) {
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value === "" ? null : e.target.value;
    onStateChange(value);
  };

  return (
    <div>
      <label htmlFor="state-select" className="block font-black text-lg mb-3">
        🗺️ FILTRAR POR ESTADO
      </label>
      <select
        id="state-select"
        value={selectedState || ""}
        onChange={handleSelect}
        className="input-neo w-full md:w-64 font-bold text-lg bg-white"
      >
        {brazilianStates.map((state) => (
          <option key={state.label} value={state.value || ""}>
            {state.label}
          </option>
        ))}
      </select>
    </div>
  );
}