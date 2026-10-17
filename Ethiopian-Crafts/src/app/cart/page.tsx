import type { Metadata } from 'next';
import CartSummary from '@/components/CartSummary';

export const metadata: Metadata = {
  title: 'Your cart',
};

export default function CartPage() {
  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-800">Your selection</p>
      <h1 className="mt-2 mb-7 text-3xl font-bold tracking-tight text-stone-900">Shopping cart</h1>
      <CartSummary />
    </main>
  );
}
