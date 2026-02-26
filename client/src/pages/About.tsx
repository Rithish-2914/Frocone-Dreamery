import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="pt-28 pb-24 min-h-screen bg-white">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">More Than Just Dessert</h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Frocone Creamery was born out of a simple desire: to bring genuine, artisanal, and uncompromisingly delicious ice cream to the people of Madhapur.
          </p>
        </div>
        
        <div className="w-full h-[50vh] min-h-[400px] rounded-3xl overflow-hidden shadow-2xl relative">
          {/* about hero artisanal ice cream making */}
          <img 
            src="https://pixabay.com/get/g7c5ef1d901ae1687a1db1afb1da138f2f6dae302b9fa021ded8343affcd6dc2e30d5493e1ffb9f140edc9c1f6d015bd7997ed49ad15bb87b869c1fbaff3b5b41_1280.jpg" 
            alt="Making Ice Cream"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Values Grid */}
      <section className="bg-[hsl(var(--background))] py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-20 h-20 mx-auto bg-pink-100 rounded-full flex items-center justify-center text-4xl mb-6 shadow-sm">
                🥛
              </div>
              <h3 className="font-display text-2xl font-bold mb-3">Pure & Real</h3>
              <p className="text-gray-600">No synthetic colors, no artificial flavors, and definitely no vegetable oils. Just pure milk, real cream, and authentic ingredients.</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="w-20 h-20 mx-auto bg-mint-100 rounded-full flex items-center justify-center text-4xl mb-6 shadow-sm">
                🤝
              </div>
              <h3 className="font-display text-2xl font-bold mb-3">Community First</h3>
              <p className="text-gray-600">We designed our Madhapur space to be a hub for connection. A place where families gather, friends laugh, and memories are made.</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <div className="w-20 h-20 mx-auto bg-yellow-100 rounded-full flex items-center justify-center text-4xl mb-6 shadow-sm">
                ✨
              </div>
              <h3 className="font-display text-2xl font-bold mb-3">Handcrafted Joy</h3>
              <p className="text-gray-600">Every waffle cone is rolled by hand. Every swirl is intentional. We put extraordinary care into every single scoop we serve.</p>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
}
