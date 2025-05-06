import { notFound } from "next/navigation";
import { restaurants } from "@/data/restaurants";
import { Restaurant } from "@/types/restaurant";
import Image from "next/image";
import { Footer } from "@/components/Footer";
import {
  Share2,
  Heart,
  ChevronRight,
  Bike,
  Star,
  CircleDollarSign,
} from "lucide-react";
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

export default async function RestaurantPage({ params }: Props) {
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

          <Accordion type="multiple" className="mt-4">
            {restaurant.categories?.map((category) => (
              <AccordionItem key={category.name} value={category.name}>
                <AccordionTrigger>
                  <div>
                    <h1 className="font-bold text-dark-text text-base flex items-center">
                      <span>{category.name}</span>
                      {category.hasPromotions && (
                        <CircleDollarSign
                          className="text-success text-sm font-bold ml-2"
                          size={24}
                        />
                      )}
                    </h1>
                    {category.description && (
                      <div className="text-light-text text-xs mt-1">
                        {category.description}
                      </div>
                    )}
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-4 mt-2">
                    {category.products.map((product) => (
                      <div
                        key={product.name}
                        className="flex bg-white rounded-lg pl-4 items-center gap-6 justify-between"
                      >
                        <div className="flex flex-col flex-1">
                          <h1 className="font-semibold text-dark-text text-sm">
                            {product.name}
                          </h1>
                          <p className="text-light-text text-xs mt-1">
                            {product.description}
                          </p>
                        </div>
                        <div className="w-24 flex items-end flex-col">
                          {product.multiplePrices && (
                            <span className="text-xs text-light-text font-bold">
                              a partir de
                            </span>
                          )}
                          {product.hasPromotions && (
                            <span className="text-xs text-light-text font-bold mt-0.5 line-through">
                              R${" "}
                              {product.basePrice?.toFixed(2).replace(".", ",")}
                            </span>
                          )}
                          <span
                            className={`flex font-bold text-sm gap-1 items-center ${
                              product.hasPromotions
                                ? "mt-0.5 text-success"
                                : "mt-1 text-purple-brand"
                            }`}
                          >
                            {product.hasPromotions && (
                              <CircleDollarSign
                                className="text-success text-sm"
                                size={14}
                              />
                            )}
                            <span>
                              R$ {product.price?.toFixed(2).replace(".", ",")}
                            </span>
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
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
