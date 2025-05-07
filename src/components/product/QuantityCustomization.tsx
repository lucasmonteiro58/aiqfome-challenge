"use client";

import { useState } from "react";
import { Customization, CustomizationOption } from "@/types/restaurant";
import { formatCurrency } from "@/lib/utils";
import { QuantitySelector } from "../QuantitySelector";
import { useCartStore } from "@/stores/cart.store";

interface CustomizationProps {
  customization: Customization;
}

export function QuantityCustomization({ customization }: CustomizationProps) {
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const { items } = useCartStore();

  function updateQuantity(optionId: string, newQuantity: number) {
    setQuantities((prev) => {
      const updated = { ...prev, [optionId]: newQuantity };

      const lastItemIndex = items.length - 1;
      if (lastItemIndex < 0) return prev;

      const selected: CustomizationOption[] = customization.options
        .filter((opt) => updated[opt.id] > 0)
        .flatMap(
          (opt) => Array(updated[opt.id]).fill(opt) // repete o item pela quantidade
        );

      const updatedItem = { ...items[lastItemIndex] };
      updatedItem.selectedCustomizations = {
        ...updatedItem.selectedCustomizations,
        [customization.id]: selected,
      };

      useCartStore.setState((state) => {
        const newItems = [...state.items];
        newItems[lastItemIndex] = updatedItem;
        return { items: newItems };
      });

      return updated;
    });
  }

  return (
    <div className="pl-4 mt-4 pr-8 border-b-4 border-container-95 pb-4">
      {customization.options.map((opt) => (
        <div
          key={opt.id}
          className="flex justify-between items-center py-2 my-1"
        >
          <QuantitySelector
            size="sm"
            initialValue={quantities[opt.id] || 0}
            handleAdd={() =>
              updateQuantity(opt.id, (quantities[opt.id] || 0) + 1)
            }
            handleDecrease={() =>
              updateQuantity(opt.id, Math.max((quantities[opt.id] || 0) - 1, 0))
            }
            handleRemove={() => updateQuantity(opt.id, 0)}
            hasTrash
          />
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
