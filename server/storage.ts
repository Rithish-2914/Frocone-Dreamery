import { db } from "./db";
import {
  products,
  orders,
  contactInquiries,
  testimonials,
  type Product,
  type InsertProduct,
  type CreateOrderRequest,
  type OrderResponse,
  type CreateContactRequest,
  type ContactResponse,
  type TestimonialResponse,
  type ProductsQueryParams,
} from "@shared/schema";
import { eq, and } from "drizzle-orm";

export interface IStorage {
  getProducts(filters?: ProductsQueryParams): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  createOrder(order: CreateOrderRequest): Promise<OrderResponse>;
  createContactInquiry(inquiry: CreateContactRequest): Promise<ContactResponse>;
  getTestimonials(): Promise<TestimonialResponse[]>;
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
}

export const storage = new DatabaseStorage();
