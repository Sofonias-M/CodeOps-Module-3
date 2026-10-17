import Link from 'next/link';
import ProductGrid from '@/components/ProductGrid';
import { products } from '@/data/products';

interface ProductsPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const { category: selectedCategory } = await searchParams;
  const categories = [...new Set(products.map((product) => product.category))].sort();
  const activeCategory = categories.find(
    (category) => category.toLowerCase() === selectedCategory?.toLowerCase()
  );
  const visibleProducts = activeCategory
    ? products.filter((product) => product.category === activeCategory)
    : products;

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-800">The collection</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
          Ethiopian crafts, made to be kept
        </h1>
        <p className="mt-3 leading-7 text-stone-600">
          Explore small-batch pieces across four traditional craft categories.
        </p>
      </div>

      <nav aria-label="Filter products by category" className="my-7 flex flex-wrap gap-2">
        <Link
          href="/products"
          aria-current={!activeCategory ? 'page' : undefined}
          className={`rounded-full border px-4 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-800 ${
            !activeCategory
              ? 'border-amber-900 bg-amber-900 text-white'
              : 'border-stone-300 bg-white text-stone-700 hover:bg-stone-100'
          }`}
        >
          All products
        </Link>
        {categories.map((category) => {
          const isActive = category === activeCategory;
          return (
            <Link
              key={category}
              href={`/products?category=${encodeURIComponent(category)}`}
              aria-current={isActive ? 'page' : undefined}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-800 ${
                isActive
                  ? 'border-amber-900 bg-amber-900 text-white'
                  : 'border-stone-300 bg-white text-stone-700 hover:bg-stone-100'
              }`}
            >
              {category}
            </Link>
          );
        })}
      </nav>

      <p className="mb-4 text-sm text-stone-600" aria-live="polite">
        Showing {visibleProducts.length} {activeCategory ? `${activeCategory.toLowerCase()} ` : ''}crafts
      </p>
      <ProductGrid products={visibleProducts} />
    </main>
  );
}
