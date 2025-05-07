"use client";

import { RestaurantCardSkeleton } from "./RestaurantCardSkeleton";

export function RestaurantListSkeleton() {
  return (
    <main className="flex-grow container mx-auto px-4 py-6 max-w-[1000px]">
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-purple-text mb-4">Abertos</h2>
        <RestaurantCardSkeleton count={4} />
      </section>

      <section>
        <h2 className="text-2xl font-bold text-purple-text mb-4">Fechados</h2>
        <RestaurantCardSkeleton count={3} />
      </section>
    </main>
  );
}
