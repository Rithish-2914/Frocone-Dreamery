import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Plus, Sparkles } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import { useCart } from "@/store/use-cart";
import { Button } from "./Button";
import type { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const addItem = useCart(state => state.addItem);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-white rounded-3xl p-4 shadow-soft hover:shadow-hover transition-shadow duration-500 border border-white/50 flex flex-col h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badges */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        {product.isTrending && (
          <span className="bg-orange-100 text-orange-600 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
            <Sparkles className="w-3 h-3" /> Trending
          </span>
        )}
        {product.badge && (
          <span className="bg-[hsl(var(--primary))] text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
            {product.badge}
          </span>
        )}
      </div>

      {/* Image Container */}
      <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-[hsl(var(--background))] mb-4 flex-shrink-0">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        
        {/* Flavor Notes Overlay */}
        <AnimatePresence>
          {isHovered && product.flavorNotes && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute inset-0 bg-white/80 backdrop-blur-sm p-4 flex items-center justify-center text-center"
            >
              <div>
                <p className="font-display text-[hsl(var(--primary))] text-lg mb-2">Flavor Profile</p>
                <p className="text-sm font-medium text-gray-600 leading-relaxed text-balance">
                  {product.flavorNotes}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2 gap-2">
          <h3 className="font-display text-xl font-bold text-[hsl(var(--foreground))] line-clamp-2">
            {product.name}
          </h3>
          <span className="font-bold text-[hsl(var(--primary))] text-lg bg-[hsl(var(--primary))/0.1] px-2 py-1 rounded-lg">
            {formatPrice(product.price)}
          </span>
        </div>
        
        <p className="text-sm text-gray-500 mb-6 flex-grow line-clamp-2">
          {product.description}
        </p>
        <Button 
          onClick={() => window.open(`https://wa.me/919100192750?text=I'm interested in ordering ${product.name}`, '_blank')}
          className="w-full mt-auto" 
          variant="primary"
        >
          Order Now
        </Button>
      </div>
    </motion.div>
  );
}
