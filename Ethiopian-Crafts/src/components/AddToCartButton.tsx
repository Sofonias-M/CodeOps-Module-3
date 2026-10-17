'use client';

import { useState } from 'react';
import { useCartStore } from '@/store/useCartStore';
import { Product } from '@/types';

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem(product);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  }

  return (
    <button
      type="button"
      onClick={handleAdd}
      disabled={!product.available}
      className="w-full rounded-lg bg-amber-800 px-4 py-2.5 font-semibold text-white shadow-sm transition hover:bg-amber-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-800 disabled:cursor-not-allowed disabled:bg-stone-400"
    >
      {!product.available ? 'Out of stock' : added ? 'Added to cart' : 'Add to cart'}
    </button>
  );
}