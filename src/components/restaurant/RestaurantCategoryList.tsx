import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { RestaurantProductCard } from "./RestaurantProductCard";
import { CircleDollarSign } from "lucide-react";

import { Restaurant } from "@/types/restaurant";

interface RestaurantCategoryListProps {
  categories: Restaurant["categories"];
  restaurantIdentifier: string;
}

export function RestaurantCategoryList({
  categories,
  restaurantIdentifier,
}: RestaurantCategoryListProps) {
  return (
    <Accordion type="multiple" className="mt-4">
      {categories.map((category) => (
        <AccordionItem
          key={category.name}
          value={category.name}
          className="px-4"
        >
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
                <RestaurantProductCard
                  key={product.id}
                  product={product}
                  restaurantIdentifier={restaurantIdentifier}
                />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
