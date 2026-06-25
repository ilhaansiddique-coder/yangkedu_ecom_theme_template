import type { Metadata, Viewport } from "next";
import { Didact_Gothic, Poppins } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart";
import { AuthProvider } from "@/lib/auth";
import { FavoritesProvider } from "@/lib/favorites";
import { OrdersProvider } from "@/lib/orders";
import { AddressProvider } from "@/lib/addresses";
import AppShell from "@/components/AppShell";

// Didact Gothic — free Century Gothic look-alike. Body text (--font-sans).
// Only ships a 400 weight, so it's used where a single weight is fine.
const centuryGothic = Didact_Gothic({
  variable: "--font-century",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

// Poppins — real graduated weights for headings / prices / logo (--font-display),
// so the bold hierarchy actually renders instead of faux-bolding one weight.
const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Yangkedu — Group-buy deals, cheaper together",
  description: "Group-buy deals storefront — a Pinduoduo-style shopping demo (mobile + web).",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#e22e1f",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${centuryGothic.variable} ${poppins.variable} h-full antialiased`}>
      <body className="min-h-full" suppressHydrationWarning>
        <AuthProvider>
          <AddressProvider>
            <OrdersProvider>
              <FavoritesProvider>
                <CartProvider>
                  <AppShell>{children}</AppShell>
                </CartProvider>
              </FavoritesProvider>
            </OrdersProvider>
          </AddressProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
