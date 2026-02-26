import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { CartDrawer } from "../cart/CartDrawer";
import { ReactNode } from "react";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col w-full relative">
      <Navbar />
      <main className="flex-1 w-full flex flex-col">{children}</main>
      <Footer />
      <CartDrawer />
    </div>
  );
}
