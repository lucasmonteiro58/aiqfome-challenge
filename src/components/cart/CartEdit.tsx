"use client";

import { useCartStore } from "@/stores/cart.store";
import { CartItem, Restaurant } from "@/types/restaurant";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { QuantitySelector } from "../QuantitySelector";

interface CartItemProps {
  item: CartItem;
  restaurant: Restaurant | null;
  index: number;
}

export function CartEdit({ item, restaurant, index }: CartItemProps) {
  const {
    items,
    restaurant: storeRestaurant,
    updateItemAtIndex,
    setEditingIndex,
  } = useCartStore();

  function updateQuantity(newQuantity: number) {
    if (!storeRestaurant) return;

    if (newQuantity === 0) {
      useCartStore.setState((state) => {
        const newItems = [...state.items];
        newItems.splice(index, 1);
        return { items: newItems };
      });
    } else {
      const updatedItem = {
        ...items[index],
        quantity: newQuantity,
      };
      updateItemAtIndex(index, updatedItem);
    }
  }

  return (
    <div className="flex gap-6 items-center justify-between">
      <Link
        href={`/restaurante/${restaurant?.identifier}/${item.product.id}`}
        className="text-sm text-teal-brand font-semibold flex items-center gap-1"
        onClick={() => setEditingIndex(index)}
      >
        <Pencil size={14} />
        editar
      </Link>

      <QuantitySelector
        size="sm"
        value={item.quantity}
        handleAdd={() => updateQuantity(item.quantity + 1)}
        handleDecrease={() => updateQuantity(Math.max(item.quantity - 1, 0))}
        handleRemove={() => updateQuantity(0)}
        hasTrash
      />
    </div>
  );
}
