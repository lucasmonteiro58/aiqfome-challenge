"use client";
import { Heart } from "lucide-react";
import { useFavoriteStore } from "@/stores/favorites.store";

interface FavoriteProps {
  name: string;
  logo: string;
  id: string;
}

export function RestaurantFavoriteButton({ name, logo, id }: FavoriteProps) {
  const { addItem, removeItem, favorites } = useFavoriteStore();

  const isFavorite = favorites.some((item) => item.id === id);

  const handleFavoriteClick = () => {
    if (isFavorite) {
      removeItem({ id, name, logo });
    } else {
      addItem({ id, name, logo });
    }
  };

  return (
    <button onClick={handleFavoriteClick}>
      <Heart
        size={24}
        className="cursor-pointer"
        fill={isFavorite ? "currentColor" : "none"}
      />
    </button>
  );
}
