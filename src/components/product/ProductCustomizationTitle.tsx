import { Customization, Product } from "@/types/restaurant";

interface CustomizationProps {
  customization: Customization;
  product?: Product;
}

export function ProductCustomizationTitle({
  customization,
}: CustomizationProps) {
  return (
    <div className="font-bold text-medium-text mb-2 flex justify-between px-4">
      <div className="flex flex-col">
        <span>{customization.title}</span>
        <span className="text-xs text-light-text">
          {customization.subtitle}
        </span>
      </div>
      {customization.required && (
        <span className="text-xs bg-medium-text rounded px-2 py-1.5 text-white h-min">
          obrigatório
        </span>
      )}
    </div>
  );
}
