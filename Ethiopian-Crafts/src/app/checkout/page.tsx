'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/useCartStore';

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export default function CheckoutPage() {
  const items = useCartStore((state) => state.items);
  const submitOrder = useCartStore((state) => state.submitOrder);
  const router = useRouter();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  function handleOrderSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get('name') ?? '').trim();
    const phone = String(formData.get('phone') ?? '').trim();
    const address = String(formData.get('address') ?? '').trim();
    const nextErrors: Record<string, string> = {};

    if (!name) {
      nextErrors.name = 'Enter your name.';
    }
    if (!/^\+?[\d\s()-]{7,20}$/.test(phone) || phone.replace(/\D/g, '').length < 7) {
      nextErrors.phone = 'Enter a valid phone number with at least 7 digits.';
    }
    if (!address) {
      nextErrors.address = 'Enter a delivery address.';
    }
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    const order = submitOrder({ name, phone, address });
    if (!order) {
      setErrors({ form: 'Your cart is empty. Add a product before submitting an order.' });
      return;
    }

    router.push('/order-success');
  }

  if (items.length === 0) {
    return (
      <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-stone-900">Your cart is empty</h1>
        <p className="mt-3 text-stone-600">Add a craft to your cart before starting checkout.</p>
        <Link
          href="/products"
          className="mt-6 inline-flex min-h-11 items-center justify-center rounded-lg bg-amber-900 px-5 py-2.5 font-semibold text-white transition hover:bg-amber-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-800"
        >
          Return to the collection
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-800">Almost there</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-stone-900">Delivery details</h1>
      <p className="mt-2 max-w-2xl text-stone-600">
        This is an order request only. No payment details are requested or processed.
      </p>

      <div className="mt-7 grid gap-7 lg:grid-cols-[1fr_20rem]">
        <form
          onSubmit={handleOrderSubmit}
          noValidate
          className="space-y-5 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm sm:p-7"
        >
          <div>
            <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-stone-800">
              Full name <span aria-hidden="true">*</span>
            </label>
            <input
              id="name"
              name="name"
              autoComplete="name"
              required
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? 'name-error' : undefined}
              className="min-h-11 w-full rounded-lg border border-stone-300 px-3 py-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-800"
            />
            {errors.name && <p id="name-error" className="mt-1 text-sm text-red-800">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="phone" className="mb-1.5 block text-sm font-semibold text-stone-800">
              Contact phone <span aria-hidden="true">*</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              required
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? 'phone-error' : 'phone-help'}
              className="min-h-11 w-full rounded-lg border border-stone-300 px-3 py-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-800"
            />
            <p id="phone-help" className="mt-1 text-xs text-stone-600">Include at least 7 digits.</p>
            {errors.phone && <p id="phone-error" className="mt-1 text-sm text-red-800">{errors.phone}</p>}
          </div>

          <div>
            <label htmlFor="address" className="mb-1.5 block text-sm font-semibold text-stone-800">
              Delivery address <span aria-hidden="true">*</span>
            </label>
            <textarea
              id="address"
              name="address"
              autoComplete="street-address"
              required
              rows={4}
              aria-invalid={Boolean(errors.address)}
              aria-describedby={errors.address ? 'address-error' : undefined}
              className="w-full rounded-lg border border-stone-300 px-3 py-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-800"
            />
            {errors.address && <p id="address-error" className="mt-1 text-sm text-red-800">{errors.address}</p>}
          </div>

          {errors.form && <p role="alert" className="text-sm font-medium text-red-800">{errors.form}</p>}

          <button
            type="submit"
            className="min-h-12 w-full rounded-lg bg-amber-900 px-5 py-3 font-semibold text-white transition hover:bg-amber-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-800"
          >
            Submit order request
          </button>
        </form>

        <aside className="h-fit rounded-2xl border border-stone-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-lg font-semibold text-stone-900">Order summary</h2>
          <ul className="mt-4 space-y-3">
            {items.map((item) => (
              <li key={item.id} className="flex justify-between gap-4 text-sm">
                <span className="text-stone-700">{item.name} × {item.quantity}</span>
                <span className="shrink-0 font-medium text-stone-900">
                  {currency.format(item.price * item.quantity)}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-5 flex justify-between border-t border-stone-200 pt-4 font-semibold text-stone-900">
            <span>Subtotal</span>
            <span>{currency.format(subtotal)}</span>
          </p>
          <Link
            href="/cart"
            className="mt-4 inline-block rounded-sm text-sm font-semibold text-amber-900 underline underline-offset-2 hover:text-amber-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-800"
          >
            Edit cart
          </Link>
        </aside>
      </div>
    </main>
  );
}
