"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "./cart-provider";

export default function SiteHeader() {
  const { itemCount } = useCart();

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="brand" href="/" aria-label="Addis Eats home">
          <Image
            src="/Addis_Eats_Logo-2.jpg"
            alt=""
            width={148}
            height={64}
            priority
          />
        </Link>
        <nav className="main-nav" aria-label="Main navigation">
          <Link href="/menu">Our menu</Link>
          <Link href="/#story">Our story</Link>
          <Link href="/#visit">Find us</Link>
        </nav>
        <Link className="header-cart" href="/cart">
          <span aria-hidden="true">Bag</span>
          <span className="cart-count" aria-label={`${itemCount} items in bag`}>
            {itemCount}
          </span>
        </Link>
      </div>
    </header>
  );
}
