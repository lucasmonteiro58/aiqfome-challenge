"use client";

import { useState } from "react";
import { Product } from "@/types/restaurant";
import { Button } from "../ui/button";
import { QuantitySelector } from "../QuantitySelector";

interface ProductQuantitySelectorProps {
  product: Product;
}

export function ProductQuantitySelector({
  product,
}: ProductQuantitySelectorProps) {
  const [quantity, setQuantity] = useState(0);

  const total = (quantity * product.price).toFixed(2).replace(".", ",");

  function handleAdd() {
    setQuantity((q) => q + 1);
  }

  function handleDecrease() {
    setQuantity((q) => (q > 1 ? q - 1 : 0));
  }

  function handleRemove() {
    setQuantity(0);
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
            handleAdd={handleAdd}
            handleDecrease={handleDecrease}
            handleRemove={handleRemove}
            hasTrash
          />
        )}
      </div>
    </div>
  );
}
