import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./cart-provider";
import SiteHeader from "./site-header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Addis Eats | Good food, good company",
    template: "%s | Addis Eats",
  },
  description:
    "Gather around for Ethiopian favourites, fresh injera and a table made for sharing at Addis Eats.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <CartProvider>
          <SiteHeader />
          {children}
          <footer className="site-footer">
            <div className="shell footer-inner">
              <span>Addis Eats <span aria-hidden="true">✳</span></span>
              <span>Good food. Good company. Always.</span>
              <a href="mailto:hello@addiseats.example">Say hello ↗</a>
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
