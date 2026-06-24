import type { ReactNode } from "react";
import BottomTab from "./BottomTab";
import DesktopHeader from "./DesktopHeader";
import DesktopFooter from "./DesktopFooter";
import CartDrawer from "./CartDrawer";
import { CartUIProvider } from "@/lib/cart-ui";

/**
 * Responsive frame:
 *  - Mobile  → phone-width column (max 480px) + fixed bottom tab bar.
 *  - Desktop → full website layout: top header, centered 1450px content, footer.
 * Also hosts the global cart drawer (shared by header + tab bar triggers).
 */
export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <CartUIProvider>
      <div className="flex min-h-screen flex-col bg-canvas">
        <DesktopHeader />

        <div className="mx-auto w-full max-w-[480px] flex-1 bg-white lg:max-w-[1450px] lg:bg-canvas lg:px-4 lg:py-4">
          <main className="pb-[calc(56px+var(--safe-bottom))] lg:pb-0">{children}</main>
        </div>

        <DesktopFooter />
        <BottomTab />
        <CartDrawer />
      </div>
    </CartUIProvider>
  );
}
