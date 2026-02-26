import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProducts } from "@/hooks/use-products";
import { ProductCard } from "@/components/ui/ProductCard";
import { Button } from "@/components/ui/Button";

const CATEGORIES = ["All", "Scoops", "Sundaes", "Shakes", "Waffles", "Brownies"];

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState("All");
  const { data: products = [], isLoading } = useProducts({ 
    category: activeCategory === "All" ? undefined : activeCategory 
  });

  // Mock data if empty
  const displayProducts = products.length > 0 ? products : [
    { id: 1, name: "Velvet Strawberry", description: "Fresh strawberries blended with real cream.", price: "250", category: "Scoops", imageUrl: "https://images.unsplash.com/photo-1563805042-7684c8a9e9ce?w=800&q=80" },
    { id: 2, name: "Mint Choco Chip", description: "Cool mint with rich dark chocolate chunks.", price: "280", category: "Scoops", imageUrl: "https://images.unsplash.com/photo-1557142046-c704a3adf364?w=800&q=80" },
    { id: 3, name: "Death by Chocolate Sundae", description: "Three layers of chocolate joy.", price: "450", category: "Sundaes", imageUrl: "https://images.unsplash.com/photo-1580915411954-282cb1b0d780?w=800&q=80" },
    { id: 4, name: "Classic Belgian Waffle", description: "Crispy waffle with maple syrup and vanilla.", price: "300", category: "Waffles", imageUrl: "https://images.unsplash.com/photo-1562376552-0d160a2f9fa4?w=800&q=80" },
    { id: 5, name: "Oreo Mud Shake", description: "Thick shake blended with oreos and cream.", price: "350", category: "Shakes", imageUrl: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800&q=80" },
    { id: 6, name: "Fudge Brownie", description: "Warm, gooey, melt-in-your-mouth brownie.", price: "180", category: "Brownies", imageUrl: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&q=80" },
  ].filter(p => activeCategory === "All" || p.category === activeCategory) as any;

  return (
    <div className="pt-28 pb-24 min-h-screen bg-[hsl(var(--background))]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-4">Our Menu</h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Discover a world of creamy perfection. Filter by your cravings.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2.5 rounded-full font-bold transition-all duration-300 ${
                activeCategory === category 
                  ? "bg-[hsl(var(--primary))] text-white shadow-soft" 
                  : "bg-white text-gray-600 hover:bg-pink-50"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse bg-white p-4 rounded-3xl h-[400px]">
                <div className="w-full aspect-square bg-gray-100 rounded-2xl mb-4"></div>
                <div className="h-6 bg-gray-100 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-100 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
              {displayProducts.map((product: any, idx: number) => (
                <ProductCard key={product.id} product={product} index={idx} />
              ))}
            </motion.div>
          </AnimatePresence>
        )}
        
        {displayProducts.length === 0 && !isLoading && (
          <div className="text-center py-20">
            <h3 className="text-2xl font-display text-gray-400">No items found in this category.</h3>
          </div>
        )}

      </div>
    </div>
  );
}
