"use client";

import { useCartStore } from "@/stores/cart.store";
import { CartItem, Restaurant } from "@/types/restaurant";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { QuantitySelector } from "../QuantitySelector";

interface CartItemProps {
  item: CartItem;
  restaurant: Restaurant | null;
}

export function CartEdit({ item, restaurant }: CartItemProps) {
  const { addToCart, items, restaurant: storeRestaurant } = useCartStore();

  const index = items.findIndex(
    (i) =>
      i.product.id === item.product.id &&
      JSON.stringify(i.selectedCustomizations) ===
        JSON.stringify(item.selectedCustomizations)
  );

  function updateQuantity(newQuantity: number) {
    if (!storeRestaurant) return;

    if (newQuantity === 0) {
      useCartStore.setState((state) => {
        const newItems = [...state.items];
        newItems.splice(index, 1);
        return { items: newItems };
      });
      return;
    }

    addToCart(storeRestaurant, {
      ...item,
      quantity: newQuantity,
    });
  }

  return (
    <div className="flex gap-6 items-center justify-between">
      <Link
        href={`/restaurante/${restaurant?.identifier}/${item.product.id}`}
        className="text-sm text-teal-brand font-semibold flex items-center gap-1"
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
