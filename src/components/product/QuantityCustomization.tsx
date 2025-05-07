import { Customization, Product } from "@/types/restaurant";
import { formatCurrency } from "@/lib/utils";
import { QuantitySelector } from "../QuantitySelector";

interface CustomizationProps {
  customization: Customization;
  product?: Product;
}

export function QuantityCustomization({ customization }: CustomizationProps) {
  return (
    <div className="pl-4 mt-4 pr-8 border-b-4 border-container-95 pb-4">
      {customization.options.map((opt) => (
        <div
          key={opt.id}
          className="flex justify-between items-center py-2 my-1"
        >
          <QuantitySelector size="sm" />
          <span className="flex-1 pl-4 text-light-text text-sm font-semibold">
            {opt.label}
          </span>
          <span className="text-purple-brand font-bold">
            +{formatCurrency(opt.price)}
          </span>
        </div>
      ))}
    </div>
  );
}
