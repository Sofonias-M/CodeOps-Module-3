"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import type { MenuItem } from "./menu-data";

export type CartLine = {
  item: MenuItem;
  quantity: number;
};

type CartContextValue = {
  items: CartLine[];
  itemCount: number;
  subtotal: number;
  addItem: (item: MenuItem) => void;
  changeQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "addis-eats-cart";
const EMPTY_CART: CartLine[] = [];
let cartItems = EMPTY_CART;
let hasLoadedCart = false;
const subscribers = new Set<() => void>();

function isCartLine(value: unknown): value is CartLine {
  if (typeof value !== "object" || value === null || !("item" in value) || !("quantity" in value)) {
    return false;
  }
  const { item, quantity } = value;
  return (
    typeof item === "object" &&
    item !== null &&
    "id" in item &&
    typeof item.id === "string" &&
    "name" in item &&
    typeof item.name === "string" &&
    "price" in item &&
    typeof item.price === "number" &&
    "description" in item &&
    typeof item.description === "string" &&
    "category" in item &&
    typeof item.category === "string" &&
    "image" in item &&
    typeof item.image === "string" &&
    typeof quantity === "number" &&
    Number.isInteger(quantity) &&
    quantity > 0
  );
}

function getSnapshot() {
  if (!hasLoadedCart && typeof window !== "undefined") {
    hasLoadedCart = true;
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: unknown = JSON.parse(stored);
        cartItems = Array.isArray(parsed) ? parsed.filter(isCartLine) : EMPTY_CART;
      }
    } catch (error) {
      console.error("Unable to restore the Addis Eats cart.", error);
    }
  }
  return cartItems;
}

function getServerSnapshot() {
  return EMPTY_CART;
}

function subscribe(listener: () => void) {
  subscribers.add(listener);
  return () => subscribers.delete(listener);
}

function updateCart(update: (current: CartLine[]) => CartLine[]) {
  cartItems = update(getSnapshot());
  hasLoadedCart = true;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
  } catch (error) {
    console.error("Unable to save the Addis Eats cart.", error);
  }
  subscribers.forEach((listener) => listener());
}

export function CartProvider({ children }: { children: ReactNode }) {
  const items = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const addItem = useCallback((item: MenuItem) => {
    updateCart((current) => {
      const existing = current.find((line) => line.item.id === item.id);
      return existing
        ? current.map((line) =>
            line.item.id === item.id
              ? { ...line, quantity: line.quantity + 1 }
              : line,
          )
        : [...current, { item, quantity: 1 }];
    });
  }, []);

  const changeQuantity = useCallback((id: string, quantity: number) => {
    updateCart((current) =>
      quantity < 1
        ? current.filter((line) => line.item.id !== id)
        : current.map((line) =>
            line.item.id === id ? { ...line, quantity } : line,
          ),
    );
  }, []);

  const removeItem = useCallback((id: string) => {
    updateCart((current) => current.filter((line) => line.item.id !== id));
  }, []);

  const clearCart = useCallback(() => updateCart(() => EMPTY_CART), []);

  const value = useMemo(
    () => ({
      items,
      itemCount: items.reduce((total, line) => total + line.quantity, 0),
      subtotal: items.reduce(
        (total, line) => total + line.item.price * line.quantity,
        0,
      ),
      addItem,
      changeQuantity,
      removeItem,
      clearCart,
    }),
    [items, addItem, changeQuantity, removeItem, clearCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider.");
  }
  return context;
}
