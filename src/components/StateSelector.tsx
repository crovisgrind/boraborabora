// components/StateSelector.tsx

"use client";

import React from 'react';

interface StateSelectorProps {
  selectedState: string | null;
  onStateChange: (state: string | null) => void;
}

// Lista de UFs Brasileiras
const brazilianStates = [
  { label: "Todos os Estados", value: null },
  { label: "São Paulo (SP)", value: "SP" },
  { label: "Rio de Janeiro (RJ)", value: "RJ" },
  { label: "Minas Gerais (MG)", value: "MG" },
  { label: "Paraná (PR)", value: "PR" },
  { label: "Santa Catarina (SC)", value: "SC" },
  { label: "Rio Grande do Sul (RS)", value: "RS" },
  // 🚨 Adicione aqui os demais estados que você espera no seu crawler
];

export function StateSelector({ selectedState, onStateChange }: StateSelectorProps) {
  
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value === "" ? null : e.target.value;
    onStateChange(value);
  };

  return (
    <div className="mb-8">
      <label htmlFor="state-select" className="block text-sm font-medium text-(--text-secondary) mb-2">
        Filtrar por Estado
      </label>
      <select
        id="state-select"
        value={selectedState || ""}
        onChange={handleSelect}
        className="w-full md:w-1/3 p-2 border border-(--surface-2) rounded-lg bg-(--surface-1) text-(--text-primary) shadow-sm focus:border-(--accent) focus:ring focus:ring-(--accent) focus:ring-opacity-50"
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