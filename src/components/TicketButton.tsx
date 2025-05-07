"use client";

import { useCartStore } from "@/stores/cart.store";
import { useRouter } from "next/navigation";

export function TicketButton() {
  const cartItems = useCartStore((state) => state.items);
  const router = useRouter();

  if (cartItems.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4">
      <button
        onClick={() => router.push("/carrinho")}
        className="w-full bg-purple-brand text-white py-3 rounded-lg font-bold mb-1"
      >
        ver ticket
      </button>
    </div>
  );
}
