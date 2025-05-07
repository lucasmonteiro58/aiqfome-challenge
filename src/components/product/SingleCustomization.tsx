import { Customization, Product } from "@/types/restaurant";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CircleDollarSign } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface CustomizationProps {
  customization: Customization;
  product?: Product;
}

export function SingleCustomization({ customization }: CustomizationProps) {
  return (
    <div className="pl-4 mt-4 pr-8 border-b-4 border-container-95 pb-4">
      <RadioGroup defaultValue="option-one">
        {customization.options.map((opt) => (
          <div className="flex items-center space-x-2" key={opt.id}>
            <RadioGroupItem value={opt.id} id={opt.id} />
            <Label
              htmlFor={opt.id}
              className="flex justify-between gap-3 py-1 w-full"
            >
              <div className="text-light-text text-sm flex items-center gap-1">
                {opt.hasPromotions && (
                  <CircleDollarSign
                    className="text-success text-sm font-bold"
                    strokeWidth={1.5}
                    size={18}
                  />
                )}
                <span>{opt.label}</span>
              </div>
              <div className="text-purple-brand font-bold text-sm">
                {opt.hasPromotions && opt.basePrice && (
                  <span className="text-xs text-light-text font-bold mt-0.5 ">
                    de {formatCurrency(opt.basePrice)} por{" "}
                  </span>
                )}
                <span className={opt.hasPromotions ? "text-success" : ""}>
                  {formatCurrency(opt.price)}
                </span>
              </div>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
