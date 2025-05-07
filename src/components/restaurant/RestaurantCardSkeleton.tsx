"use client";

export function RestaurantCardSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 ">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-3 bg-container-97 rounded-xl animate-pulse"
        >
          <div className="w-[72px] h-[72px] bg-container-95 rounded-l-md" />

          <div className="flex flex-col justify-center flex-1 space-y-2 py-3">
            <div className="h-4 bg-container-95 w-2/3 rounded" />
            <div className="flex gap-3 items-center">
              <div className="h-3 w-20 bg-container-95 rounded" />
              <div className="h-3 w-12 bg-container-95 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
