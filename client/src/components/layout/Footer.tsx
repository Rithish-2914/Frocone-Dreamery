import { Link } from "wouter";
import { IceCream, Instagram, MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white pt-20 pb-10 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center shadow-soft">
                <img src="/logo.png" alt="Frocone Logo" className="w-full h-full object-cover" />
              </div>
              <span className="font-display text-2xl font-bold text-[hsl(var(--foreground))]">
                Frocone <span className="text-[hsl(var(--primary))]">.</span>
              </span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Every scoop hits different. Artisanal, handcrafted ice cream made with passion and premium ingredients in the heart of Hyderabad.
            </p>
            <div className="flex gap-4">
              <a href="https://instagram.com/frocone.creamery" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))] hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display text-lg font-bold mb-6">Explore</h4>
            <ul className="space-y-4">
              <li><Link href="/" className="text-gray-500 hover:text-[hsl(var(--primary))] transition-colors">Home</Link></li>
              <li><Link href="/menu" className="text-gray-500 hover:text-[hsl(var(--primary))] transition-colors">Menu</Link></li>
              <li><Link href="/about" className="text-gray-500 hover:text-[hsl(var(--primary))] transition-colors">Our Story</Link></li>
              <li><Link href="/offers" className="text-gray-500 hover:text-[hsl(var(--primary))] transition-colors">Offers</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg font-bold mb-6">Contact</h4>
            <ul className="space-y-4 text-gray-500">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[hsl(var(--primary))] flex-shrink-0 mt-0.5" />
                <span>Madhapur, Hyderabad,<br/>Telangana, India</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[hsl(var(--primary))] flex-shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[hsl(var(--primary))] flex-shrink-0" />
                <span>hello@froconecreamery.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg font-bold mb-6">Store Hours</h4>
            <ul className="space-y-4 text-gray-500">
              <li className="flex justify-between border-b border-gray-100 pb-2">
                <span>Mon - Fri</span>
                <span className="font-medium text-gray-800">11:00 AM - 11:00 PM</span>
              </li>
              <li className="flex justify-between border-b border-gray-100 pb-2">
                <span>Sat - Sun</span>
                <span className="font-medium text-gray-800">10:00 AM - 12:00 AM</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Frocone Creamery. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-[hsl(var(--primary))]">Privacy Policy</a>
            <a href="#" className="hover:text-[hsl(var(--primary))]">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
