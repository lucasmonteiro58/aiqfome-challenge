import { notFound } from "next/navigation";
import restaurants from "@/data/restaurants.json";
import { Restaurant } from "@/types/restaurant";
import Image from "next/image";
import { Footer } from "@/components/Footer";
import { Share2, Heart, ChevronRight, Bike, Star } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Metadata } from "next";

type Props = {
  params: { restaurantIdentifier: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const restaurant = (restaurants as Restaurant[]).find(
    (r) => r.identifier === params.restaurantIdentifier
  );
  return {
    title: restaurant?.name ?? "Restaurante",
  };
}

export default function RestaurantPage({ params }: Props) {
  const restaurant = (restaurants as Restaurant[]).find(
    (r) => r.identifier === params.restaurantIdentifier
  );

  if (!restaurant) return notFound();

  return (
    <div className="min-h-screen flex flex-col mt-2">
      <div className="flex-grow">
        <div className="p-4 space-y-3">
          <div className="flex items-center gap-3">
            <Image
              src={restaurant.logo}
              alt={restaurant.name}
              width={36}
              height={26}
              className="rounded"
            />
            <div>
              <h1 className="font-extrabold text-dark-text text-[1.25rem]">
                {restaurant.name}
              </h1>
            </div>
          </div>
          <div className=" text-purple-brand mt-4 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Share2 size={24} className="cursor-pointer" />
              <Heart size={24} className="cursor-pointer" />
            </div>
            <div className="text-teal-brand font-bold flex items-center gap-1">
              <span>mais infos</span>
              <ChevronRight size={14} />
            </div>
          </div>

          <div className="text-sm space-y-1 mt-1">
            <p className="flex gap-2 items-center">
              <Bike className="text-purple-brand" size={20} strokeWidth={2} />
              <span className="text-purple-brand font-bold">
                {restaurant.deliveryFee === 0
                  ? "grátis"
                  : `R$ ${restaurant.deliveryFee.toFixed(2)}`}
              </span>{" "}
              <span className="text-light-text font-bold text-sm">
                {`• hoje, ${restaurant.deliveryEstimate} • ${restaurant.distanceKm} km`}
              </span>
            </p>
            <div className="bg-teal-brand/10 text-teal-text text-sm font-bold px-3 py-1.5 rounded w-fit mt-2">
              entrega grátis acima de R${" "}
              {restaurant.freeDeliveryThreshold.toFixed(2)}
            </div>
            <p className="flex gap-2 items-center mt-2">
              <Star
                className="text-warning"
                size={20}
                fill="currentColor"
                strokeWidth={0}
              />
              <span className="text-light-text font-bold text-sm">
                {restaurant.rating} de 5 •
              </span>
              <span className="text-success font-bold">fecha às 20:00</span>
            </p>
            <div className="text-light-text font-bold text-sm mt-2">
              pedido mínimo: R$ {restaurant.minOrder.toFixed(2)}
            </div>
          </div>

          {/* Categorias */}
          <Accordion type="multiple" className="mt-4">
            {restaurant.categories?.map((category) => (
              <AccordionItem key={category.name} value={category.name}>
                <AccordionTrigger>{category.name}</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground">
                    {category.description}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
      <Footer />
    </div>
  );
}
