import { Footer } from "@/components/Footer";
import { RestaurantCard } from "@/components/RestaurantCard";
import { SearchInput } from "@/components/SearchInput";
import { restaurants } from "@/data/restaurants";
import { Restaurant } from "@/types/restaurant";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-60px)] flex flex-col">
      <div className="flex-grow">
        <SearchInput />
        <Image
          src="/images/banner.png"
          alt="Banner"
          width={1200}
          height={300}
          className="w-full h-auto mt-[1px]"
        />
        <div className="p-4 space-y-2">
          <h1 className="text-xl font-bold mb-2 text-purple-text">abertos</h1>
          <div className="space-y-3">
            {(restaurants as Restaurant[]).map((r) => (
              <RestaurantCard key={r.id} {...r} />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
