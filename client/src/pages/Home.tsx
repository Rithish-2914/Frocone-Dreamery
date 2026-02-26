import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Star, Instagram } from "lucide-react";
import { Button, MotionButton } from "@/components/ui/Button";
import { ProductCard } from "@/components/ui/ProductCard";
import { useProducts } from "@/hooks/use-products";
import { useTestimonials } from "@/hooks/use-testimonials";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const yHero = useTransform(scrollYProgress, [0, 1], [0, 300]);
  
  // Fetch bestsellers
  const { data: products = [], isLoading: productsLoading } = useProducts({ trending: true });
  const { data: testimonials = [], isLoading: testimonialsLoading } = useTestimonials();

  // Fallback mock data if API is empty
  const displayProducts = products.length > 0 ? products.slice(0, 4) : [
    { id: 1, name: "Velvet Strawberry", description: "Fresh strawberries blended with real cream.", price: "250", category: "Scoops", imageUrl: "https://images.unsplash.com/photo-1563805042-7684c8a9e9ce?w=800&q=80", flavorNotes: "Sweet, Tart, Creamy", isTrending: true },
    { id: 2, name: "Mint Choco Chip", description: "Cool mint with rich dark chocolate chunks.", price: "280", category: "Scoops", imageUrl: "https://images.unsplash.com/photo-1557142046-c704a3adf364?w=800&q=80", flavorNotes: "Refreshing, Rich", badge: "New" },
    { id: 3, name: "Golden Vanilla", description: "Classic Madagascar vanilla bean.", price: "200", category: "Scoops", imageUrl: "https://images.unsplash.com/photo-1570197571499-166b36435e9f?w=800&q=80" },
    { id: 4, name: "Caramel Crunch", description: "Salted caramel layered with waffle bits.", price: "320", category: "Sundaes", imageUrl: "https://images.unsplash.com/photo-1580915411954-282cb1b0d780?w=800&q=80", isTrending: true },
  ] as any;

  const displayTestimonials = testimonials.length > 0 ? testimonials : [
    { id: 1, customerName: "Rahul Sharma", rating: 5, comment: "Best ice cream in Madhapur! The waffle cones are insanely good." },
    { id: 2, customerName: "Priya Patel", rating: 5, comment: "Their strawberry velvet literally hits different. Instantly obsessed." },
    { id: 3, customerName: "Aarav Kumar", rating: 4, comment: "Great vibe, super Instagrammable place and the sundaes are massive." },
  ] as any;

  return (
    <div className="w-full overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-[hsl(var(--background))]">
        {/* Background elements */}
        <div className="absolute top-20 right-[-10%] w-[40vw] h-[40vw] bg-[hsl(var(--primary))]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-[-10%] w-[30vw] h-[30vw] bg-[hsl(var(--secondary))]/30 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Hero Text */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left pt-10 lg:pt-0"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="inline-block bg-white text-[hsl(var(--primary))] font-bold px-4 py-2 rounded-full shadow-sm mb-6 text-sm border border-[hsl(var(--primary))]/20"
            >
              🎉 Open in Madhapur, Hyderabad
            </motion.div>
            
            <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl font-bold text-[hsl(var(--foreground))] leading-[1.1] mb-6">
              Every Scoop <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[hsl(var(--primary))] to-pink-400">
                Hits Different
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-lg mx-auto lg:mx-0">
              Indulge in artisanal, handcrafted ice creams and sundaes that bring pure joy to every moment. Made fresh, meant to be shared.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/menu">
                <Button size="lg" className="w-full sm:w-auto text-lg">
                  Explore Flavours <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div 
            style={{ y: yHero }}
            className="relative lg:h-[600px] flex items-center justify-center"
          >
            {/* hero vibrant colorful ice cream cone */}
            <motion.img 
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              src="https://pixabay.com/get/g8caafb185e8bd405000a261ddabf27a20b3aabd26e50c5f6284fde6901a5d1190771d8fd224f4a77dc927c7d92f2f95ce305a3efa90de7c9302d25e7c77cbe4f_1280.jpg" 
              alt="Delicious Ice Cream Cone"
              className="w-full max-w-md mx-auto drop-shadow-2xl rounded-3xl object-cover aspect-[4/5] border-8 border-white"
            />
            
            {/* Floating Badges */}
            <motion.div 
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              className="absolute top-10 right-0 lg:-right-10 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-gray-100"
            >
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center text-2xl">
                🥛
              </div>
              <div>
                <p className="font-bold text-sm">100% Real Milk</p>
                <p className="text-xs text-gray-500">No artificial oils</p>
              </div>
            </motion.div>
          </motion.div>

        </div>

        {/* Custom SVG transition */}
        <div className="drip-divider">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C50.69,17.43,101.9,32.32,154.54,42.54c54.74,10.6,110.15,18.25,166.85,13.9Z" className="shape-fill" fill="#FFFFFF"></path>
          </svg>
        </div>
      </section>

      {/* BEST SELLERS SECTION */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">Crowd Favorites</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Our most loved flavors that keep people coming back. Have you tried them all?
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {displayProducts.map((product: any, idx: number) => (
              <ProductCard key={product.id} product={product} index={idx} />
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link href="/menu">
              <Button variant="outline" size="lg">
                View Full Menu
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* BRAND PROMISE PARALLAX */}
      <section className="relative py-32 overflow-hidden bg-[hsl(var(--primary))]/10">
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--primary))]/5 to-[hsl(var(--secondary))]/20" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">Made with Love, <br/>Served with Joy.</h2>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              We believe dessert isn't just food; it's an experience. That's why every scoop is handcrafted daily in our Madhapur kitchen using premium ingredients, real fruit purees, and absolute zero compromise.
            </p>
            <ul className="space-y-4 mb-10">
              {["Freshly churned in small batches", "Premium local & imported ingredients", "100% vegetarian & eggless options", "Perfectly crunchy homemade waffles"].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[hsl(var(--primary))] flex items-center justify-center text-white flex-shrink-0">
                    <Star className="w-3 h-3 fill-current" />
                  </div>
                  <span className="font-medium text-gray-800">{item}</span>
                </li>
              ))}
            </ul>
            <Link href="/about">
              <Button>Read Our Story</Button>
            </Link>
          </motion.div>
          
          <div className="relative h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl">
            {/* about brand promise gelato pouring */}
            <img 
              src="https://pixabay.com/get/ga505b6fa84c1f0fa0ee1bcfa91c7851dbd81292fa275cde22ea173e84a2122ac7556e430a1dc86610739fa48a12efba73599c99c49f7c177c713ad2d33f17749_1280.jpg" 
              alt="Making Ice Cream"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* IG GALLERY */}
      <section className="py-24 bg-white">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-4xl font-bold mb-2">Join the Club</h2>
          <p className="text-gray-500 mb-12">Tag <span className="font-bold text-[hsl(var(--primary))]">@frocone.creamery</span> to get featured!</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* IG placeholder images */}
            {["1501443762994-d476b338c667", "1557142046-c704a3adf364", "1514844306-df533c373a6a", "1497034825429-c343d706a524"].map((id, i) => (
              <motion.a
                href="https://instagram.com/frocone.creamery"
                target="_blank"
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative group aspect-square rounded-2xl overflow-hidden"
              >
                <img 
                  src={`https://images.unsplash.com/photo-${id}?w=600&h=600&fit=crop&q=80`} 
                  alt="Instagram Gallery" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-[hsl(var(--primary))]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Instagram className="w-10 h-10 text-white" />
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 bg-[hsl(var(--background))]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold">Sweet Words</h2>
          </div>
          
          <div className="grid sm:grid-cols-3 gap-8">
            {displayTestimonials.map((t: any, i: number) => (
              <div key={t.id} className="bg-white p-8 rounded-3xl shadow-soft text-center flex flex-col items-center">
                <div className="flex gap-1 mb-4 text-[hsl(var(--accent))]">
                  {[...Array(t.rating)].map((_, j) => <Star key={j} className="w-5 h-5 fill-current" />)}
                </div>
                <p className="text-gray-600 mb-6 italic">"{t.comment}"</p>
                <p className="font-bold font-display mt-auto">{t.customerName}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
