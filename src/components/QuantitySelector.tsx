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

  const renderDecreaseButton = () => {
    if (value > 1 || !hasTrash) {
      return (
        <button
          onClick={handleDecrease}
          className={`${buttonSize} border border-teal-brand rounded-full flex items-center justify-center`}
        >
          <Minus className="text-teal-brand" size={iconSize} />
        </button>
      );
    }

    return null;
  };

  return (
    <div className="flex items-center gap-3 justify-center">
      {hasTrash && value === 1 ? (
        <button onClick={handleRemove}>
          <Trash2
            className="text-teal-brand"
            size={isSmall ? 25 : 32}
            strokeWidth={1}
          />
        </button>
      ) : (
        renderDecreaseButton()
      )}

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
