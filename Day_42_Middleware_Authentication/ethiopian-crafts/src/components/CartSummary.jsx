'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '@/store/useCartStore';

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export default function CartSummary() {
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (items.length === 0) {
    return (
      <section className="rounded-2xl border border-stone-200 bg-white px-6 py-12 text-center shadow-sm">
        <h2 className="text-xl font-semibold text-stone-900">Your cart is empty</h2>
        <p className="mt-2 text-stone-600">Find something special in the craft collection.</p>
        <Link
          href="/products"
          className="mt-6 inline-flex min-h-11 items-center justify-center rounded-lg bg-amber-900 px-5 py-2.5 font-semibold text-white transition hover:bg-amber-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-800"
        >
          Browse products
        </Link>
      </section>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_19rem]">
      <ul className="divide-y divide-stone-200 rounded-2xl border border-stone-200 bg-white shadow-sm">
        {items.map((item) => (
          <li key={item.id} className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:p-6">
            <div className="relative h-28 w-full shrink-0 overflow-hidden rounded-xl bg-stone-100 sm:w-36">
              <Image
                src={item.image}
                alt=""
                fill
                sizes="(max-width: 640px) 100vw, 144px"
                className="object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-amber-800">{item.category}</p>
              <h2 className="mt-1 font-semibold text-stone-900">{item.name}</h2>
              <p className="mt-1 text-sm text-stone-600">{currency.format(item.price)} each</p>
              <button
                type="button"
                onClick={() => removeItem(item.id)}
                className="mt-3 rounded-sm text-sm font-medium text-red-800 underline underline-offset-2 hover:text-red-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-800"
              >
                Remove
              </button>
            </div>
            <div className="flex items-center justify-between gap-5 sm:flex-col sm:items-end">
              <div className="flex items-center gap-3" aria-label={`Quantity for ${item.name}`}>
                <button
                  type="button"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  aria-label={`Decrease ${item.name} quantity`}
                  className="h-10 w-10 rounded-lg border border-stone-300 text-lg font-semibold hover:bg-stone-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-800"
                >
                  −
                </button>
                <span className="min-w-6 text-center font-semibold" aria-live="polite">
                  {item.quantity}
                </span>
                <button
                  type="button"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  aria-label={`Increase ${item.name} quantity`}
                  className="h-10 w-10 rounded-lg border border-stone-300 text-lg font-semibold hover:bg-stone-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-800"
                >
                  +
                </button>
              </div>
              <p className="font-semibold text-stone-900">
                {currency.format(item.price * item.quantity)}
                <span className="sr-only"> line total</span>
              </p>
            </div>
          </li>
        ))}
      </ul>

      <aside className="h-fit rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-stone-900">Order summary</h2>
        <p className="mt-4 flex justify-between text-sm text-stone-600">
          <span>Items</span>
          <span>{items.reduce((total, item) => total + item.quantity, 0)}</span>
        </p>
        <p className="mt-3 flex justify-between border-t border-stone-200 pt-4 font-semibold text-stone-900">
          <span>Subtotal</span>
          <span>{currency.format(subtotal)}</span>
        </p>
        <p className="mt-3 text-xs leading-5 text-stone-600">Delivery details are collected at checkout. No payment is taken.</p>
        <Link
          href="/checkout"
          className="mt-6 flex min-h-12 items-center justify-center rounded-lg bg-amber-900 px-5 py-3 text-center font-semibold text-white transition hover:bg-amber-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-800"
        >
          Continue to checkout
        </Link>
      </aside>
    </div>
  );
}