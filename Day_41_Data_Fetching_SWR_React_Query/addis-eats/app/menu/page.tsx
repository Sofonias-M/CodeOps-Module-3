"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "../cart-provider";
import { formatPrice, menuItems } from "../menu-data";

const categories = ["Everything", "Sharing platters", "Vegetarian", "House favourites"] as const;

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>("Everything");
  const { addItem } = useCart();
  const visibleItems =
    activeCategory === "Everything"
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory);

  return (
    <main className="shell page-main">
      <div className="page-intro menu-intro">
        <p className="eyebrow">Cooked slowly, shared generously</p>
        <h1>Pull up a chair.<br /><em>There&apos;s plenty.</em></h1>
        <p>Choose a favourite or try a little of everything. Every dish comes with fresh injera and a place at our table.</p>
      </div>
      <div className="menu-toolbar">
        <div className="category-tabs" aria-label="Filter menu by category">
          {categories.map((category) => (
            <button
              className={`category-tab${activeCategory === category ? " is-active" : ""}`}
              key={category}
              onClick={() => setActiveCategory(category)}
              type="button"
            >
              {category}
            </button>
          ))}
        </div>
        <span className="menu-count">{visibleItems.length} dishes, made with care</span>
      </div>
      <div className="menu-grid">
        {visibleItems.map((item, index) => (
          <article className="menu-card" key={item.id}>
            <Link href={`/menu/${item.id}`} className={`food-image food-image-${(index % 3) + 1}`}>
              <Image src={item.image} alt={item.name} fill unoptimized sizes="(max-width: 700px) 90vw, 30vw" />
              {item.tag && <span className="food-tag">{item.tag}</span>}
              <span className="image-arrow" aria-hidden="true">↗</span>
            </Link>
            <div className="menu-card-content">
              <div className="menu-card-heading"><h2><Link href={`/menu/${item.id}`}>{item.name}</Link></h2><strong>{formatPrice(item.price)}</strong></div>
              <p>{item.description}</p>
              <div className="menu-card-bottom">
                <span>{item.serves}</span>
                <button className="add-button" onClick={() => addItem(item)} type="button" aria-label={`Add ${item.name} to bag`}>+ Add to bag</button>
              </div>
            </div>
          </article>
        ))}
      </div>
      <aside className="menu-note"><span aria-hidden="true">✳</span><p>Not sure where to start? <strong>The Addis sharing platter</strong> is a little taste of everything.</p></aside>
    </main>
  );
}