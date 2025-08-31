import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { CartProvider } from "./contexts/cart-context";
import { Header } from "./components/layout/header";
import { ReactQueryProvider } from "./providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PizzaCraft",
  description: "Create custom pizzas with premium ingredients and get them delivered in 30 minutes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReactQueryProvider>
          <CartProvider>
            <Header />
            <main className="flex-1">
              {children}
            </main>
          </CartProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
