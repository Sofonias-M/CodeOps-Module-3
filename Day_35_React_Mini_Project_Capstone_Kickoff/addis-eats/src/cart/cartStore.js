import { create } from 'zustand';

export const useCartStore = create((set, get) => ({
  cartItems: [],

  // Action: Add dish to cart or increment quantity
  addToCart: (dish) => {
    if (!dish || !dish.id) return;

    set((state) => {
      const existingIndex = state.cartItems.findIndex((item) => item.id === dish.id);

      if (existingIndex > -1) {
        const updated = [...state.cartItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + 1,
        };
        return { cartItems: updated };
      }

      return { cartItems: [...state.cartItems, { ...dish, quantity: 1 }] };
    });
  },

  // Action: Clear cart after order submission
  clearCart: () => set({ cartItems: [] }),

  // Getter/Helper: Calculate ETB Total directly from state
  getTotalETB: () => {
    return get().cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  },
}));