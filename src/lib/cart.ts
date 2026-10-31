export type CartLineExtra = {
  id: string;
  label: string;
  price: number;
};

export type CartLine = {
  key: string;
  itemId: string;
  name: string;
  categoryName: string;
  basePrice: number;
  unitPrice: number;
  quantity: number;
  variantId?: string;
  variantLabel?: string;
  extras: CartLineExtra[];
  note?: string;
};

export type NewCartLine = Omit<CartLine, "key">;

export function createLineKey(line: NewCartLine): string {
  const extras = line.extras
    .map((extra) => extra.id)
    .sort()
    .join("+");
  return [
    line.itemId,
    line.variantId ?? "single",
    extras || "no-extras",
    (line.note ?? "").trim(),
  ].join("::");
}

export function getCartCount(lines: CartLine[]): number {
  return lines.reduce((total, line) => total + line.quantity, 0);
}

export function getCartSubtotal(lines: CartLine[]): number {
  return lines.reduce((total, line) => total + line.unitPrice * line.quantity, 0);
}

export function getLineTotal(line: CartLine): number {
  return line.unitPrice * line.quantity;
}
