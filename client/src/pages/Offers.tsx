import { Link } from "wouter";
import { Clock, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Offers() {
  return (
    <div className="pt-28 pb-24 min-h-screen bg-[hsl(var(--background))]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-4">Sweet Deals</h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Because ice cream is always better when it comes with a little extra sweetness.
          </p>
        </div>

        {/* Hero Offer */}
        <div className="bg-gradient-to-r from-[hsl(var(--primary))] to-pink-400 rounded-3xl p-8 sm:p-12 text-white shadow-hover flex flex-col md:flex-row items-center justify-between gap-8 mb-16 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/20 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-bold backdrop-blur-sm mb-4 inline-block">
              Weekend Special
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">Buy 2, Get 1 Free!</h2>
            <p className="text-white/90 text-lg max-w-md mb-6">
              Mix and match any of our signature scoops. Bring a friend, or keep the third one for yourself (we won't judge).
            </p>
            <div className="flex items-center gap-2 text-white/80 font-bold mb-8">
              <Clock className="w-5 h-5" /> Valid till Sunday, 11 PM
            </div>
            <Link href="/menu">
              <Button variant="glass" size="lg" className="text-[hsl(var(--primary))] bg-white hover:bg-gray-50 border-none font-bold">
                Order Now
              </Button>
            </Link>
          </div>
          
          <div className="relative z-10 w-full md:w-1/3 aspect-square max-w-[300px]">
            {/* colorful scoops */}
            <img 
              src="https://images.unsplash.com/photo-1557142046-c704a3adf364?w=600&q=80" 
              alt="Ice Cream Scops"
              className="w-full h-full object-cover rounded-full border-8 border-white/30 shadow-2xl"
            />
          </div>
        </div>

        {/* Combo Cards */}
        <h3 className="font-display text-3xl font-bold mb-8 text-center">Everyday Combos</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {[
            { title: "Date Night Duo", desc: "2 Signature Sundaes + 2 Bottles of Water", price: "₹750", oldPrice: "₹900", tag: "Save 15%" },
            { title: "Family Fiesta", desc: "4 Single Scoops + 4 Waffle Cones + Toppings", price: "₹999", oldPrice: "₹1200", tag: "Save 20%" },
            { title: "Waffle Wednesday", desc: "Any 2 Belgian Waffles at a special price", price: "₹499", oldPrice: "₹600", tag: "Wednesdays Only" }
          ].map((combo, i) => (
            <div key={i} className="bg-white rounded-3xl p-8 shadow-soft border border-gray-100 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div className="bg-[hsl(var(--secondary))] text-[hsl(var(--foreground))] px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  <Tag className="w-3 h-3" /> {combo.tag}
                </div>
              </div>
              <h4 className="font-display text-2xl font-bold mb-2">{combo.title}</h4>
              <p className="text-gray-500 mb-6 flex-grow">{combo.desc}</p>
              
              <div className="flex items-end gap-3 mb-6">
                <span className="text-3xl font-bold text-[hsl(var(--primary))]">{combo.price}</span>
                <span className="text-lg text-gray-400 line-through mb-1">{combo.oldPrice}</span>
              </div>
              
              <Link href="/menu" className="w-full mt-auto">
                <Button variant="outline" className="w-full">Redem Offer</Button>
              </Link>
            </div>
          ))}

        </div>

      </div>
    </div>
  );
}
