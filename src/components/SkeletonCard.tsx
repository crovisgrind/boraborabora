// components/SkeletonCard.tsx

export function SkeletonCard() {
  return (
    <div className="card-neo">
      {/* Image Skeleton */}
      <div className="h-56 bg-gray-300 animate-pulse neo-border-thick border-l-0 border-r-0 border-t-0" />

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Title Skeleton */}
        <div className="h-6 bg-gray-300 animate-pulse neo-border w-3/4" />

        {/* Location Skeleton */}
        <div className="h-4 bg-gray-300 animate-pulse neo-border w-full" />

        {/* Text Skeleton */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 animate-pulse neo-border w-full" />
          <div className="h-4 bg-gray-300 animate-pulse neo-border w-2/3" />
        </div>

        {/* Badges Skeleton */}
        <div className="flex gap-2 pt-4">
          <div className="h-8 w-16 bg-gray-300 animate-pulse neo-border" />
          <div className="h-8 w-16 bg-gray-300 animate-pulse neo-border" />
        </div>

        {/* Button Skeleton */}
        <div className="h-10 bg-gray-400 animate-pulse neo-border-thick mt-4" />
      </div>
    </div>
  );
}