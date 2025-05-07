"use client";

import { useState } from "react";
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
  const [quantity, setQuantity] = useState(0);
  const { addToCart } = useCartStore();

  const total = (quantity * product.price).toFixed(2).replace(".", ",");

  function handleAdd() {
    setQuantity(1);
    addToCart(restaurant, {
      product,
      quantity: 1,
      selectedCustomizations: {},
      observation: "",
    });
  }

  function handleIncrease() {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);

    addToCart(restaurant, {
      product,
      quantity: newQuantity,
      selectedCustomizations: {},
      observation: "",
    });
  }

  function handleDecrease() {
    const newQuantity = quantity > 1 ? quantity - 1 : 0;
    setQuantity(newQuantity);

    if (newQuantity > 0) {
      addToCart(restaurant, {
        product,
        quantity: newQuantity,
        selectedCustomizations: {},
        observation: "",
      });
    } else {
      // aqui podemos implementar depois um remove do carrinho
    }
  }

  function handleRemove() {
    setQuantity(0);
    // aqui podemos implementar depois um remove do carrinho
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
            onClick={handleAdd}
            size="lg"
            className="bg-light-text hover:bg-light-text/85 text-white px-4 py-2 rounded-md text-sm font-bold"
          >
            adicionar
          </Button>
        ) : (
          <QuantitySelector
            initialValue={quantity}
            handleAdd={handleIncrease}
            handleDecrease={handleDecrease}
            handleRemove={handleRemove}
            hasTrash
          />
        )}
      </div>
    </div>
  );
}
