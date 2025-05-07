"use client";

import { useEffect, useState } from "react";
import { Customization } from "@/types/restaurant";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CircleDollarSign } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { useCartStore } from "@/stores/cart.store";

interface CustomizationProps {
  customization: Customization;
}

export function SingleCustomization({ customization }: CustomizationProps) {
  const [selectedOptionId, setSelectedOptionId] = useState(
    customization.options[0]?.id
  );
  const { items, editingIndex } = useCartStore();

  useEffect(() => {
    const defaultOption =
      customization.options.find((opt) => opt.default) ||
      customization.options[0];

    if (
      editingIndex !== null &&
      items[editingIndex] &&
      (!items[editingIndex].selectedCustomizations?.[customization.title] ||
        items[editingIndex].selectedCustomizations[customization.title]
          .length === 0)
    ) {
      const updatedItem = { ...items[editingIndex] };
      updatedItem.selectedCustomizations = {
        ...updatedItem.selectedCustomizations,
        [customization.title]: [defaultOption],
      };

      useCartStore.setState((state) => {
        const newItems = [...state.items];
        newItems[editingIndex] = updatedItem;
        return { items: newItems };
      });

      setSelectedOptionId(defaultOption.id);
    }
  }, [editingIndex, items, customization.title, customization.options]);

  const handleSelectOption = (optionId: string) => {
    setSelectedOptionId(optionId);

    if (editingIndex === null) return;

    const updatedItem = { ...items[editingIndex] };
    updatedItem.selectedCustomizations = {
      ...updatedItem.selectedCustomizations,
      [customization.title]: customization.options.filter(
        (opt) => opt.id === optionId
      ),
    };

    useCartStore.setState((state) => {
      const newItems = [...state.items];
      newItems[editingIndex] = updatedItem;
      return { items: newItems };
    });
  };

  return (
    <div className="pl-4 mt-4 pr-8 border-b-4 border-container-95 pb-4">
      <RadioGroup value={selectedOptionId} onValueChange={handleSelectOption}>
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
