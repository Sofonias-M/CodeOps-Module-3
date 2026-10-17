'use client';

import Link from 'next/link';
import { useCartStore } from '@/store/useCartStore';

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export default function OrderSuccessPage() {
  const order = useCartStore((state) => state.lastOrder);

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-12 sm:px-6">
      <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:p-9">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-800">Order request received</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-stone-900">Thank you for supporting local craft.</h1>
        {order ? (
          <>
            <p className="mt-3 text-stone-600">
              Your order request has been recorded for this browsing session. No payment was taken.
            </p>
            <dl className="mt-6 grid gap-3 rounded-xl bg-stone-50 p-4 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-stone-600">Reference</dt>
                <dd className="mt-1 break-all font-semibold text-stone-900">{order.reference}</dd>
              </div>
              <div>
                <dt className="text-stone-600">Contact</dt>
                <dd className="mt-1 font-semibold text-stone-900">{order.phone}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-stone-600">Delivery address</dt>
                <dd className="mt-1 font-semibold text-stone-900">{order.address}</dd>
              </div>
            </dl>
            <h2 className="mt-7 text-lg font-semibold text-stone-900">Order summary</h2>
            <ul className="mt-3 divide-y divide-stone-200">
              {order.items.map((item) => (
                <li key={item.id} className="flex justify-between gap-4 py-3 text-sm">
                  <span className="text-stone-700">{item.name} × {item.quantity}</span>
                  <span className="shrink-0 font-medium text-stone-900">
                    {currency.format(item.price * item.quantity)}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-4 flex justify-between border-t border-stone-200 pt-4 font-semibold text-stone-900">
              <span>Subtotal</span>
              <span>{currency.format(order.subtotal)}</span>
            </p>
          </>
        ) : (
          <p className="mt-3 text-stone-600">
            Order details are only kept for this browsing session. Start shopping to place a new order request.
          </p>
        )}
        <Link
          href="/products"
          className="mt-8 inline-flex min-h-11 items-center justify-center rounded-lg bg-amber-900 px-5 py-2.5 font-semibold text-white transition hover:bg-amber-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-800"
        >
          Continue shopping
        </Link>
      </section>
    </main>
  );
}
