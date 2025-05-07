import { restaurants } from "@/data/restaurants";
import { notFound } from "next/navigation";
import { ProductHeader } from "@/components/product/ProductHeader";
import { ProductQuantitySelector } from "@/components/product/ProductQuantitySelector";
import { ProductCustomizationTitle } from "@/components/product/ProductCustomizationTitle";
import { SingleCustomization } from "@/components/product/SingleCustomization";
import { MultipleCustomization } from "@/components/product/MultipleCustomization";
import { QuantityCustomization } from "@/components/product/QuantityCustomization";
import { ProductObservation } from "@/components/product/ProductObservation";
import { Footer } from "@/components/Footer";
import { TicketButton } from "@/components/TicketButton";
import { Metadata } from "next";

type ProductPageParams = Promise<{
  restaurantIdentifier: string;
  productId: string;
}>;

export async function generateMetadata({
  params,
}: {
  params: ProductPageParams;
}): Promise<Metadata> {
  const { restaurantIdentifier } = await params;
  const restaurant = restaurants.find(
    (r) => r.identifier === restaurantIdentifier
  );
  return {
    title: restaurant
      ? "Aiqfome - " + restaurant.name
      : "Aiqfome - Restaurante",
  };
}

export default async function ProductPage({
  params,
}: {
  params: ProductPageParams;
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
    <>
      <div className="container mx-auto max-w-[1000px]">
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

        <div className="px-4 mt-6 mb-12">
          <ProductObservation />
        </div>
        <TicketButton />
      </div>
      <Footer />
    </>
  );
}
