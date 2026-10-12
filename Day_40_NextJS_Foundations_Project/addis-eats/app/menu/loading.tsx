"use client";

export default function LoadingMenu() {
  return (
    <main className="shell page-main" aria-label="Loading menu">
      <div className="loading-skeleton loading-title" />
      <div className="loading-grid">
        <div className="loading-skeleton" /><div className="loading-skeleton" /><div className="loading-skeleton" />
      </div>
    </main>
  );
}