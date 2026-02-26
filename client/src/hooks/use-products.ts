import { useQuery } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import type { Product, ProductsListResponse } from "@shared/schema";

export function useProducts(params?: { category?: string; special?: boolean; trending?: boolean }) {
  return useQuery({
    queryKey: [api.products.list.path, params],
    queryFn: async () => {
      const urlParams = new URLSearchParams();
      if (params?.category && params.category !== 'All') urlParams.append('category', params.category);
      if (params?.special) urlParams.append('special', 'true');
      if (params?.trending) urlParams.append('trending', 'true');
      
      const url = `${api.products.list.path}${urlParams.toString() ? `?${urlParams.toString()}` : ''}`;
      const res = await fetch(url, { credentials: "include" });
      
      if (!res.ok) throw new Error("Failed to fetch products");
      
      // We know responses[200] is an array, we cast for safety
      const data = await res.json();
      return data as ProductsListResponse;
    },
  });
}

export function useProduct(id: number) {
  return useQuery({
    queryKey: [api.products.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.products.get.path, { id });
      const res = await fetch(url, { credentials: "include" });
      
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch product");
      
      const data = await res.json();
      return data as Product;
    },
    enabled: !!id,
  });
}
