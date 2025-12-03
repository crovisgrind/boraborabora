
// ========================================
// 1. SKELETON LOADER - Componente Base
// ========================================

// components/Skeleton.tsx
"use client";

import React from "react";

interface SkeletonProps {
  className?: string;
  animated?: boolean;
}

export function Skeleton({ className = "h-12 w-12 rounded-md", animated = true }: SkeletonProps) {
  return (
    <div
      className={`
        bg-[var(--surface-2)] 
        ${animated ? "animate-shimmer" : ""} 
        ${className}
      `}
    />
  );
}