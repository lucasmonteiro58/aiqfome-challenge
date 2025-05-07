"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Restaurant } from "@/types/restaurant";
import { DeliveryType } from "./DeliveryType";
import { Star } from "lucide-react";

export function RestaurantCard(props: Restaurant) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`restaurante/${props.identifier}`)}
      className="flex items-center gap-3  bg-container-97 hover:bg-container-95 transition cursor-pointer rounded-xl"
    >
      <Image
        src={props.logo}
        alt={props.name}
        width={72}
        height={72}
        className="rounded-l-md object-cover"
      />

      <div className="flex flex-col justify-center">
        <span className="font-medium text-sm text-text-medium">
          {props.name}
        </span>
        <div className="flex items-center gap-2 text-sm mt-0.5">
          <DeliveryType
            type={props.deliveryType}
            deliveryFee={props.deliveryFee}
          />
          <span className="flex items-center gap-1 text-warning">
            <Star size={20} fill="currentColor" strokeWidth={0} />
            <span className="text-light-text font-bold">
              {props.rating.toFixed(1)}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
