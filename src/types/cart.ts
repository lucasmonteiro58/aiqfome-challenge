export type SingleChoice = {
  type: "single";
  selected: string;
};

export type MultipleChoice = {
  type: "multiple";
  selected: string[];
};

export type QuantityChoice = {
  type: "quantity";
  selected: Record<string, number>;
};

export type CustomizationSelection =
  | {
      type: "single";
      selected: string;
      price: number;
    }
  | {
      type: "multiple";
      selected: string[];
      prices: Record<string, number>;
    }
  | {
      type: "quantity";
      selected: Record<string, number>;
      prices: Record<string, number>;
    };

export interface CartItem {
  restaurantId: string;
  productId: string;
  productName: string;
  quantity: number;
  basePrice: number;
  finalPrice: number;
  observation?: string;
  selectedCustomizations: Record<string, CustomizationSelection>;
}
