import { Restaurant } from "@/types/restaurant";
import Image from "next/image";

interface CartHeaderProps {
  restaurant: Restaurant | null;
}
export function CartHeader({ restaurant }: CartHeaderProps) {
  return (
    <div>
      {restaurant && (
        <div className="flex items-center gap-2 p-4 ">
          <Image
            src={restaurant.logo}
            width={32}
            height={32}
            alt={restaurant.name}
            className="rounded"
          ></Image>
          <div className="text-sm text-light-text font-bold">
            seus itens em <br />
            <span className="text-lg  text-dark-text">{restaurant.name}</span>
          </div>
        </div>
      )}
    </div>
  );
}
