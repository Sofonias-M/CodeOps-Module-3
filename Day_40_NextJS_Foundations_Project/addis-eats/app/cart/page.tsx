"use client";

import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "../menu-data";
import { useCart } from "../cart-provider";

export default function CartPage() {
  const { items, subtotal, changeQuantity, removeItem } = useCart();

  return (
    <main className="shell page-main cart-page">
      <div className="page-intro compact-intro">
        <p className="eyebrow">A little something for the table</p>
        <h1>Your <em>bag.</em></h1>
      </div>
      {items.length === 0 ? (
        <section className="empty-state">
          <span className="empty-mark" aria-hidden="true">✳</span>
          <h2>There&apos;s room for something delicious.</h2>
          <p>Your bag is empty for now. Browse the menu and find a new favourite.</p>
          <Link className="button button-dark" href="/menu">Explore the menu <span aria-hidden="true">↗</span></Link>
        </section>
      ) : (
        <div className="cart-layout">
          <section className="cart-lines" aria-label="Items in your bag">
            {items.map(({ item, quantity }) => (
              <article className="cart-line" key={item.id}>
                <Link className="cart-line-image" href={`/menu/${item.id}`}>
                  <Image src={item.image} alt={item.name} fill unoptimized sizes="112px" />
                </Link>
                <div className="cart-line-info">
                  <Link href={`/menu/${item.id}`}><h2>{item.name}</h2></Link>
                  <span>{formatPrice(item.price)} · {item.serves}</span>
                  <button className="remove-link" onClick={() => removeItem(item.id)} type="button">Remove</button>
                </div>
                <div className="quantity-control" aria-label={`Quantity for ${item.name}`}>
                  <button onClick={() => changeQuantity(item.id, quantity - 1)} type="button" aria-label={`Decrease ${item.name} quantity`}>−</button>
                  <span>{quantity}</span>
                  <button onClick={() => changeQuantity(item.id, quantity + 1)} type="button" aria-label={`Increase ${item.name} quantity`}>+</button>
                </div>
                <strong className="line-total">{formatPrice(item.price * quantity)}</strong>
              </article>
            ))}
            <Link className="text-link continue-link" href="/menu">← Keep exploring the menu</Link>
          </section>
          <aside className="order-summary">
            <p className="eyebrow">The little details</p>
            <h2>Order summary</h2>
            <div className="summary-row"><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div>
            <div className="summary-row"><span>Delivery</span><span>Calculated at checkout</span></div>
            <div className="summary-total"><span>Total</span><strong>{formatPrice(subtotal)}</strong></div>
            <Link className="button button-dark checkout-button" href="/checkout">Continue to checkout <span aria-hidden="true">↗</span></Link>
            <p className="summary-note">A little note about allergies? Tell us at checkout.</p>
          </aside>
        </div>
      )}
    </main>
  );
}