import { db } from "./db";
import {
  products,
  orders,
  contactInquiries,
  testimonials,
  blogs,
  faqs,
  fests,
  type Product,
  type InsertProduct,
  type CreateOrderRequest,
  type OrderResponse,
  type CreateContactRequest,
  type ContactResponse,
  type TestimonialResponse,
  type ProductsQueryParams,
  type Blog,
  type InsertBlog,
  type Faq,
  type InsertFaq,
  type Fest,
  type InsertFest,
} from "@shared/schema";
import { eq, and } from "drizzle-orm";

export interface IStorage {
  getProducts(filters?: ProductsQueryParams): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  createOrder(order: CreateOrderRequest): Promise<OrderResponse>;
  createContactInquiry(inquiry: CreateContactRequest): Promise<ContactResponse>;
  getTestimonials(): Promise<TestimonialResponse[]>;
  getBlogs(): Promise<Blog[]>;
  getFaqs(): Promise<Faq[]>;
  getFests(): Promise<Fest[]>;
  createBlog(blog: InsertBlog): Promise<Blog>;
  createFaq(faq: InsertFaq): Promise<Faq>;
  createFest(fest: InsertFest): Promise<Fest>;
}

export class DatabaseStorage implements IStorage {
  async getProducts(filters?: ProductsQueryParams): Promise<Product[]> {
    const conditions = [];
    
    if (filters?.category) {
      conditions.push(eq(products.category, filters.category));
    }
    if (filters?.special) {
      conditions.push(eq(products.isSpecial, true));
    }
    if (filters?.trending) {
      conditions.push(eq(products.isTrending, true));
    }

    if (conditions.length > 0) {
      return await db.select().from(products).where(and(...conditions));
    }
    
    return await db.select().from(products);
  }

  async getProduct(id: number): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product;
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const [newProduct] = await db.insert(products).values(product).returning();
    return newProduct;
  }

  async createOrder(order: CreateOrderRequest): Promise<OrderResponse> {
    const [newOrder] = await db.insert(orders).values(order).returning();
    return newOrder;
  }

  async createContactInquiry(inquiry: CreateContactRequest): Promise<ContactResponse> {
    const [newInquiry] = await db.insert(contactInquiries).values(inquiry).returning();
    return newInquiry;
  }

  async getTestimonials(): Promise<TestimonialResponse[]> {
    return await db.select().from(testimonials).orderBy(testimonials.createdAt);
  }

  async getBlogs(): Promise<Blog[]> {
    return await db.select().from(blogs).orderBy(blogs.createdAt);
  }

  async getFaqs(): Promise<Faq[]> {
    return await db.select().from(faqs);
  }

  async getFests(): Promise<Fest[]> {
    return await db.select().from(fests);
  }

  async createBlog(blog: InsertBlog): Promise<Blog> {
    const [result] = await db.insert(blogs).values(blog).returning();
    return result;
  }

  async createFaq(faq: InsertFaq): Promise<Faq> {
    const [result] = await db.insert(faqs).values(faq).returning();
    return result;
  }

  async createFest(fest: InsertFest): Promise<Fest> {
    const [result] = await db.insert(fests).values(fest).returning();
    return result;
  }
}

export const storage = new DatabaseStorage();
