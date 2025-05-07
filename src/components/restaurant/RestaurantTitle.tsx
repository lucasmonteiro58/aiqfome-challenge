import Image from "next/image";
import type { Product } from "@/types/restaurant";

const substanceIcons: Record<string, string> = {
  vegan: "/images/icons/vegan.svg",
  spicy: "/images/icons/spicy.svg",
  "gluten-free": "/images/icons/gluten-free.svg",
  candy: "/images/icons/candy.svg",
  alcohol: "/images/icons/alcohol.svg",
};

export function RestaurantTitle({ product }: { product: Product }) {
  return (
    <div className="flex items-center gap-2">
      <h1 className="font-semibold text-dark-text text-sm">{product.name}</h1>
      <div className="flex gap-1">
        {(product.substances || []).slice(0, 2).map((substance) => (
          <Image
            key={substance}
            src={substanceIcons[substance]}
            alt={substance}
            width={20}
            height={20}
            title={substance}
          />
        ))}
      </div>
    </div>
  );
}
