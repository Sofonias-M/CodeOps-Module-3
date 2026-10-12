"use client";

import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { useState } from "react";
import { useCart } from "../../cart-provider";
import { formatPrice, menuItems } from "../../menu-data";

export default function MenuItemPage() {
  const params = useParams<{ id: string }>();
  const item = menuItems.find((menuItem) => menuItem.id === params.id);
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  if (!item) notFound();

  function addToBag() {
    if (item) {
      addItem(item);
      setAdded(true);
    }
  }

  return (
    <main className="shell page-main dish-page">
      <div className="breadcrumbs"><Link href="/">Home</Link><span>/</span><Link href="/menu">Menu</Link><span>/</span><span>{item.name}</span></div>
      <div className="dish-layout">
        <div className="dish-photo">
          <Image src={item.image} alt={item.name} fill priority unoptimized sizes="(max-width: 800px) 90vw, 55vw" />
          {item.tag && <span className="food-tag">{item.tag}</span>}
        </div>
        <div className="dish-details">
          <p className="eyebrow">{item.category}</p>
          <h1>{item.name}</h1>
          <p className="dish-description">{item.description}</p>
          <div className="dish-meta"><span>Made fresh to order</span><span>{item.serves}</span></div>
          <div className="dish-order-row"><strong>{formatPrice(item.price)}</strong><button className="button button-dark" onClick={addToBag} type="button">{added ? "Added to your bag ✓" : "Add to bag"} <span aria-hidden="true">↗</span></button></div>
          <p className="dish-footnote">Served with fresh injera. Please let us know about any allergies when ordering.</p>
          <Link className="text-link" href="/menu">← Back to all dishes</Link>
        </div>
      </div>
      <section className="more-dishes">
        <div className="section-heading"><div><p className="eyebrow">A little more to love</p><h2>Goes well <em>with</em></h2></div><Link className="text-link" href="/menu">View all dishes ↗</Link></div>
        <div className="suggestion-list">{menuItems.filter((menuItem) => menuItem.id !== item.id).slice(0, 3).map((menuItem) => <Link href={`/menu/${menuItem.id}`} key={menuItem.id}><span>{menuItem.name}</span><strong>{formatPrice(menuItem.price)} ↗</strong></Link>)}</div>
      </section>
    </main>
  );
}