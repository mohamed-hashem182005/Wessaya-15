"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { createLineKey, getCartCount, getCartSubtotal, type CartLine, type NewCartLine } from "@/lib/cart";
import { XIcon } from "@/components/icons";

const STORAGE_KEY = "wessaya15-cart-v1";

type ToastState = { id: number; message: string } | null;

type CartContextValue = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addLine: (line: NewCartLine) => void;
  updateQuantity: (key: string, quantity: number) => void;
  removeLine: (key: string) => void;
  clearCart: () => void;
  notify: (message: string) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function isCartLine(value: unknown): value is CartLine {
  if (!value || typeof value !== "object") return false;
  const line = value as Record<string, unknown>;
  return (
    typeof line.key === "string" &&
    typeof line.itemId === "string" &&
    typeof line.name === "string" &&
    typeof line.categoryName === "string" &&
    typeof line.basePrice === "number" &&
    typeof line.unitPrice === "number" &&
    typeof line.quantity === "number" &&
    Array.isArray(line.extras)
  );
}

function sanitizeStoredLines(raw: string): CartLine[] {
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isCartLine).map((line) => ({
      ...line,
      quantity: Math.min(99, Math.max(1, Math.round(line.quantity))),
    }));
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [toast, setToast] = useState<ToastState>(null);

  /* eslint-disable react-hooks/set-state-in-effect -- localStorage is an external store; hydrate once on mount. */
  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) setLines(sanitizeStoredLines(stored));
    setHydrated(true);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // Storage can be unavailable in private browsing; the cart still works in memory.
    }
  }, [lines, hydrated]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 4200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const notify = useCallback((message: string) => {
    setToast({ id: Date.now(), message });
  }, []);

  const addLine = useCallback((line: NewCartLine) => {
    const key = createLineKey(line);
    setLines((current) => {
      const existing = current.find((entry) => entry.key === key);
      if (existing) {
        return current.map((entry) =>
          entry.key === key
            ? { ...entry, quantity: Math.min(99, entry.quantity + line.quantity) }
            : entry,
        );
      }
      return [...current, { ...line, key, quantity: Math.min(99, line.quantity) }];
    });
  }, []);

  const updateQuantity = useCallback((key: string, quantity: number) => {
    setLines((current) => {
      if (quantity <= 0) return current.filter((line) => line.key !== key);
      return current.map((line) =>
        line.key === key ? { ...line, quantity: Math.min(99, Math.round(quantity)) } : line,
      );
    });
  }, []);

  const removeLine = useCallback((key: string) => {
    setLines((current) => current.filter((line) => line.key !== key));
  }, []);

  const clearCart = useCallback(() => setLines([]), []);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      count: getCartCount(lines),
      subtotal: getCartSubtotal(lines),
      isOpen,
      openCart,
      closeCart,
      addLine,
      updateQuantity,
      removeLine,
      clearCart,
      notify,
    }),
    [
      lines,
      isOpen,
      openCart,
      closeCart,
      addLine,
      updateQuantity,
      removeLine,
      clearCart,
      notify,
    ],
  );

  return (
    <CartContext.Provider value={value}>
      {children}
      {toast ? (
        <div className="toast" role="status" aria-live="polite">
          <span className="toast__dot" aria-hidden="true" />
          <span className="toast__message">{toast.message}</span>
          <button
            type="button"
            className="toast__action"
            onClick={() => {
              setIsOpen(true);
              setToast(null);
            }}
          >
            عرض السلة
          </button>
          <button
            type="button"
            className="toast__close"
            onClick={() => setToast(null)}
            aria-label="إغلاق التنبيه"
          >
            <XIcon className="size-4" />
          </button>
        </div>
      ) : null}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}
