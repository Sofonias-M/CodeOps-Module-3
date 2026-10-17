'use client';

import Link from 'next/link';
import { useCartStore } from '@/store/useCartStore';

export default function CartLink() {
  const quantity = useCartStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0)
  );

  return (
    <Link
      href="/cart"
      className="rounded-lg px-3 py-2 text-sm font-semibold text-[#514238] transition hover:bg-[#f3e5d4] hover:text-[#542719] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a34324]"
      aria-label={`Cart, ${quantity} ${quantity === 1 ? 'item' : 'items'}`}
    >
      Cart <span aria-hidden="true">({quantity})</span>
    </Link>
  );
}
