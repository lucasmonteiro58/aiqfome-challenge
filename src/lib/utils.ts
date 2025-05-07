import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number): string {
  return value === 0 ? "grátis" : `R$ ${value?.toFixed(2)?.replace(".", ",")}`;
}
