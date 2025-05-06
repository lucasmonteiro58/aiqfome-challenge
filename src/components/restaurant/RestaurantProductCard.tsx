"use client";

import Link from "next/link";
import { CircleDollarSign } from "lucide-react";
import { Product } from "@/types/restaurant";
import { formatCurrency } from "@/lib/utils";

interface RestaurantProductCardProps {
  product: Product;
  restaurantIdentifier: string;
}

export function RestaurantProductCard({
  product,
  restaurantIdentifier,
}: RestaurantProductCardProps) {
  return (
    <Link
      href={`/restaurante/${restaurantIdentifier}/${product.id}`}
      className="flex bg-white rounded-lg pl-4 items-center gap-6 justify-between hover:bg-gray-50 transition-colors"
    >
      <div className="flex flex-col flex-1">
        <h1 className="font-semibold text-dark-text text-sm">{product.name}</h1>
        <p className="text-light-text text-xs mt-1">{product.description}</p>
      </div>

      <div className="w-24 flex items-end flex-col">
        {product.multiplePrices && (
          <span className="text-xs text-light-text font-bold">a partir de</span>
        )}
        {product.hasPromotions && product.basePrice && (
          <span className="text-xs text-light-text font-bold mt-0.5 line-through">
            {formatCurrency(product.basePrice)}
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
            <CircleDollarSign className="text-success text-sm" size={14} />
          )}
          <span>{formatCurrency(product.price)}</span>
        </span>
      </div>
    </Link>
  );
}
