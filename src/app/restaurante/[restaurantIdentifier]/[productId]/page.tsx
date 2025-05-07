import { restaurants } from "@/data/restaurants";
import { notFound } from "next/navigation";
import { ProductHeader } from "@/components/product/ProductHeader";
import { ProductQuantitySelector } from "@/components/product/ProductQuantitySelector";
import { ProductCustomizationTitle } from "@/components/product/ProductCustomizationTitle";
import { SingleCustomization } from "@/components/product/SingleCustomization";

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
      <ProductQuantitySelector product={product} />
      <div className="space-y-6 mt-6">
        {product.customizations?.map((customization, index) => (
          <div key={index}>
            <ProductCustomizationTitle customization={customization} />
            {customization.type === "single" && (
              <SingleCustomization customization={customization} />
            )}
            {customization.type === "multiple" &&
              customization.options.map((opt) => (
                <label key={opt.id} className="flex items-center gap-3 py-1">
                  <input
                    type="checkbox"
                    name={customization.title}
                    value={opt.id}
                  />
                  <div className="text-sm">
                    {opt.label}
                    {opt.price > 0 && (
                      <span className="text-purple-brand font-medium ml-1">
                        +R$ {opt.price.toFixed(2).replace(".", ",")}
                      </span>
                    )}
                  </div>
                </label>
              ))}
            {customization.type === "quantity" &&
              customization.options.map((opt) => (
                <div
                  key={opt.id}
                  className="flex justify-between items-center border rounded px-3 py-1 my-1"
                >
                  <span>{opt.label}</span>
                  <span className="text-purple-brand font-bold">
                    +R$ {opt.price.toFixed(2).replace(".", ",")}
                  </span>

                  <div className="flex items-center gap-2">
                    <button>-</button>
                    <span>0</span>
                    <button>+</button>
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div>

      <textarea
        className="mt-6 w-full p-3 border rounded text-sm"
        rows={3}
        placeholder="alguma observação do item? • opcional"
      />

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
        <button className="w-full bg-purple-brand text-white py-3 rounded-lg font-bold">
          ver ticket
        </button>
      </div>
    </div>
  );
}
