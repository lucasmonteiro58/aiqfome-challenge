import { Footer } from "@/components/Footer";
import { RestaurantCard } from "@/components/RestaurantCard";
import { SearchInput } from "@/components/SearchInput";
import { restaurants } from "@/data/restaurants";
import { Restaurant } from "@/types/restaurant";
import Image from "next/image";

export default function Home() {
  const openedRestaurants = restaurants.filter((r) => r.isOpen);
  const closedRestaurants = restaurants.filter((r) => !r.isOpen);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-white shadow-sm">
        <SearchInput />
      </div>
      <div className="container mx-auto mt-2 px-4">
        <Image
          src="/images/banner.png"
          alt="Banner"
          width={1600}
          height={600}
          className="w-full h-auto rounded-lg"
        />
      </div>
      <main className="flex-grow container mx-auto px-4 py-6">
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-purple-text mb-4">Abertos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {(openedRestaurants as Restaurant[]).map((r) => (
              <RestaurantCard key={r.id} {...r} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-purple-text mb-4">Fechados</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {closedRestaurants.map((r) => (
              <RestaurantCard key={r.id} {...r} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
