import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import AddToCartButton from '@/components/AddToCartButton';
import { products } from '@/data/products';

export function generateStaticParams() {
  return products.map(({ id }) => ({ id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = products.find((item) => item.id === id);
  return { title: product?.name ?? 'Product not found' };
}

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = products.find((item) => item.id === id);

  if (!product) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
      <Link
        href="/products"
        className="rounded-sm font-semibold text-amber-900 underline underline-offset-4 hover:text-amber-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-800"
      >
        Back to collection
      </Link>
      <article className="mt-6 grid gap-8 md:grid-cols-2 md:items-center">
        <div className="relative aspect-square overflow-hidden rounded-3xl bg-stone-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div className="py-4">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-800">{product.category}</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">{product.name}</h1>
          <p className="mt-5 text-lg leading-8 text-stone-600">{product.description}</p>
          <p className="mt-6 text-2xl font-bold text-stone-900">${product.price.toFixed(2)}</p>
          <p className={`mt-3 text-sm font-semibold ${product.available ? 'text-emerald-800' : 'text-red-800'}`}>
            {product.available ? 'Available to order' : 'Currently out of stock'}
          </p>
          <div className="mt-6 max-w-sm">
            <AddToCartButton product={product} />
          </div>
        </div>
      </article>
    </main>
  );
}
