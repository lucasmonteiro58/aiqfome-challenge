"use client";

import { useEffect, useState } from "react";
import { Customization } from "@/types/restaurant";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { CircleDollarSign } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { useCartStore } from "@/stores/cart.store";
import { useValidationStore } from "@/stores/validation.store";

interface CustomizationProps {
  customization: Customization;
}

export function MultipleCustomization({ customization }: CustomizationProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const { items, editingIndex } = useCartStore();
  const { errors, setError, clearError } = useValidationStore();

  const isMaxSelected = selectedOptions.length >= (customization.max || 0);

  useEffect(() => {
    if (
      editingIndex !== null &&
      items[editingIndex] &&
      items[editingIndex].selectedCustomizations?.[customization.title]
    ) {
      const selected =
        items[editingIndex].selectedCustomizations[customization.title];
      setSelectedOptions(selected.map((opt) => opt.id));
    }
  }, [editingIndex, items, customization.title]);

  function handleSelectOption(optionId: string) {
    let newSelectedOptions: string[] = [];

    setSelectedOptions((prev) => {
      newSelectedOptions = prev.includes(optionId)
        ? prev.filter((id) => id !== optionId)
        : isMaxSelected && !prev.includes(optionId)
          ? prev
          : [...prev, optionId];
      return newSelectedOptions;
    });

    if (
      customization.required &&
      newSelectedOptions.length < (customization.min || 0)
    ) {
      setError(
        customization.title,
        `Selecione pelo menos ${customization.min} itens.`
      );
    } else {
      clearError(customization.title);
    }

    if (editingIndex === null) return;

    const updatedItem = { ...items[editingIndex] };
    updatedItem.selectedCustomizations = {
      ...updatedItem.selectedCustomizations,
      [customization.title]: customization.options.filter((opt) =>
        newSelectedOptions.includes(opt.id)
      ),
    };

    useCartStore.setState((state) => {
      const newItems = [...state.items];
      newItems[editingIndex] = updatedItem;
      return { items: newItems };
    });
  }

  return (
    <div className="flex flex-col gap-3 pl-4 mt-4 pr-8 border-b-4 border-container-95 pb-4">
      {customization.options.map((opt) => (
        <div className="flex items-center space-x-2" key={opt.id}>
          <Checkbox
            value={opt.id}
            id={opt.id}
            onCheckedChange={() => handleSelectOption(opt.id)}
            disabled={isMaxSelected && !selectedOptions.includes(opt.id)}
            checked={selectedOptions.includes(opt.id)}
          />
          <Label
            htmlFor={opt.id}
            className="flex justify-between gap-3 py-1 w-full"
          >
            <div className="text-light-text text-sm flex items-center gap-1">
              {opt.hasPromotions && (
                <CircleDollarSign
                  className="text-success text-sm font-bold"
                  strokeWidth={1.5}
                  size={18}
                />
              )}
              <span>{opt.label}</span>
            </div>
            <div className="text-purple-brand font-bold text-sm">
              {opt.hasPromotions && opt.basePrice && (
                <span className="text-xs text-light-text font-bold mt-0.5 ">
                  de {formatCurrency(opt.basePrice)} por{" "}
                </span>
              )}
              {opt.price > 0 && (
                <span className={opt.hasPromotions ? "text-success" : ""}>
                  {formatCurrency(opt.price)}
                </span>
              )}
            </div>
          </Label>
        </div>
      ))}
      {errors[customization.title] && (
        <p className="text-red-500 text-sm">{errors[customization.title]}</p>
      )}
    </div>
  );
}
