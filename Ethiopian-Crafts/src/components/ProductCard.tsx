import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import AddToCartButton from '@/components/AddToCartButton';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <Link
        href={`/products/${product.id}`}
        className="group relative block aspect-[4/3] overflow-hidden bg-stone-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-800"
        aria-label={`View ${product.name}`}
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition duration-300 group-hover:scale-105"
        />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-amber-800">
          {product.category}
        </p>
        <h2 className="text-lg font-semibold text-stone-900">
          <Link href={`/products/${product.id}`} className="rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-800">
            {product.name}
          </Link>
        </h2>
        <p className="mt-2 flex-1 text-sm leading-6 text-stone-600">{product.description}</p>
        <div className="mt-5 flex items-center justify-between gap-3">
          <p className="text-lg font-semibold text-stone-900">${product.price.toFixed(2)}</p>
          <p className={`text-xs font-medium ${product.available ? 'text-emerald-800' : 'text-red-800'}`}>
            {product.available ? 'In stock' : 'Out of stock'}
          </p>
        </div>
        <div className="mt-4 flex flex-col gap-2">
          <AddToCartButton product={product} />
          <Link
            href={`/products/${product.id}`}
            className="rounded-lg border border-stone-300 px-4 py-2.5 text-center text-sm font-semibold text-stone-800 transition hover:bg-stone-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-800"
          >
            View details
          </Link>
        </div>
      </div>
    </article>
  );
}
