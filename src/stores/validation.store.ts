import { create } from "zustand";
import { CartItem } from "@/types/restaurant";

interface ValidationStore {
  errors: Record<string, string>;
  setError: (field: string, message: string) => void;
  clearError: (field: string) => void;
  clearAll: () => void;
  validateCart: (items: CartItem[]) => boolean;
}

export const useValidationStore = create<ValidationStore>((set) => ({
  errors: {},
  setError: (field, message) =>
    set((state) => ({ errors: { ...state.errors, [field]: message } })),
  clearError: (field) =>
    set((state) => {
      const newErrors = { ...state.errors };
      delete newErrors[field];
      return { errors: newErrors };
    }),
  clearAll: () => set({ errors: {} }),

  validateCart: (items) => {
    let isValid = true;
    const newErrors: Record<string, string> = {};

    items.forEach((item) => {
      const customizations = item.product.customizations || [];
      customizations.forEach((custom) => {
        if (custom.type === "multiple" && custom.required) {
          const selected = item.selectedCustomizations?.[custom.title] || [];
          if (selected.length < (custom.min || 0)) {
            newErrors[custom.title] =
              `Selecione pelo menos ${custom.min} itens.`;
            isValid = false;
          }
          if (custom.max && selected.length > custom.max) {
            newErrors[custom.title] =
              `Selecione no máximo ${custom.max} itens.`;
            isValid = false;
          }
        }
      });
    });

    set({ errors: newErrors });
    return isValid;
  },
}));
