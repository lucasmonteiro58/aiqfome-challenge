import { deliveryType } from "@/types/restaurant";
import { formatCurrency } from "@/lib/utils";
import Image from "next/image";

interface DeliveryTypeProps {
  type: deliveryType;
  deliveryFee: number;
}

export function DeliveryType({ type, deliveryFee }: DeliveryTypeProps) {
  const getColor = (type: deliveryType) => {
    if (type === "aiqentrega-teal") {
      return "text-teal-text";
    } else return "text-purple-brand";
  };

  return (
    <span className={`flex items-center gap-1 font-bold ${getColor(type)}`}>
      <Image
        src={`/images/icons/${type}.svg`}
        alt="icon"
        className="w-6 h-6"
        width={24}
        height={24}
      />
      {formatCurrency(deliveryFee)}
    </span>
  );
}
