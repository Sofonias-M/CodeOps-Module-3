"use client";

import Link from "next/link";

export default function MenuError({ reset }: { reset: () => void }) {
  return (
    <main className="shell page-main empty-state">
      <p className="eyebrow">Something went a little off menu</p>
      <h1>We couldn&apos;t load the menu.</h1>
      <p>Please try again. Your appetite deserves better than a blank page.</p>
      <div className="hero-actions">
        <button className="button button-dark" onClick={reset} type="button">Try again</button>
        <Link className="text-link" href="/">Go home</Link>
      </div>
    </main>
  );
}