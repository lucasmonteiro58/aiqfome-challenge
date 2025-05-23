import restaurantsJson from "../../../public/data/restaurants.json";
import { RestaurantCard } from "@/components/RestaurantCard";
import { Restaurant } from "@/types/restaurant";

export default async function RestaurantList() {
  const restaurants = restaurantsJson as Restaurant[];
  const openedRestaurants = restaurants.filter((r) => r.isOpen);
  const closedRestaurants = restaurants.filter((r) => !r.isOpen);

  return (
    <main className="flex-grow container mx-auto px-4 py-6 max-w-[1000px]">
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-purple-text mb-4">Abertos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {openedRestaurants.map((r) => (
            <RestaurantCard key={r.id} {...r} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-purple-text mb-4">Fechados</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {closedRestaurants.map((r) => (
            <RestaurantCard key={r.id} {...r} />
          ))}
        </div>
      </section>
    </main>
  );
}
