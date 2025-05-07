import { Product } from "@/types/restaurant";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils";

export function ProductHeader({ product }: { product: Product }) {
  return (
    <>
      <Image
        src={product.image as string}
        alt={product.name}
        width={400}
        height={300}
        className="w-full h-64 object-cover"
      />
      <div className="px-4">
        <h1 className="font-bold text-xl mt-4 text-medium-text">
          {product.name}
        </h1>
        <div className="mt-1 text-purple-brand font-extrabold">
          <span className="text-light-text  text-sm">
            {product.multiplePrices ? "a partir de" : ""}
          </span>
          <span className="text-lg ml-1">{formatCurrency(product.price)}</span>
        </div>
        <p className="text-light-text text-sm font-semibold mt-1">
          {product.description}
        </p>
      </div>
    </>
  );
}
