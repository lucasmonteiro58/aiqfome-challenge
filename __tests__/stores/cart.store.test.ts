import { useCartStore } from "@/stores/cart.store";
import { Restaurant, CartItem } from "@/types/restaurant";

const restaurantA: Restaurant = {
  id: "1",
  name: "Sushi Bar",
  identifier: "sushi-bar",
  logo: "/logo.png",
  isOpen: true,
  deliveryType: "motorcycle",
  deliveryFee: 0,
  rating: 5,
  deliveryEstimate: "20-30 min",
  distanceKm: 1,
  openingTime: "10:00",
  closingTime: "22:00",
  minOrder: 10,
  categories: [],
  freeDeliveryThreshold: 50,
};

const restaurantB: Restaurant = {
  ...restaurantA,
  id: "2",
  name: "Pizza Place",
  freeDeliveryThreshold: 30,
};

const item: CartItem = {
  product: {
    id: "p1",
    name: "Temaki",
    price: 20,
    description: "",
    image: "",
  },
  quantity: 1,
  selectedCustomizations: {},
  observation: "",
};

beforeEach(() => {
  useCartStore.getState().clearCart();
});

describe("useCartStore", () => {
  it("adiciona um item ao carrinho", () => {
    useCartStore.getState().addToCart(restaurantA, item);
    const state = useCartStore.getState();

    expect(state.items).toHaveLength(1);
    expect(state.restaurant?.id).toBe("1");
    expect(state.editingIndex).toBe(0);
  });

  it("reseta o carrinho ao adicionar item de outro restaurante", () => {
    useCartStore.getState().addToCart(restaurantA, item);
    const otherItem = { ...item, product: { ...item.product, id: "p2" } };
    useCartStore.getState().addToCart(restaurantB, otherItem);

    const state = useCartStore.getState();
    expect(state.items).toHaveLength(1);
    expect(state.items[0].product.id).toBe("p2");
    expect(state.restaurant?.id).toBe("2");
  });

  it("atualiza um item existente ao editar", () => {
    useCartStore.getState().addToCart(restaurantA, item);
    const updatedItem = { ...item, quantity: 3 };
    useCartStore.getState().setEditingIndex(0);
    useCartStore.getState().addToCart(restaurantA, updatedItem);

    const state = useCartStore.getState();
    expect(state.items[0].quantity).toBe(3);
  });

  it("atualiza item por índice", () => {
    useCartStore.getState().addToCart(restaurantA, item);
    const updatedItem = { ...item, quantity: 5 };
    useCartStore.getState().updateItemAtIndex(0, updatedItem);

    const state = useCartStore.getState();
    expect(state.items[0].quantity).toBe(5);
  });

  it("remove um item e mantém restaurante se ainda houver itens", () => {
    const secondItem = { ...item, product: { ...item.product, id: "p2" } };
    useCartStore.getState().addToCart(restaurantA, item);
    useCartStore.getState().addToCart(restaurantA, secondItem);
    useCartStore.getState().removeItem("p1");

    const state = useCartStore.getState();
    expect(state.items).toHaveLength(1);
    expect(state.restaurant).not.toBeNull();
  });

  it("remove último item e reseta restaurante", () => {
    useCartStore.getState().addToCart(restaurantA, item);
    useCartStore.getState().removeItem("p1");

    const state = useCartStore.getState();
    expect(state.items).toHaveLength(0);
    expect(state.restaurant).toBeNull();
    expect(state.editingIndex).toBeNull();
  });

  it("limpa todo o carrinho com clearCart", () => {
    useCartStore.getState().addToCart(restaurantA, item);
    useCartStore.getState().clearCart();

    const state = useCartStore.getState();
    expect(state.items).toHaveLength(0);
    expect(state.restaurant).toBeNull();
    expect(state.editingIndex).toBeNull();
  });

  it("define o índice de edição corretamente", () => {
    useCartStore.getState().setEditingIndex(2);
    expect(useCartStore.getState().editingIndex).toBe(2);
  });
});
