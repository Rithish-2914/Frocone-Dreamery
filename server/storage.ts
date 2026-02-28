import { MENU_DATA } from "@shared/menu-data";
import {
  type Product,
  type OrderResponse,
  type ContactResponse,
  type TestimonialResponse,
  type ProductsQueryParams,
  type Blog,
  type Faq,
  type Fest,
} from "@shared/schema";

// Helper to convert menu data to Product format
function getProductsFromMenu(): Product[] {
  const products: Product[] = [];
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

  return products;
}

const productsData: Product[] = getProductsFromMenu();

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

const blogsData: Blog[] = MENU_DATA.blogs.map((blog, idx) => ({
  id: idx + 1,
  title: blog.title,
  content: blog.content,
  author: "Frocone Team",
  imageUrl: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=800",
  excerpt: blog.content.substring(0, 100) + "...",
  category: "Dessert Guide",
  createdAt: new Date()
}));

const faqsData: Faq[] = MENU_DATA.faqs.map((faq, idx) => ({
  id: idx + 1,
  question: faq.question,
  answer: faq.answer,
  category: "General"
}));

const festsData: Fest[] = [
  {
    id: 1,
    name: "ATMOS 2024",
    college: "BITS Pilani, Hyderabad",
    description: "Technical fest with amazing workshops and competitions.",
    date: "October 18-20, 2024",
    imageUrl: "https://images.unsplash.com/photo-1540575861501-7ad0582371f3?w=800",
    contactPerson: "Student Council"
  }
];

export interface IStorage {
  getProducts(filters?: ProductsQueryParams): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  createProduct(product: any): Promise<Product>;
  createOrder(order: any): Promise<OrderResponse>;
  createContactInquiry(inquiry: any): Promise<ContactResponse>;
  getTestimonials(): Promise<TestimonialResponse[]>;
  getBlogs(): Promise<Blog[]>;
  getFaqs(): Promise<Faq[]>;
  getFests(): Promise<Fest[]>;
  createBlog(blog: any): Promise<Blog>;
  createFaq(faq: any): Promise<Faq>;
  createFest(fest: any): Promise<Fest>;
}

export class MemStorage implements IStorage {
  async getProducts(filters?: ProductsQueryParams): Promise<Product[]> {
    let filtered = [...productsData];
    if (filters?.category) {
      filtered = filtered.filter(p => p.category === filters.category);
    }
    if (filters?.special) {
      filtered = filtered.filter(p => p.isSpecial);
    }
    if (filters?.trending) {
      filtered = filtered.filter(p => p.isTrending);
    }
    return filtered;
  }

  async getProduct(id: number): Promise<Product | undefined> {
    return productsData.find(p => p.id === id);
  }

  async createProduct(product: any): Promise<Product> {
    const newProduct = { ...product, id: productsData.length + 1, createdAt: new Date() };
    productsData.push(newProduct);
    return newProduct;
  }

  async createOrder(order: any): Promise<OrderResponse> {
    return { ...order, id: Math.floor(Math.random() * 10000), status: "pending", createdAt: new Date() };
  }

  async createContactInquiry(inquiry: any): Promise<ContactResponse> {
    return { ...inquiry, id: Math.floor(Math.random() * 10000), status: "new", createdAt: new Date() };
  }

  async getTestimonials(): Promise<TestimonialResponse[]> {
    return testimonialsData;
  }

  async getBlogs(): Promise<Blog[]> {
    return blogsData;
  }

  async getFaqs(): Promise<Faq[]> {
    return faqsData;
  }

  async getFests(): Promise<Fest[]> {
    return festsData;
  }

  async createBlog(blog: any): Promise<Blog> {
    const newBlog = { ...blog, id: blogsData.length + 1, createdAt: new Date() };
    blogsData.push(newBlog);
    return newBlog;
  }

  async createFaq(faq: any): Promise<Faq> {
    const newFaq = { ...faq, id: faqsData.length + 1 };
    faqsData.push(newFaq);
    return newFaq;
  }

  async createFest(fest: any): Promise<Fest> {
    const newFest = { ...fest, id: festsData.length + 1 };
    festsData.push(newFest);
    return newFest;
  }
}

export const storage = new MemStorage();
