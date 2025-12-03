// ========================================
// 2. SKELETON CARD - Para Loading States
// ========================================

// components/SkeletonCard.tsx
import { Skeleton } from "@/components/Skeleton";

export function SkeletonCard() {
  return (
    <div className="rounded-2xl overflow-hidden bg-[var(--surface-1)] border border-[var(--border)] shadow-md p-4">
      {/* Image Skeleton */}
      <Skeleton className="w-full h-48 rounded-xl mb-4" />
      
      {/* Content Skeleton */}
      <div className="space-y-3">
        <Skeleton className="h-6 w-3/4 rounded-lg" />
        <Skeleton className="h-4 w-full rounded-lg" />
        <Skeleton className="h-4 w-2/3 rounded-lg" />
        
        {/* Badges Skeleton */}
        <div className="flex gap-2 pt-2">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
      </div>
    </div>
  );
}
