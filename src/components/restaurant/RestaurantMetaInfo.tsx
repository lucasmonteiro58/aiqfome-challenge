import { formatCurrency } from "@/lib/utils";
import { Bike, Star, ChevronRight } from "lucide-react";

interface RestaurantMetaInfoProps {
  deliveryFee: number;
  deliveryEstimate: string;
  distanceKm: number;
  freeDeliveryThreshold: number;
  rating: number;
  minOrder: number;
}

export function RestaurantMetaInfo({
  deliveryFee,
  deliveryEstimate,
  distanceKm,
  freeDeliveryThreshold,
  rating,
  minOrder,
}: RestaurantMetaInfoProps) {
  return (
    <div className="text-sm space-y-1 mt-1 px-4">
      <p className="flex gap-2 items-center">
        <Bike className="text-purple-brand" size={20} strokeWidth={2} />
        <span className="text-purple-brand font-bold">
          {formatCurrency(deliveryFee)}
        </span>
        <ChevronRight className="text-purple-brand" size={14} />
        <span className="text-light-text font-bold text-sm">
          hoje, {deliveryEstimate} • {distanceKm}km
        </span>
      </p>

      <div className="bg-teal-brand/10 text-teal-text text-sm font-bold px-3 py-1.5 rounded w-fit mt-2">
        entrega grátis acima de {formatCurrency(freeDeliveryThreshold)}
      </div>

      <p className="flex gap-2 items-center mt-2">
        <Star
          className="text-warning"
          size={20}
          fill="currentColor"
          strokeWidth={0}
        />
        <span className="text-light-text font-bold text-sm">{rating} de 5</span>
        <ChevronRight className="text-light-text" size={14} />
        <span className="text-gray-icons font-bold text-sm">•</span>
        <span className="text-success font-bold">fecha às 20:00</span>
      </p>

      <div className="text-light-text font-bold text-sm mt-2">
        pedido mínimo: {formatCurrency(minOrder)}
      </div>
    </div>
  );
}
