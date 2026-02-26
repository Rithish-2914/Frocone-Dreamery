import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";
import type { TestimonialsListResponse } from "@shared/schema";

export function useTestimonials() {
  return useQuery({
    queryKey: [api.testimonials.list.path],
    queryFn: async () => {
      const res = await fetch(api.testimonials.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch testimonials");
      
      const data = await res.json();
      return data as TestimonialsListResponse;
    },
  });
}
