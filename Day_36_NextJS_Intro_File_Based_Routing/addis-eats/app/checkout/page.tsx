"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useCart } from "../cart-provider";
import { formatPrice } from "../menu-data";

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const [orderType, setOrderType] = useState<"delivery" | "pickup">("delivery");
  const [complete, setComplete] = useState(false);

  function placeOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (items.length === 0) return;
    clearCart();
    setComplete(true);
  }

  if (complete) {
    return (
      <main className="shell page-main">
        <section className="empty-state checkout-success">
          <span className="empty-mark" aria-hidden="true">✓</span>
          <p className="eyebrow">You have excellent taste</p>
          <h1>Thanks for sharing a meal with us.</h1>
          <p>Your demo order is complete. This checkout is a front-end preview and hasn&apos;t sent an order to the restaurant.</p>
          <Link className="button button-dark" href="/menu">Back to the menu <span aria-hidden="true">↗</span></Link>
        </section>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="shell page-main">
        <section className="empty-state">
          <span className="empty-mark" aria-hidden="true">✳</span>
          <h1>Your bag is waiting to be filled.</h1>
          <p>Add a few things from the menu before heading to checkout.</p>
          <Link className="button button-dark" href="/menu">Explore the menu <span aria-hidden="true">↗</span></Link>
        </section>
      </main>
    );
  }

  const deliveryFee = orderType === "delivery" ? 50 : 0;

  return (
    <main className="shell page-main checkout-page">
      <div className="page-intro compact-intro"><p className="eyebrow">Almost time to eat</p><h1>Let&apos;s get <em>you sorted.</em></h1></div>
      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={placeOrder}>
          <fieldset className="order-type">
            <legend>How would you like it?</legend>
            <label className={orderType === "delivery" ? "choice-card is-selected" : "choice-card"}>
              <input checked={orderType === "delivery"} name="orderType" onChange={() => setOrderType("delivery")} type="radio" />
              <span><strong>Bring it to me</strong><small>Delivery · {formatPrice(50)}</small></span>
            </label>
            <label className={orderType === "pickup" ? "choice-card is-selected" : "choice-card"}>
              <input checked={orderType === "pickup"} name="orderType" onChange={() => setOrderType("pickup")} type="radio" />
              <span><strong>I&apos;ll pick it up</strong><small>Ready in about 25 minutes · Free</small></span>
            </label>
          </fieldset>
          <div className="form-section">
            <h2>Your details</h2>
            <label className="form-field">Full name<input autoComplete="name" name="name" placeholder="Your name" required /></label>
            <label className="form-field">Phone number<input autoComplete="tel" name="phone" placeholder="+251" required type="tel" /></label>
            {orderType === "delivery" && <label className="form-field">Delivery address<input autoComplete="street-address" name="address" placeholder="Street, neighbourhood, Addis Ababa" required /></label>}
            <label className="form-field">A note for our kitchen <span className="optional-label">(optional)</span><textarea name="note" placeholder="Allergies, spice preferences, or anything else..." rows={3} /></label>
          </div>
          <button className="button button-dark place-order-button" type="submit">Place demo order <span aria-hidden="true">↗</span></button>
          <p className="demo-notice">This is a front-end preview; submitting won&apos;t send a real order or payment.</p>
        </form>
        <aside className="order-summary checkout-summary">
          <p className="eyebrow">For the table</p>
          <h2>Your order</h2>
          {items.map(({ item, quantity }) => <div className="summary-row" key={item.id}><span>{item.name} <small>× {quantity}</small></span><strong>{formatPrice(item.price * quantity)}</strong></div>)}
          <div className="summary-row"><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div>
          <div className="summary-row"><span>{orderType === "delivery" ? "Delivery" : "Pickup"}</span><strong>{orderType === "delivery" ? formatPrice(deliveryFee) : "Free"}</strong></div>
          <div className="summary-total"><span>Total</span><strong>{formatPrice(subtotal + deliveryFee)}</strong></div>
          <Link className="text-link" href="/cart">← Back to your bag</Link>
        </aside>
      </div>
    </main>
  );
}