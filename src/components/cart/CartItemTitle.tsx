import { formatCurrency } from "@/lib/utils";
import { CartItem } from "@/types/restaurant";

interface CartItemProps {
  item: CartItem;
}

export function CartItemTitle({ item }: CartItemProps) {
  return (
    <div className="flex justify-between">
      <strong className="text-base text-dark-text font-bold">
        {item.product.name}
      </strong>
      <span className="text-purple-brand font-bold">
        {formatCurrency(item.product.price)}
      </span>
    </div>
  );
}
