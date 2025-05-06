import { RestaurantCard } from "@/components/RestaurantCard"
import restaurants from "@/data/restaurants.json"
import { Restaurant } from "@/types/restaurant"

export default function Home() {
  return (
    <main className="p-4 space-y-2">
      <h1 className="text-xl font-bold mb-2">abertos</h1>
      <div className="space-y-2">
        {(restaurants as Restaurant[]).map((r) => (
          <RestaurantCard key={r.id} {...r} />
        ))}
      </div>
    </main>
  )
}
