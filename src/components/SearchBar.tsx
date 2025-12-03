// components/SearchBar.tsx
"use client";

import { useState } from "react";
import { Search } from "lucide-react";

interface Props {
  onTextSearchChange: (v: string) => void;
}

export function SearchBar({ onTextSearchChange }: Props) {
  const [textSearch, setTextSearch] = useState("");

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTextSearch(value);
    onTextSearchChange(value);
  };

  return (
    <div className="w-full">
      <div className="relative flex items-center gap-3 px-6 py-4 bg-white neo-border-thick neo-shadow-lg">
        <Search size={24} className="text-orange font-black" />

        <input
          type="text"
          value={textSearch}
          onChange={handleTextChange}
          placeholder="Buscar por corrida ou cidade..."
          className="flex-1 outline-none font-bold text-lg placeholder:text-gray-400"
        />

        {textSearch && (
          <button
            onClick={() => {
              setTextSearch("");
              onTextSearchChange("");
            }}
            className="text-orange font-black text-xl hover:text-cyan transition-colors"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}