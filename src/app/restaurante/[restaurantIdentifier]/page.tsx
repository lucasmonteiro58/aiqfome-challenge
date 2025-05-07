import { notFound } from "next/navigation";
import { restaurants } from "@/data/restaurants";
import { Footer } from "@/components/Footer";
import { RestaurantHeader } from "@/components/restaurant/RestaurantHeader";
import { RestaurantMetaInfo } from "@/components/restaurant/RestaurantMetaInfo";
import { RestaurantCategoryList } from "@/components/restaurant/RestaurantCategoryList";
import { Metadata } from "next";

type RestaurantPageProps = Promise<{
  restaurantIdentifier: string;
  productId: string;
}>;

export async function generateMetadata({
  params,
}: {
  params: RestaurantPageProps;
}): Promise<Metadata> {
  const { restaurantIdentifier } = await params;
  const restaurant = restaurants.find(
    (r) => r.identifier === restaurantIdentifier
  );
  return {
    title: restaurant?.name ?? "Restaurante",
  };
}

export default async function RestaurantPage({
  params,
}: {
  params: RestaurantPageProps;
}) {
  const { restaurantIdentifier } = await params;
  const restaurant = restaurants.find(
    (r) => r.identifier === restaurantIdentifier
  );

  if (!restaurant) return notFound();

  return (
    <div className="min-h-screen flex flex-col mt-2">
      <div className="flex-grow">
        <div className="py-4 space-y-3">
          <RestaurantHeader
            id={restaurant.id}
            name={restaurant.name}
            logo={restaurant.logo}
          />

          <RestaurantMetaInfo
            deliveryFee={restaurant.deliveryFee}
            deliveryEstimate={restaurant.deliveryEstimate}
            distanceKm={restaurant.distanceKm}
            freeDeliveryThreshold={restaurant.freeDeliveryThreshold}
            rating={restaurant.rating}
            minOrder={restaurant.minOrder}
            deliveryType={restaurant.deliveryType}
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
