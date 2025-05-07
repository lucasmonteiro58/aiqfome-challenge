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
      addToCart: (restaurant, newItem) => {
        const currentRestaurant = get().restaurant;

        if (currentRestaurant && currentRestaurant.id !== restaurant.id) {
          return set({ restaurant, items: [newItem] });
        }

        const existingItems = get().items;
        const updatedItems = [...existingItems];
        const index = existingItems.findIndex(
          (item) =>
            item.product.id === newItem.product.id &&
            JSON.stringify(item.selectedCustomizations) ===
              JSON.stringify(newItem.selectedCustomizations)
        );

        if (index !== -1) {
          updatedItems[index] = {
            ...updatedItems[index],
            quantity: newItem.quantity,
          };
        } else {
          updatedItems.push(newItem);
        }

        set({ restaurant, items: updatedItems });
      },

      clearCart: () => set({ restaurant: null, items: [] }),
    }),
    { name: "cart-storage" }
  )
);
