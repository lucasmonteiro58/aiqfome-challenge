import { useRouter } from "next/navigation";

export function CartEmpty() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center text-center px-6 py-12">
      <p className="text-lg font-semibold text-dark-text mb-2">
        Seu carrinho está vazio
      </p>
      <p className="text-light-text text-sm mb-6">
        Adicione itens para ver seu pedido aqui.
      </p>
      <button
        onClick={() => router.push("/")}
        className="bg-purple-brand text-white px-6 py-2 rounded-lg font-bold"
      >
        Voltar para o início
      </button>
    </div>
  );
}
