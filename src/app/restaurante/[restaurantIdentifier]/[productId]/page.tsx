import { restaurants } from "@/data/restaurants";
import { notFound } from "next/navigation";
import { ProductHeader } from "@/components/product/ProductHeader";
import { ProductQuantitySelector } from "@/components/product/ProductQuantitySelector";
import { ProductCustomizationTitle } from "@/components/product/ProductCustomizationTitle";
import { SingleCustomization } from "@/components/product/SingleCustomization";
import { MultipleCustomization } from "@/components/product/MultipleCustomization";
import { QuantityCustomization } from "@/components/product/QuantityCustomization";
import { Textarea } from "@/components/ui/textarea";

export default async function ProductPage({
  params,
}: {
  params: { restaurantIdentifier: string; productId: string };
}) {
  const { restaurantIdentifier, productId } = await params;
  const restaurant = restaurants.find(
    (r) => r.identifier === restaurantIdentifier
  );

  if (!restaurant) return notFound();

  const allProducts = restaurant.categories.flatMap(
    (category) => category.products
  );

  const product = allProducts.find((p) => p.id === productId);

  if (!product) return notFound();

  return (
    <div className="pb-36">
      <ProductHeader product={product} />
      <ProductQuantitySelector product={product} restaurant={restaurant} />

      <div className="space-y-6 mt-6">
        {product.customizations?.map((customization, index) => (
          <div key={index}>
            <ProductCustomizationTitle customization={customization} />
            {customization.type === "single" && (
              <SingleCustomization customization={customization} />
            )}
            {customization.type === "multiple" && (
              <MultipleCustomization customization={customization} />
            )}
            {customization.type === "quantity" && (
              <QuantityCustomization customization={customization} />
            )}
          </div>
        ))}
      </div>

      <div className="px-4 mt-6">
        <Textarea placeholder="alguma observação do item? • opcional" />
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
        <button className="w-full bg-purple-brand text-white py-3 rounded-lg font-bold">
          ver ticket
        </button>
      </div>
    </div>
  );
}
