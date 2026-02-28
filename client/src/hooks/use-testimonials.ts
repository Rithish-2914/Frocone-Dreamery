import { type TestimonialResponse } from "@shared/schema";

const testimonialsData: TestimonialResponse[] = [
  {
    id: 1,
    customerName: "Chocolate Lover",
    rating: 5,
    comment: "Honestly one of the best dessert spots in Madhapur. The Sizzling Brownie was perfectly warm and the ice cream melted just right. Super fresh and worth every rupee!",
    avatar: null,
    isVerified: true,
    createdAt: new Date()
  },
  {
    id: 2,
    customerName: "Dessert Enthusiast",
    rating: 5,
    comment: "Death By Chocolate is not a name, it’s a warning 😭🍫 So rich and indulgent. If you’re a chocolate lover, this place is heaven.",
    avatar: null,
    isVerified: true,
    createdAt: new Date()
  },
  {
    id: 3,
    customerName: "Fusion Fan",
    rating: 5,
    comment: "Loved the Rose Cardamom flavour! It’s rare to find fusion ice creams that actually taste authentic. Frocone nailed it.",
    avatar: null,
    isVerified: true,
    createdAt: new Date()
  },
  {
    id: 4,
    customerName: "Techie at HITEC City",
    rating: 5,
    comment: "Nutella Brownie Thickshake is next level. Thick, creamy and filling. Perfect after office hours in HITEC City.",
    avatar: null,
    isVerified: true,
    createdAt: new Date()
  },
  {
    id: 5,
    customerName: "Budget Gourmet",
    rating: 5,
    comment: "Affordable and premium at the same time. Scoops starting at ₹99 but quality feels top-tier.",
    avatar: null,
    isVerified: true,
    createdAt: new Date()
  },
  {
    id: 6,
    customerName: "Biscoff Addict",
    rating: 5,
    comment: "Lotus Biscoff Sundae was absolutely delicious. Not overly sweet, just balanced and satisfying.",
    avatar: null,
    isVerified: true,
    createdAt: new Date()
  },
  {
    id: 7,
    customerName: "Group Hangout",
    rating: 5,
    comment: "Perfect hangout spot with friends. So many flavours and toppings to choose from. Customization makes it fun.",
    avatar: null,
    isVerified: true,
    createdAt: new Date()
  },
  {
    id: 8,
    customerName: "Summer Refugee",
    rating: 5,
    comment: "Tried Mango and Coconut scoops — super refreshing in Hyderabad heat. Definitely coming back.",
    avatar: null,
    isVerified: true,
    createdAt: new Date()
  },
  {
    id: 9,
    customerName: "Fruit Lover",
    rating: 5,
    comment: "The Classic Banana Split is HUGE and worth sharing. Presentation was amazing too!",
    avatar: null,
    isVerified: true,
    createdAt: new Date()
  },
  {
    id: 10,
    customerName: "Local Resident",
    rating: 5,
    comment: "Service was quick, staff was friendly, and desserts were fresh. Madhapur needed a place like this.",
    avatar: null,
    isVerified: true,
    createdAt: new Date()
  },
  {
    id: 11,
    customerName: "Shake Specialist",
    rating: 5,
    comment: "Chocolate Thickshake was smooth and rich without being too heavy. Perfect balance.",
    avatar: null,
    isVerified: true,
    createdAt: new Date()
  }
];

export function useTestimonials() {
  return { data: testimonialsData, isLoading: false };
}
