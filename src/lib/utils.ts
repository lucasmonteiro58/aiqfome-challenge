import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { CartItem } from "@/types/cart";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number): string {
  return value === 0 ? "grátis" : `R$ ${value?.toFixed(2)?.replace(".", ",")}`;
}

export function getCartItemTotal(item: CartItem): number {
  let total = item.finalPrice;

  for (const customization of Object.values(item.selectedCustomizations)) {
    switch (customization.type) {
      case "single":
        total += customization.price;
        break;

      case "multiple":
        for (const id of customization.selected) {
          total += customization.prices[id] || 0;
        }
        break;

      case "quantity":
        for (const id in customization.selected) {
          const quantity = customization.selected[id];
          const price = customization.prices[id] || 0;
          total += quantity * price;
        }
        break;
    }
  }

  return total * item.quantity;
}
