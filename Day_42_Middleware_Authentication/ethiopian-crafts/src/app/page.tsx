import Link from 'next/link';
import ProductGrid from '@/components/ProductGrid';
import { products } from '@/data/products';

export default function HomePage() {
  const featuredProducts = products.slice(0, 4);

  return (
    <main>
      <section className="relative overflow-hidden bg-gradient-to-br from-[#f2d8b8] via-[#ecc39b] to-[#dda078] text-[#35231a]">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:px-8 lg:py-24">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#74391f]">
              Made by hand, rooted in heritage
            </p>
            <h1 className="mt-4 max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              A little piece of Ethiopia for your home.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-[#52372a] sm:text-lg">
              Explore thoughtfully made baskets, pottery, jewelry, and textiles from Ethiopian craft traditions.
            </p>
            <Link
              href="/products"
              className="mt-8 inline-flex min-h-12 items-center justify-center rounded-lg bg-[#74391f] px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-[#542719] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#542719]"
            >
              Browse products
            </Link>
          </div>
          <div className="rounded-3xl border border-white/70 bg-[#fffaf3]/75 p-8 shadow-lg backdrop-blur-sm sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8a4728]">Our promise</p>
            <p className="mt-4 text-2xl font-semibold leading-snug">
              Useful objects, lasting craft, and a story in every detail.
            </p>
            <p className="mt-4 leading-7 text-[#625044]">
              Browse the collection, choose your favorites, and send a simple order request. No payment details are collected.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="featured-heading" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-800">Selected for you</p>
            <h2 id="featured-heading" className="mt-2 text-3xl font-bold tracking-tight text-stone-900">
              Featured crafts
            </h2>
          </div>
          <Link
            href="/products"
            className="rounded-sm font-semibold text-amber-900 underline decoration-amber-400 underline-offset-4 hover:text-amber-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-800"
          >
            View the full collection
          </Link>
        </div>
        <ProductGrid products={featuredProducts} />
      </section>
    </main>
  );
}