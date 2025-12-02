// components/SearchBar.tsx

"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Props {
  onTextSearchChange: (v: string) => void;
}

export function SearchBar({ onTextSearchChange }: Props) {
  const [textSearch, setTextSearch] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTextSearch(value);
    onTextSearchChange(value);
  };

  return (
    <section className="w-full py-10 bg-(--bg)">
      <div className="container mx-auto px-6 max-w-4xl text-center">
        <h2 className="text-3xl font-semibold text-(--text-primary) mb-4">
          Find Your Next Race
        </h2>

        {/* --- Text Search (Title/Description) --- */}
        <Input
          value={textSearch}
          onChange={handleTextChange}
          placeholder="Filter by race name or location"
          className="w-full p-4 text-lg rounded-xl bg-(--surface-1) border-(--surface-2)"
        />
      </div>
    </section>
  );
}