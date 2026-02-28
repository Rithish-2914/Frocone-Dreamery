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

// Hardcoded data
const productsData: Product[] = [
  {
    id: 1,
    name: "Death By Chocolate",
    description: "Death By Chocolate - Fresh and delicious brownies",
    category: "Brownies",
    price: "249",
    imageUrl: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
    flavorNotes: "Delicious brownies",
    isSpecial: false,
    isTrending: true,
    isFavorite: false,
    badge: null,
    createdAt: new Date()
  },
  {
    id: 2,
    name: "Walnut Brownie",
    description: "Walnut Brownie - Fresh and delicious brownies",
    category: "Brownies",
    price: "119",
    imageUrl: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
    flavorNotes: "Delicious brownies",
    isSpecial: false,
    isTrending: false,
    isFavorite: false,
    badge: null,
    createdAt: new Date()
  },
  {
    id: 3,
    name: "ChocoChip Brownie",
    description: "ChocoChip Brownie - Fresh and delicious brownies",
    category: "Brownies",
    price: "119",
    imageUrl: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
    flavorNotes: "Delicious brownies",
    isSpecial: false,
    isTrending: false,
    isFavorite: false,
    badge: null,
    createdAt: new Date()
  },
  {
    id: 4,
    name: "Hazelnut Brownie",
    description: "Hazelnut Brownie - Fresh and delicious brownies",
    category: "Brownies",
    price: "129",
    imageUrl: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
    flavorNotes: "Delicious brownies",
    isSpecial: false,
    isTrending: false,
    isFavorite: false,
    badge: null,
    createdAt: new Date()
  },
  {
    id: 5,
    name: "Sizzling Brownie",
    description: "Sizzling Brownie - Fresh and delicious brownies",
    category: "Brownies",
    price: "269",
    imageUrl: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
    flavorNotes: "Delicious brownies",
    isSpecial: true,
    isTrending: false,
    isFavorite: false,
    badge: "Popular",
    createdAt: new Date()
  },
  {
    id: 6,
    name: "Vanilla",
    description: "Vanilla - Fresh and delicious ice cream scoops",
    category: "Ice Cream Scoops",
    price: "99",
    imageUrl: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
    flavorNotes: "Delicious ice cream scoops",
    isSpecial: false,
    isTrending: false,
    isFavorite: false,
    badge: null,
    createdAt: new Date()
  }
];

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

const blogsData: Blog[] = [
  {
    id: 1,
    title: "Frocone Creamery – The Sweetest Spot in Madhapur, Hyderabad",
    content: "If you're in Madhapur and craving something indulgent, Frocone Creamery is your go-to dessert destination.",
    author: "Frocone Team",
    imageUrl: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=800",
    excerpt: "If you're in Madhapur and craving something indulgent, Frocone Creamery is your go-to dessert destination.",
    category: "Announcements",
    createdAt: new Date()
  }
];

const faqsData: Faq[] = [
  {
    id: 1,
    question: "Do you offer vegan options?",
    answer: "Yes! We have a range of fruit-based sorbets that are 100% vegan.",
    category: "Dietary"
  }
];

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
