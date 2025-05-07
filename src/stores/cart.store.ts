import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Restaurant, CartItem } from "@/types/restaurant";

interface CartState {
  restaurant: Restaurant | null;
  items: CartItem[];
  editingIndex: number | null;
  setEditingIndex: (index: number | null) => void;
  addToCart: (restaurant: Restaurant, item: CartItem) => void;
  updateItemAtIndex: (index: number, updatedItem: CartItem) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      restaurant: null,
      items: [],
      editingIndex: null,

      setEditingIndex: (index) => set({ editingIndex: index }),

      addToCart: (restaurant, newItem) => {
        const currentRestaurant = get().restaurant;
        const editingIndex = get().editingIndex;
        const items = [...get().items];

        // Se mudar de restaurante, zera o carrinho
        if (currentRestaurant && currentRestaurant.id !== restaurant.id) {
          return set({
            restaurant,
            items: [newItem],
            editingIndex: 0,
          });
        }

        if (editingIndex !== null && items[editingIndex]) {
          items[editingIndex] = { ...newItem };
        } else {
          items.push(newItem);
          set({ editingIndex: items.length - 1 });
        }

        set({ restaurant, items });
      },
      updateItemAtIndex: (index: number, updatedItem: CartItem) => {
        const items = [...get().items];
        if (items[index]) {
          items[index] = { ...updatedItem };
          set({ items });
        }
      },

      clearCart: () => set({ restaurant: null, items: [], editingIndex: null }),
      removeItem: (productId) => {
        const items = get().items.filter(
          (item) => item.product.id !== productId
        );
        const index = get().editingIndex;
        const newIndex = index !== null && index >= items.length ? null : index;

        set({
          items,
          editingIndex: newIndex,
          ...(items.length === 0 ? { restaurant: null } : {}),
        });
      },
    }),
    { name: "cart-storage" }
  )
);
