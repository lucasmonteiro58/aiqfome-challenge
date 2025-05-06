"use client";

import { Favorites } from "@/types/restaurant";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavoriteState {
  favorites: Favorites[];
  addItem: (item: Favorites) => void;
  removeItem: (item: Favorites) => void;
}

export const useFavoriteStore = create<FavoriteState>()(
  persist(
    (set) => ({
      favorites: [],
      addItem: (item: Favorites) =>
        set((state) => ({
          favorites: [...state.favorites, item],
        })),
      removeItem: (item: Favorites) =>
        set((state) => ({
          favorites: state.favorites.filter((i) => i.id !== item.id),
        })),
    }),
    {
      name: "favorites-storage",
    }
  )
);
