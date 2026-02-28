import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { MENU_DATA } from "@shared/menu-data";

export default function About() {
  const { about } = MENU_DATA;

  return (
    <div className="pt-28 pb-24 min-h-screen bg-white">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-5xl md:text-6xl font-bold mb-6 text-[hsl(var(--primary))]"
          >
            {about.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 leading-relaxed italic"
          >
            "Crafted for True Dessert Lovers"
          </motion.p>
        </div>
        
        <div className="w-full h-[50vh] min-h-[400px] rounded-3xl overflow-hidden shadow-2xl relative">
          <img 
            src="https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=1200" 
            alt="Frocone Creamery"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Values Grid */}
      <section className="bg-[hsl(var(--background))] py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-3xl font-bold mb-6">Our Philosophy</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                {about.content}
              </p>
              <div className="bg-white p-8 rounded-3xl shadow-soft">
                <ul className="space-y-4">
                  {about.values.map((value, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-[hsl(var(--primary))]" />
                      <span className="font-medium text-gray-800">{value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-center p-12 bg-[hsl(var(--primary))]/5 rounded-3xl border-2 border-dashed border-[hsl(var(--primary))]/20"
            >
              <p className="text-2xl font-display text-[hsl(var(--primary))] italic leading-relaxed">
                "{about.closing}"
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
