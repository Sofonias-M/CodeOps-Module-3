import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center px-4 py-16 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-800">Not found</p>
      <h1 className="mt-2 text-3xl font-bold text-stone-900">We could not find that craft.</h1>
      <p className="mt-3 text-stone-600">The product may have moved or is no longer in this collection.</p>
      <Link
        href="/products"
        className="mt-6 inline-flex min-h-11 items-center justify-center rounded-lg bg-amber-900 px-5 py-2.5 font-semibold text-white transition hover:bg-amber-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-800"
      >
        Browse the collection
      </Link>
    </main>
  );
}
