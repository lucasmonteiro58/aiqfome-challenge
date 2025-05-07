"use client";

import { Trash2, Plus, Minus } from "lucide-react";
import { useState } from "react";

interface QuantitySelectorProps {
  hasTrash?: boolean;
  handleAdd?: () => void;
  handleDecrease?: () => void;
  handleRemove?: () => void;
  initialValue?: number;
  size?: "sm" | "normal";
}

export function QuantitySelector({
  hasTrash = false,
  handleAdd,
  handleDecrease,
  handleRemove,
  initialValue = 0,
  size = "normal",
}: QuantitySelectorProps) {
  const [quantity, setQuantity] = useState(initialValue);

  const isSmall = size === "sm";
  const buttonSize = isSmall ? "w-6 h-6" : "w-8 h-8";
  const iconSize = isSmall ? 14 : 20;

  const increment = () => {
    handleAdd?.();
    setQuantity((q) => q + 1);
  };

  const decrement = () => {
    if (quantity > 1) {
      handleDecrease?.();
      setQuantity((q) => q - 1);
    } else {
      handleRemove?.();
      setQuantity(0);
    }
  };

  const renderDecreaseButton = () => {
    if (quantity > 0) {
      return (
        <button
          onClick={decrement}
          className={`${buttonSize} border border-teal-brand rounded-full flex items-center justify-center`}
        >
          <Minus className="text-teal-brand" size={iconSize} />
        </button>
      );
    }

    if (hasTrash) {
      return (
        <button onClick={decrement}>
          <Trash2
            className="text-teal-brand pb-0.5"
            size={32}
            strokeWidth={1}
          />
        </button>
      );
    }

    return (
      <button
        onClick={decrement}
        disabled
        className={`${buttonSize} bg-container-95 text-gray-icons rounded-full flex items-center justify-center`}
      >
        <Minus size={iconSize} />
      </button>
    );
  };

  return (
    <div className="flex items-center gap-3 justify-center">
      {renderDecreaseButton()}
      <span className="text-dark-text font-bold text-sm">{quantity}</span>
      <button
        onClick={increment}
        className={`${buttonSize} border border-teal-brand rounded-full text-teal-brand flex items-center justify-center`}
      >
        <Plus size={iconSize} />
      </button>
    </div>
  );
}
