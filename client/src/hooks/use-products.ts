import { MENU_DATA } from "@shared/menu-data";
import { type Product } from "@shared/schema";

export function useProducts(filters?: { category?: string; special?: boolean; trending?: boolean }) {
  let products: Product[] = [];
  let id = 1;

  MENU_DATA.brownies.forEach(item => {
    products.push({
      id: id++,
      name: item.name,
      description: `${item.name} - Fresh and delicious brownie`,
      category: "Brownies",
      price: item.price.toString(),
      imageUrl: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
      flavorNotes: "Rich chocolate goodness",
      isSpecial: item.name === "Sizzling Brownie",
      isTrending: item.name === "Death By Chocolate",
      isFavorite: false,
      badge: item.name === "Sizzling Brownie" ? "Popular" : null,
      createdAt: new Date()
    });
  });

  MENU_DATA.iceCreamScoops.flavors.forEach(flavor => {
    products.push({
      id: id++,
      name: flavor,
      description: `${flavor} - Artisanal ice cream scoop`,
      category: "Ice Cream Scoops",
      price: MENU_DATA.iceCreamScoops.startingPrice.toString(),
      imageUrl: "https://images.unsplash.com/photo-1563805042-7684c8a9e9ce?w=800",
      flavorNotes: "Handcrafted fresh",
      isSpecial: false,
      isTrending: false,
      isFavorite: false,
      badge: null,
      createdAt: new Date()
    });
  });

  MENU_DATA.sundaes.forEach(item => {
    products.push({
      id: id++,
      name: item.name,
      description: `${item.name} - Indulgent sundae`,
      category: "Sundaes",
      price: item.price.toString(),
      imageUrl: "https://images.unsplash.com/photo-1580915411954-282cb1b0d780?w=800",
      flavorNotes: "Pure bliss",
      isSpecial: item.name === "Lotus Biscoff",
      isTrending: item.name === "Lotus Biscoff",
      isFavorite: false,
      badge: null,
      createdAt: new Date()
    });
  });

  MENU_DATA.milkshakes.flavors.forEach(flavor => {
    products.push({
      id: id++,
      name: flavor,
      description: `${flavor} - Refreshing milkshake`,
      category: "Milkshakes",
      price: MENU_DATA.milkshakes.price.toString(),
      imageUrl: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800",
      flavorNotes: "Cool and creamy",
      isSpecial: false,
      isTrending: false,
      isFavorite: false,
      badge: null,
      createdAt: new Date()
    });
  });

  MENU_DATA.thickshakes.forEach(item => {
    products.push({
      id: id++,
      name: item.name,
      description: `${item.name} - Creamy thickshake`,
      category: "Thickshakes",
      price: item.price.toString(),
      imageUrl: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800",
      flavorNotes: "Rich and filling",
      isSpecial: item.name.includes("Nutella"),
      isTrending: item.name.includes("Nutella"),
      isFavorite: false,
      badge: null,
      createdAt: new Date()
    });
  });

  if (filters?.category && filters.category !== 'All') {
    products = products.filter(p => p.category === filters.category);
  }
  if (filters?.trending) {
    products = products.filter(p => p.isTrending);
  }
  if (filters?.special) {
    products = products.filter(p => p.isSpecial);
  }

  return { data: products, isLoading: false };
}

export function useProduct(id: number) {
  const { data: products } = useProducts();
  const product = products.find(p => p.id === id);
  return { data: product, isLoading: false };
}
