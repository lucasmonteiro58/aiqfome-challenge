import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TicketButton } from "@/components/TicketButton";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

const mockValidateCart = jest.fn().mockReturnValue(true);
const mockClearAll = jest.fn();

jest.mock("@/stores/cart.store", () => ({
  useCartStore: () => ({
    items: [{ id: "1", name: "Produto Teste" }],
  }),
}));

jest.mock("@/stores/validation.store", () => ({
  useValidationStore: () => ({
    validateCart: mockValidateCart,
    getState: () => ({
      clearAll: mockClearAll,
    }),
  }),
}));

describe("TicketButton", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("não renderiza o botão se não houver itens", () => {
    jest.mock("@/stores/cart.store", () => ({
      useCartStore: () => ({
        items: [],
      }),
    }));

    const { container } = render(<TicketButton />);
    expect(container.firstChild).toBeNull();
  });

  it("renderiza o botão quando há itens no carrinho", () => {
    render(<TicketButton />);
    expect(screen.getByText(/ver ticket/i)).toBeInTheDocument();
  });

  it("chama validateCart ao clicar no botão", async () => {
    render(<TicketButton />);
    const button = screen.getByRole("button", { name: /ver ticket/i });

    await userEvent.click(button);
    expect(mockValidateCart).toHaveBeenCalledWith([
      { id: "1", name: "Produto Teste" },
    ]);
  });

  it("redireciona para /carrinho se validação for verdadeira", async () => {
    const push = jest.fn();
    jest.mock("next/navigation", () => ({
      useRouter: () => ({
        push,
      }),
    }));

    render(<TicketButton />);
    const button = screen.getByRole("button", { name: /ver ticket/i });

    await userEvent.click(button);
    expect(push).toHaveBeenCalledWith("/carrinho");
  });

  it("chama clearAll ao montar o componente", () => {
    render(<TicketButton />);
    expect(mockClearAll).toHaveBeenCalled();
  });
});
