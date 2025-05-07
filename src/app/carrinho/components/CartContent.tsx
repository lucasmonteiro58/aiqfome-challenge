"use client";

import { useCartStore } from "@/stores/cart.store";
import { CartHeader } from "@/components/cart/CartHeader";
import { CartItemTitle } from "@/components/cart/CartItemTitle";
import { CartEdit } from "@/components/cart/CartEdit";
import { CartItemList } from "@/components/cart/CartItemList";

export default function CartContent() {
  const { items, restaurant } = useCartStore();

  const subtotal = items
    .filter((item) => item.product && typeof item.product.price === "number")
    .reduce((total, item) => {
      const base = item.product.price * item.quantity;
      const extras = Object.values(item.selectedCustomizations || {})
        .flat()
        .reduce((sum, opt) => {
          return sum + (opt.price || 0) * (opt.quantity || 1);
        }, 0);

      return total + base + extras;
    }, 0);

  return (
    <div className="pb-32">
      <CartHeader restaurant={restaurant} />
      <div className="space-y-6">
        {items.map((item, index) => (
          <div
            key={index}
            className="px-4 border-b-4 border-container-95 pb-4 space-y-1"
          >
            <CartItemTitle item={item} />
            <div className="flex justify-end w-full items-center mt-2">
              <CartEdit item={item} restaurant={restaurant} index={index} />
            </div>

            <CartItemList item={item} />

            {item.observation && (
              <div className="bg-container-97 rounded p-2 mt-2 text-sm text-medium-text">
                <strong>observação:</strong> {item.observation}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
        <div className="flex justify-between mb-3 px-1 text-sm">
          <span className="text-muted-foreground font-semibold">subtotal</span>
          <strong className="text-purple-brand text-lg">
            R$ {subtotal.toFixed(2).replace(".", ",")}
          </strong>
        </div>
        <button className="w-full bg-purple-brand text-white py-3 rounded-lg font-bold">
          ir para pagamento
        </button>
      </div>
    </div>
  );
}
