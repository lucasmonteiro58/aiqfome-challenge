import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Restaurant, CartItem } from "@/types/restaurant";

interface CartState {
  restaurant: Restaurant | null;
  items: CartItem[];
  addToCart: (restaurant: Restaurant, item: CartItem) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      restaurant: null,
      items: [],
      addToCart: (restaurant, item) => {
        const currentRestaurant = get().restaurant;

        if (currentRestaurant && currentRestaurant.id !== restaurant.id) {
          set({ restaurant, items: [item] });
        } else {
          set((state) => ({
            restaurant,
            items: [...state.items, item],
          }));
        }
      },
      clearCart: () => set({ restaurant: null, items: [] }),
    }),
    { name: "cart-storage" }
  )
);
