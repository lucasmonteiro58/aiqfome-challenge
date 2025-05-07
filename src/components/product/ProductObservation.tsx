"use client";

import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { useCartStore } from "@/stores/cart.store";

export function ProductObservation() {
  const { items, editingIndex } = useCartStore();
  const [observation, setObservation] = useState("");

  useEffect(() => {
    if (
      editingIndex !== null &&
      items[editingIndex] &&
      items[editingIndex].observation
    ) {
      setObservation(items[editingIndex].observation);
    }
  }, [editingIndex, items]);

  function handleChange(value: string) {
    setObservation(value);

    if (editingIndex === null) return;

    const updatedItem = { ...items[editingIndex], observation: value };

    useCartStore.setState((state) => {
      const newItems = [...state.items];
      newItems[editingIndex] = updatedItem;
      return { items: newItems };
    });
  }

  return (
    <Textarea
      placeholder="alguma observação do item? • opcional"
      value={observation}
      onChange={(e) => handleChange(e.target.value)}
    />
  );
}
