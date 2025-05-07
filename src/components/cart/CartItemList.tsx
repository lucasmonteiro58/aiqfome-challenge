"use client";

import { CartItem } from "@/types/restaurant";
import { formatCurrency } from "@/lib/utils";

interface CartItemListProps {
  item: CartItem;
}

export function CartItemList({ item }: CartItemListProps) {
  const { selectedCustomizations } = item;

  if (
    !selectedCustomizations ||
    Object.keys(selectedCustomizations).length === 0
  ) {
    return null;
  }

  return (
    <div className="mt-2 space-y-1">
      {Object.entries(selectedCustomizations).map(([label, options]) => (
        <div key={label} className="text-sm text-muted-foreground pl-1 mb-3">
          <div className="text-[13px] font-bold text-light-text">• {label}</div>
          {options.map((opt, i) => (
            <div
              key={i}
              className="ml-2 text-[13px] font-semibold text-light-text mt-1"
            >
              {opt.label}
              {opt.quantity ? ` x${opt.quantity}` : ""}
              {opt.price > 0 && (
                <span className="text-teal-brand font-bold ml-2">
                  +{formatCurrency(opt.price)}
                </span>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
