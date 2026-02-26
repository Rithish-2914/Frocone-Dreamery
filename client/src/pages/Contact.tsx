import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useSubmitContact } from "@/hooks/use-contact";

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const submitContact = useSubmitContact();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitContact.mutateAsync(formData);
      alert("Message sent successfully! We'll get back to you soon.");
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      alert("Failed to send message. Please try again later.");
    }
  };

  return (
    <div className="pt-28 pb-24 min-h-screen bg-[hsl(var(--background))]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-4">Say Hello!</h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Got a question about our flavors, bulk orders, or just want to chat? We'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          
          {/* Info Side */}
          <div className="space-y-10">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-white/50">
              <h3 className="font-display text-2xl font-bold mb-6">Visit Our Store</h3>
              
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-pink-50 rounded-full flex items-center justify-center text-[hsl(var(--primary))] flex-shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">Location</p>
                    <p className="text-gray-600">Shop No. 5, Premium Arcade, <br/>Madhapur, Hyderabad, Telangana 500081</p>
                  </div>
                </li>
                
                <li className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-mint-50 rounded-full flex items-center justify-center text-[hsl(var(--secondary))] flex-shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">Hours</p>
                    <p className="text-gray-600">Mon-Fri: 11:00 AM - 11:00 PM<br/>Sat-Sun: 10:00 AM - 12:00 AM</p>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-500 flex-shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">Phone</p>
                    <p className="text-gray-600">+91 98765 43210</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Map Placeholder */}
            <div className="w-full h-64 bg-gray-200 rounded-3xl overflow-hidden relative">
              <iframe 
                title="Google Maps"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.417066914565!2d78.38927877583688!3d17.44453890129718!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9158f201b205%3A0x11bbe7be7792411b!2sMadhapur%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                className="absolute inset-0 w-full h-full"
                style={{ border: 0 }}
                loading="lazy"
              ></iframe>
            </div>
          </div>

          {/* Form Side */}
          <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-hover border border-white/50">
            <h3 className="font-display text-2xl font-bold mb-6">Send a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                <input 
                  required
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[hsl(var(--primary))] outline-none transition-all"
                  placeholder="Jane Doe"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                  <input 
                    required
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[hsl(var(--primary))] outline-none transition-all"
                    placeholder="jane@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Phone</label>
                  <input 
                    type="tel"
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[hsl(var(--primary))] outline-none transition-all"
                    placeholder="+91 XXXXX"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Message</label>
                <textarea 
                  required
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                  rows={5}
                  className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[hsl(var(--primary))] outline-none transition-all resize-none"
                  placeholder="How can we help you?"
                />
              </div>
              
              <Button 
                type="submit" 
                size="lg" 
                className="w-full"
                isLoading={submitContact.isPending}
              >
                Send Message <Send className="ml-2 w-5 h-5" />
              </Button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
