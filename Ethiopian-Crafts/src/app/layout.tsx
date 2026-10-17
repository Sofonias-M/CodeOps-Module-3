import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import Link from 'next/link';
import CartLink from '@/components/CartLink';
import './globals.css';

const geist = Geist({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Ethiopian Crafts',
    template: '%s | Ethiopian Crafts',
  },
  description: 'Discover handcrafted baskets, pottery, jewelry, and textiles from Ethiopia.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geist.className} flex min-h-screen flex-col bg-[var(--bg-base)] text-stone-900 antialiased`}>
        <header className="border-b border-[#e7d8c8] bg-[#fffaf3] text-[#392a22] shadow-sm">
          <nav
            aria-label="Main navigation"
            className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8"
          >
            <Link
              href="/"
              className="rounded-sm text-lg font-bold tracking-tight text-[#542719] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a34324]"
            >
              Ethiopian Crafts
            </Link>
            <div className="flex items-center gap-1 sm:gap-3">
              <Link
                href="/products"
                className="rounded-lg px-3 py-2 text-sm font-semibold text-[#514238] transition hover:bg-[#f3e5d4] hover:text-[#542719] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a34324]"
              >
                Shop
              </Link>
              <CartLink />
            </div>
          </nav>
        </header>
        <div className="flex-1">{children}</div>
        <footer className="mt-auto border-t border-stone-200 bg-white/90">
          <p className="mx-auto max-w-7xl px-4 py-6 text-sm text-stone-600 sm:px-6 lg:px-8">
            Handcrafted with care. This demonstration store does not process payments.
          </p>
        </footer>
      </body>
    </html>
  );
}
