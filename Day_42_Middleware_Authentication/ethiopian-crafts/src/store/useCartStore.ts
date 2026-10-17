import { create } from 'zustand';
import { CartItem, Order, OrderCustomer, Product } from '@/types';

interface CartState {
  items: CartItem[];
  lastOrder: Order | null;
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  submitOrder: (customer: OrderCustomer) => Order | null;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  lastOrder: null,
  addItem: (product) => set((state) => {
    if (!product.available) {
      return state;
    }

    const existingIndex = state.items.findIndex((item) => item.id === product.id);
    if (existingIndex > -1) {
      if (state.items[existingIndex].quantity >= Number.MAX_SAFE_INTEGER) {
        return state;
      }
      return {
        items: state.items.map((item, index) =>
          index === existingIndex ? { ...item, quantity: item.quantity + 1 } : item
        ),
      };
    }
    return { items: [...state.items, { ...product, quantity: 1 }] };
  }),
  removeItem: (id) => set((state) => ({
    items: state.items.filter((item) => item.id !== id),
  })),
  updateQuantity: (id, quantity) => set((state) => {
    if (!Number.isSafeInteger(quantity)) {
      return state;
    }
    if (quantity <= 0) {
      return { items: state.items.filter((item) => item.id !== id) };
    }
    return {
      items: state.items.map((item) => item.id === id ? { ...item, quantity } : item),
    };
  }),
  submitOrder: (customer) => {
    const items = get().items;
    if (items.length === 0) {
      return null;
    }

    const order: Order = {
      ...customer,
      reference: crypto.randomUUID(),
      items: items.map((item) => ({ ...item })),
      subtotal: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
      placedAt: new Date().toISOString(),
    };

    set({ items: [], lastOrder: order });
    return order;
  },
}));
