import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.get(api.products.list.path, async (req, res) => {
    try {
      const filters = {
        category: req.query.category as string | undefined,
        special: req.query.special === 'true' ? true : undefined,
        trending: req.query.trending === 'true' ? true : undefined,
      };
      const productsList = await storage.getProducts(filters);
      res.json(productsList);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch products' });
    }
  });

  app.get(api.products.get.path, async (req, res) => {
    try {
      const product = await storage.getProduct(Number(req.params.id));
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch product' });
    }
  });

  app.post(api.orders.create.path, async (req, res) => {
    try {
      const bodySchema = api.orders.create.input.extend({
        totalAmount: z.coerce.string(),
      });
      const input = bodySchema.parse(req.body);
      const order = await storage.createOrder(input);
      res.status(201).json(order);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      res.status(500).json({ message: 'Failed to create order' });
    }
  });

  app.post(api.contact.create.path, async (req, res) => {
    try {
      const input = api.contact.create.input.parse(req.body);
      const inquiry = await storage.createContactInquiry(input);
      res.status(201).json(inquiry);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      res.status(500).json({ message: 'Failed to submit inquiry' });
    }
  });

  app.get(api.testimonials.list.path, async (req, res) => {
    try {
      const testimonialsList = await storage.getTestimonials();
      res.json(testimonialsList);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch testimonials' });
    }
  });

  app.get(api.blogs.list.path, async (req, res) => {
    try {
      const blogsList = await storage.getBlogs();
      res.json(blogsList);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch blogs' });
    }
  });

  app.get(api.faqs.list.path, async (req, res) => {
    try {
      const faqsList = await storage.getFaqs();
      res.json(faqsList);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch FAQs' });
    }
  });

  app.get(api.fests.list.path, async (req, res) => {
    try {
      const festsList = await storage.getFests();
      res.json(festsList);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch fests' });
    }
  });

  return httpServer;
}
