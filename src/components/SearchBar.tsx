// ========================================
// 5. SEARCH BAR PREMIUM
// ========================================

// components/SearchBar.tsx
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface Props {
  onTextSearchChange: (v: string) => void;
}

export function SearchBar({ onTextSearchChange }: Props) {
  const [textSearch, setTextSearch] = useState("");
  const [focused, setFocused] = useState(false);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTextSearch(value);
    onTextSearchChange(value);
  };

  return (
    <div className="w-full">
      <div className={`
        relative flex items-center gap-3 px-5 py-3 rounded-full
        bg-[var(--surface-1)] border-2 transition-all duration-300
        ${focused 
          ? "border-[var(--accent)] shadow-lg ring-2 ring-[var(--accent)]/20" 
          : "border-[var(--border)] shadow-md"
        }
      `}>
        <Search className={`transition-colors duration-300 ${focused ? "text-[var(--accent)]" : "text-[var(--text-secondary)]"}`} size={20} />
        
        <input
          type="text"
          value={textSearch}
          onChange={handleTextChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Buscar por nome ou localização..."
          className="flex-1 bg-transparent outline-none text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)]"
        />
        
        {textSearch && (
          <button
            onClick={() => {
              setTextSearch("");
              onTextSearchChange("");
            }}
            className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
            aria-label="Limpar busca"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}