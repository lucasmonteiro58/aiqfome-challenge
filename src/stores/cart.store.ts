"use client";

import { Product } from "@/types/restaurant";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartState {
  items: Product[];
  addItem: (item: Product) => void;
  removeItem: (item: Product) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item: Product) =>
        set((state) => ({
          items: [...state.items, item],
        })),
      removeItem: (item: Product) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== item.id),
        })),
    }),
    {
      name: "cart-storage",
    }
  )
);
