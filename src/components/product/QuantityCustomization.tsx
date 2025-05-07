"use client";

import { useEffect, useState } from "react";
import { Customization, CustomizationOption } from "@/types/restaurant";
import { formatCurrency } from "@/lib/utils";
import { QuantitySelector } from "../QuantitySelector";
import { useCartStore } from "@/stores/cart.store";

interface CustomizationProps {
  customization: Customization;
}

export function QuantityCustomization({ customization }: CustomizationProps) {
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const { items, editingIndex } = useCartStore();

  useEffect(() => {
    if (
      editingIndex !== null &&
      items[editingIndex] &&
      items[editingIndex].selectedCustomizations?.[customization.title]
    ) {
      const selected =
        items[editingIndex].selectedCustomizations[customization.title];
      const counts: Record<string, number> = {};

      selected.forEach((opt) => {
        if (opt.quantity) {
          counts[opt.id] = opt.quantity;
        } else {
          counts[opt.id] = (counts[opt.id] || 0) + 1;
        }
      });

      setQuantities(counts);
    }
  }, [editingIndex, items, customization.title]);

  function updateQuantity(optionId: string, newQuantity: number) {
    const newQuantities = {
      ...quantities,
      [optionId]: newQuantity,
    };

    setQuantities(newQuantities);

    if (editingIndex === null) return;

    const selected: CustomizationOption[] = customization.options
      .filter((opt) => newQuantities[opt.id] > 0)
      .map((opt) => ({
        ...opt,
        quantity: newQuantities[opt.id],
      }));

    const updatedItem = { ...items[editingIndex] };
    updatedItem.selectedCustomizations = {
      ...updatedItem.selectedCustomizations,
      [customization.title]: selected,
    };

    useCartStore.setState((state) => {
      const newItems = [...state.items];
      newItems[editingIndex] = updatedItem;
      return { items: newItems };
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
            value={quantities[opt.id] || 0}
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
