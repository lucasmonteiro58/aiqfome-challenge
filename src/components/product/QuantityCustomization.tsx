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

  function updateQuantity(optionId: string, newQuantity: number) {
    const newQuantities = {
      ...quantities,
      [optionId]: newQuantity,
    };

    setQuantities(newQuantities);

    setTimeout(() => {
      const { items } = useCartStore.getState();
      const lastItemIndex = items.length - 1;
      if (lastItemIndex < 0) return;

      const selected: CustomizationOption[] = customization.options
        .filter((opt) => newQuantities[opt.id] > 0)
        .flatMap((opt) => Array(newQuantities[opt.id]).fill(opt));

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
    }, 0);
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
