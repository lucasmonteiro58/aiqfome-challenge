export interface Restaurant {
  id: string;
  name: string;
  identifier: string;
  logo: string;
  deliveryFee: number;
  deliveryEstimate: string;
  distanceKm: number;
  rating: number;
  openingTime: string;
  closingTime: string;
  freeDeliveryThreshold: number;
  minOrder: number;
  categories: Category[];
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  products: Product[];
  hasPromotions?: boolean;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  image?: string;
  basePrice?: number;
  price: number;
  hasPromotions?: boolean;
  multiplePrices?: boolean;
  customizations?: Customization[];
  substances?: Substance[];
}

export interface Customization {
  type: "single" | "multiple" | "quantity";
  required?: boolean;
  title: string;
  min?: number;
  max?: number;
  options: CustomizationOption[];
}

export interface CustomizationOption {
  id: string;
  label: string;
  price: number;
  basePrice?: number;
  hasPromotions?: boolean;
  default?: boolean;
}

export interface Favorites {
  id: string;
  name: string;
  logo: string;
}

export type Substance = "alcohol" | "candy" | "gluten-free" | "spicy" | "vegan";
