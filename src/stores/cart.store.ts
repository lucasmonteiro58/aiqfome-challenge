"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem } from "@/types/cart";
import { getCartItemTotal } from "@/lib/utils";

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getItemTotal: (item: CartItem) => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        const { items } = get();

        if (items.length > 0 && items[0].restaurantId !== item.restaurantId) {
          set({ items: [item] });
        } else {
          const existing = items.find((i) => i.productId === item.productId);

          if (existing) {
            set({
              items: items.map((i) =>
                i.productId === item.productId ? item : i
              ),
            });
          } else {
            set({ items: [...items, item] });
          }
        }
      },

      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((i) => i.productId !== productId),
        })),

      clearCart: () => set({ items: [] }),

      getItemTotal: (item) => getCartItemTotal(item),

      getCartTotal: () => {
        const { items, getItemTotal } = get();
        return items.reduce((acc, item) => acc + getItemTotal(item), 0);
      },
    }),
    {
      name: "cart-storage",
    }
  )
);
