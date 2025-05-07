"use client";

import { Trash2, Plus, Minus } from "lucide-react";

interface QuantitySelectorProps {
  hasTrash?: boolean;
  handleAdd?: () => void;
  handleDecrease?: () => void;
  handleRemove?: () => void;
  value: number;
  size?: "sm" | "normal";
}

export function QuantitySelector({
  hasTrash = false,
  handleAdd,
  handleDecrease,
  handleRemove,
  value,
  size = "normal",
}: QuantitySelectorProps) {
  const isSmall = size === "sm";
  const buttonSize = isSmall ? "w-6 h-6" : "w-8 h-8";
  const iconSize = isSmall ? 14 : 20;

  const decrement = () => {
    if (value > 1) {
      handleDecrease?.();
    } else {
      handleRemove?.();
    }
  };

  const renderDecreaseButton = () => {
    if (value > 0) {
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
      <span className="text-dark-text font-bold text-sm">{value}</span>
      <button
        onClick={handleAdd}
        className={`${buttonSize} border border-teal-brand rounded-full text-teal-brand flex items-center justify-center`}
      >
        <Plus size={iconSize} />
      </button>
    </div>
  );
}
