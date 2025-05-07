import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RestaurantCard } from "@/components/RestaurantCard";
import { Restaurant } from "@/types/restaurant";

const pushMock = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt || "mocked image"} />;
  },
}));

const restaurant: Restaurant = {
  id: "1",
  name: "Sushi Bar",
  logo: "/logo.png",
  identifier: "sushi-bar",
  isOpen: true,
  deliveryType: "motorcycle",
  deliveryFee: 5.9,
  rating: 4.8,
  deliveryEstimate: "30-40 min",
  distanceKm: 2.5,
  openingTime: "10:00",
  closingTime: "22:00",
  minOrder: 20,
  categories: [],
  freeDeliveryThreshold: 50,
};

describe("RestaurantCard", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renderiza corretamente o nome, nota e imagem", () => {
    render(<RestaurantCard {...restaurant} />);

    expect(screen.getByText("Sushi Bar")).toBeInTheDocument();
    expect(screen.getByText("4.8")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("src", "/logo.png");
  });

  it("chama router.push ao clicar se o restaurante estiver aberto", async () => {
    render(<RestaurantCard {...restaurant} />);
    const card = screen.getByRole("img").closest("div")!;

    await userEvent.click(card);
    expect(pushMock).toHaveBeenCalledWith("restaurante/sushi-bar");
  });

  it("não redireciona se restaurante estiver fechado", async () => {
    render(<RestaurantCard {...restaurant} isOpen={false} />);
    const card = screen.getByRole("img").closest("div")!;

    await userEvent.click(card);
    expect(pushMock).not.toHaveBeenCalled();
  });

  it("aplica classe de opacidade quando o restaurante estiver fechado", () => {
    render(<RestaurantCard {...restaurant} isOpen={false} />);
    const image = screen.getByRole("img");

    expect(image.className).toContain("opacity-50");
  });
});
