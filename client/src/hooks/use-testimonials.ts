import { type TestimonialResponse } from "@shared/schema";

const testimonialsData: TestimonialResponse[] = [
  {
    id: 1,
    customerName: "Priya Sharma",
    rating: 5,
    comment: "Best ice cream in Hyderabad! The mango tango is absolutely divine.",
    avatar: null,
    isVerified: true,
    createdAt: new Date()
  },
  {
    id: 2,
    customerName: "Rahul Mehta",
    rating: 5,
    comment: "The brownie sundae is heaven on a plate. Perfect spot for dessert dates!",
    avatar: null,
    isVerified: true,
    createdAt: new Date()
  }
];

export function useTestimonials() {
  return { data: testimonialsData, isLoading: false };
}
