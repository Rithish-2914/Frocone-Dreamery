import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag, IceCream } from "lucide-react";
import { useCart } from "@/store/use-cart";
import { cn } from "@/lib/utils";

const links = [
  { name: "Home", href: "/" },
  { name: "Menu", href: "/menu" },
  { name: "Blogs", href: "/blogs" },
  { name: "Fests", href: "/fests" },
  { name: "FAQ", href: "/faq" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const { cartCount, setIsOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
          isScrolled ? "glass-nav py-3" : "bg-transparent py-5"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center shadow-soft group-hover:scale-110 transition-transform">
              <img src="/logo.png" alt="Frocone Logo" className="w-full h-full object-cover" />
            </div>
            <span className="font-display text-2xl font-bold text-[hsl(var(--foreground))] tracking-tight">
              Frocone <span className="text-[hsl(var(--primary))]">.</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className={cn(
                  "text-sm font-bold transition-colors hover:text-[hsl(var(--primary))]",
                  location === link.href ? "text-[hsl(var(--primary))]" : "text-gray-600"
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden p-2 text-gray-600"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-30 bg-white pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6 text-center">
              {links.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href}
                  className={cn(
                    "font-display text-3xl font-medium",
                    location === link.href ? "text-[hsl(var(--primary))]" : "text-gray-800"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            
            {/* Store details in mobile menu */}
            <div className="absolute bottom-10 left-0 right-0 text-center text-gray-500">
              <p className="font-bold mb-2">Visit Us</p>
              <p>Madhapur, Hyderabad</p>
              <p>11 AM - 11 PM Daily</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
