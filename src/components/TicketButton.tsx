"use client";

import { useRouter } from "next/navigation";
import { useCartStore } from "@/stores/cart.store";
import { useValidationStore } from "@/stores/validation.store";
import { useEffect } from "react";

export function TicketButton() {
  const { items } = useCartStore();
  const { validateCart } = useValidationStore();
  const router = useRouter();

  const hasItems = items.length > 0;

  function handleClick() {
    const valid = validateCart(items);
    if (valid) {
      router.push("/carrinho");
    }
  }

  useEffect(() => {
    useValidationStore.getState().clearAll();
  }, []);

  if (!hasItems) return null;

  return (
    <div className="sm:relative fixed bottom-0 left-0 right-0 p-4 flex justify-center ">
      <button
        className="w-full bg-purple-brand text-white py-3 rounded-lg font-bold mb-1 cursor-pointer"
        onClick={handleClick}
      >
        ver ticket
      </button>
    </div>
  );
}
