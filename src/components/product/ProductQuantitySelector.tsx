"use client";

import { useEffect, useState } from "react";
import { Product, Restaurant } from "@/types/restaurant";
import { Button } from "../ui/button";
import { QuantitySelector } from "../QuantitySelector";
import { useCartStore } from "@/stores/cart.store";

interface ProductQuantitySelectorProps {
  product: Product;
  restaurant: Restaurant;
}

export function ProductQuantitySelector({
  product,
  restaurant,
}: ProductQuantitySelectorProps) {
  const { items, addToCart, setEditingIndex } = useCartStore();
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const index = items.findIndex((item) => item.product.id === product.id);
    if (index !== -1) {
      const item = items[index];
      setQuantity(item.quantity);
      setEditingIndex(index);
    } else {
      setQuantity(0);
      setEditingIndex(null);
    }
  }, [items, product.id, setEditingIndex]);

  const total = (quantity * product.price).toFixed(2).replace(".", ",");

  function updateCart(newQuantity: number) {
    setQuantity(newQuantity);
    addToCart(restaurant, {
      product,
      quantity: newQuantity,
      selectedCustomizations: {},
      observation: "",
    });
  }

  return (
    <div className="pt-2 mt-2 px-4 border-b-4 border-container-95 pb-5">
      <div className="flex items-center justify-between mt-1 h-12">
        <div className="flex flex-col gap-2">
          <span className="font-bold text-medium-text">quantos?</span>
          <span className="text-sm text-light-text font-bold">
            total <strong className="text-medium-text">R$ {total}</strong>
          </span>
        </div>

        {quantity === 0 ? (
          <Button
            onClick={() => updateCart(1)}
            size="lg"
            className="bg-light-text hover:bg-light-text/85 text-white px-4 py-2 rounded-md text-sm font-bold"
          >
            adicionar
          </Button>
        ) : (
          <QuantitySelector
            initialValue={quantity}
            handleAdd={() => updateCart(quantity + 1)}
            handleDecrease={() => updateCart(quantity > 1 ? quantity - 1 : 0)}
            handleRemove={() => updateCart(0)}
            hasTrash
          />
        )}
      </div>
    </div>
  );
}
