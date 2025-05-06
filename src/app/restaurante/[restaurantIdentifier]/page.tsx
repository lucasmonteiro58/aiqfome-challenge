import { notFound } from "next/navigation";
import { restaurants } from "@/data/restaurants";
import { Footer } from "@/components/Footer";
import { RestaurantHeader } from "@/components/restaurant/RestaurantHeader";
import { RestaurantMetaInfo } from "@/components/restaurant/RestaurantMetaInfo";
import { RestaurantCategoryList } from "@/components/restaurant/RestaurantCategoryList";
import { Metadata } from "next";

type RestaurantPageProps = {
  params: { restaurantIdentifier: string };
};

export async function generateMetadata({
  params,
}: RestaurantPageProps): Promise<Metadata> {
  const restaurant = restaurants.find(
    (r) => r.identifier === params.restaurantIdentifier
  );
  return {
    title: restaurant?.name ?? "Restaurante",
  };
}

export default function RestaurantPage({ params }: RestaurantPageProps) {
  const restaurant = restaurants.find(
    (r) => r.identifier === params.restaurantIdentifier
  );

  if (!restaurant) return notFound();

  return (
    <div className="min-h-screen flex flex-col mt-2">
      <div className="flex-grow">
        <div className="p-4 space-y-3">
          <RestaurantHeader name={restaurant.name} logo={restaurant.logo} />

          <RestaurantMetaInfo
            deliveryFee={restaurant.deliveryFee}
            deliveryEstimate={restaurant.deliveryEstimate}
            distanceKm={restaurant.distanceKm}
            freeDeliveryThreshold={restaurant.freeDeliveryThreshold}
            rating={restaurant.rating}
            minOrder={restaurant.minOrder}
          />

          <RestaurantCategoryList
            categories={restaurant.categories}
            restaurantIdentifier={restaurant.identifier}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
