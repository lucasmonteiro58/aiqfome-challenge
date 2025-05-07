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
  id: string;
  type: "single" | "multiple" | "quantity";
  required?: boolean;
  title: string;
  subtitle?: string;
  min?: number;
  max?: number;
  options: CustomizationOption[];
}

export interface Favorites {
  id: string;
  name: string;
  logo: string;
}

export type Substance = "alcohol" | "candy" | "gluten-free" | "spicy" | "vegan";

export interface CustomizationOption {
  id: string;
  label: string;
  price: number;
  basePrice?: number;
  hasPromotions?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedCustomizations: Record<string, CustomizationOption[]>;
  observation?: string;
}

export interface CartState {
  restaurant: Restaurant | null;
  items: CartItem[];
  addToCart: (restaurant: Restaurant, item: CartItem) => void;
  clearCart: () => void;
}
