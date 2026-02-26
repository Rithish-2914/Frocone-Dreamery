import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/store/use-cart";
import { useCreateOrder } from "@/hooks/use-orders";
import { formatPrice } from "@/lib/utils";
import { Button } from "../ui/Button";

export function CartDrawer() {
  const { items, isOpen, setIsOpen, updateQuantity, removeItem, cartTotal, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const createOrder = useCreateOrder();
  
  // Form state
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', type: 'takeaway', instructions: ''
  });

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    try {
      await createOrder.mutateAsync({
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        orderType: formData.type,
        specialInstructions: formData.instructions,
        items: JSON.stringify(items),
        totalAmount: cartTotal().toString(),
      });
      
      clearCart();
      setIsCheckingOut(false);
      setIsOpen(false);
      alert("Order placed successfully! We'll contact you soon.");
    } catch (error) {
      alert("Failed to place order. Please try again.");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[hsl(var(--background))] shadow-2xl z-50 flex flex-col overflow-hidden rounded-l-3xl"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white">
              <h2 className="font-display text-2xl flex items-center gap-2">
                <ShoppingBag className="text-[hsl(var(--primary))]" />
                Your Sweet Cart
              </h2>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-50 space-y-4">
                  <ShoppingBag className="w-20 h-20 text-[hsl(var(--primary))]" />
                  <p className="font-display text-xl">Your cart is empty</p>
                  <p className="text-sm">Time to add some sweetness!</p>
                  <Button variant="outline" onClick={() => setIsOpen(false)}>
                    Browse Menu
                  </Button>
                </div>
              ) : isCheckingOut ? (
                <form id="checkout-form" onSubmit={handleCheckout} className="space-y-4 animate-in fade-in slide-in-from-right-4">
                  <h3 className="font-display text-xl mb-4">Delivery Details</h3>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input 
                      required 
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[hsl(var(--primary))] focus:ring-2 focus:ring-[hsl(var(--primary))/0.2] outline-none transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Phone</label>
                    <input 
                      required 
                      type="tel"
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[hsl(var(--primary))] focus:ring-2 focus:ring-[hsl(var(--primary))/0.2] outline-none transition-all"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input 
                      required 
                      type="email"
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[hsl(var(--primary))] focus:ring-2 focus:ring-[hsl(var(--primary))/0.2] outline-none transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Order Type</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['dine-in', 'takeaway', 'delivery'].map(type => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setFormData({...formData, type})}
                          className={cn(
                            "px-2 py-3 rounded-xl text-sm font-medium capitalize border transition-all",
                            formData.type === type 
                              ? "bg-[hsl(var(--primary))/0.1] border-[hsl(var(--primary))] text-[hsl(var(--primary))]" 
                              : "border-gray-200 hover:bg-gray-50"
                          )}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Special Instructions (Optional)</label>
                    <textarea 
                      value={formData.instructions}
                      onChange={e => setFormData({...formData, instructions: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[hsl(var(--primary))] focus:ring-2 focus:ring-[hsl(var(--primary))/0.2] outline-none transition-all resize-none"
                      placeholder="Extra sprinkles, less sugar..."
                      rows={3}
                    />
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  {items.map(item => (
                    <motion.div 
                      layout
                      key={item.productId}
                      className="flex gap-4 bg-white p-3 rounded-2xl shadow-sm border border-gray-100"
                    >
                      <img 
                        src={item.imageUrl} 
                        alt={item.name} 
                        className="w-20 h-20 object-cover rounded-xl bg-gray-50"
                      />
                      <div className="flex-1 flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                          <h4 className="font-bold font-display text-gray-800 line-clamp-1">{item.name}</h4>
                          <button 
                            onClick={() => removeItem(item.productId)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-[hsl(var(--primary))]">
                            {formatPrice(parseFloat(item.price) * item.quantity)}
                          </span>
                          
                          <div className="flex items-center gap-3 bg-gray-50 rounded-full px-2 py-1">
                            <button 
                              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                              className="w-6 h-6 rounded-full bg-white shadow-sm flex items-center justify-center hover:text-[hsl(var(--primary))]"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                              className="w-6 h-6 rounded-full bg-white shadow-sm flex items-center justify-center hover:text-[hsl(var(--primary))]"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 bg-white border-t border-gray-100 space-y-4 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span className="font-display">Total</span>
                  <span className="text-[hsl(var(--primary))] text-2xl">{formatPrice(cartTotal())}</span>
                </div>
                
                {isCheckingOut ? (
                  <div className="flex gap-3">
                    <Button 
                      variant="outline" 
                      onClick={() => setIsCheckingOut(false)}
                      className="w-full"
                    >
                      Back
                    </Button>
                    <Button 
                      type="submit" 
                      form="checkout-form"
                      isLoading={createOrder.isPending}
                      className="w-full"
                    >
                      Place Order
                    </Button>
                  </div>
                ) : (
                  <Button 
                    className="w-full text-lg" 
                    onClick={() => setIsCheckingOut(true)}
                  >
                    Proceed to Checkout <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
