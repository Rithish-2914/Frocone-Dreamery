import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { db } from "./db";
import { testimonials } from "@shared/schema";

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

  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  try {
    const existingProducts = await storage.getProducts();
    
    if (existingProducts.length === 0) {
      const productsData = [
        {
          "name": "Death By Chocolate",
          "description": "Death By Chocolate - Fresh and delicious brownies",
          "category": "Brownies",
          "price": "249",
          "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
          "flavorNotes": "Delicious brownies",
          "isSpecial": false,
          "isTrending": false,
          "isFavorite": false,
          "badge": null
        },
        {
          "name": "Walnut Brownie",
          "description": "Walnut Brownie - Fresh and delicious brownies",
          "category": "Brownies",
          "price": "119",
          "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
          "flavorNotes": "Delicious brownies",
          "isSpecial": false,
          "isTrending": false,
          "isFavorite": false,
          "badge": null
        },
        {
          "name": "ChocoChip Brownie",
          "description": "ChocoChip Brownie - Fresh and delicious brownies",
          "category": "Brownies",
          "price": "119",
          "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
          "flavorNotes": "Delicious brownies",
          "isSpecial": false,
          "isTrending": false,
          "isFavorite": false,
          "badge": null
        },
        {
          "name": "Hazelnut Brownie",
          "description": "Hazelnut Brownie - Fresh and delicious brownies",
          "category": "Brownies",
          "price": "129",
          "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
          "flavorNotes": "Delicious brownies",
          "isSpecial": false,
          "isTrending": false,
          "isFavorite": false,
          "badge": null
        },
        {
          "name": "Sizzling Brownie",
          "description": "Sizzling Brownie - Fresh and delicious brownies",
          "category": "Brownies",
          "price": "269",
          "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
          "flavorNotes": "Delicious brownies",
          "isSpecial": false,
          "isTrending": false,
          "isFavorite": false,
          "badge": null
        },
        {
          "name": "Vanilla",
          "description": "Vanilla - Fresh and delicious ice cream scoops",
          "category": "Ice Cream Scoops",
          "price": "99",
          "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
          "flavorNotes": "Delicious ice cream scoops",
          "isSpecial": false,
          "isTrending": false,
          "isFavorite": false,
          "badge": null
        },
        {
          "name": "Paan",
          "description": "Paan - Fresh and delicious ice cream scoops",
          "category": "Ice Cream Scoops",
          "price": "109",
          "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
          "flavorNotes": "Delicious ice cream scoops",
          "isSpecial": false,
          "isTrending": false,
          "isFavorite": false,
          "badge": null
        },
        {
          "name": "Black Currant",
          "description": "Black Currant - Fresh and delicious ice cream scoops",
          "category": "Ice Cream Scoops",
          "price": "109",
          "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
          "flavorNotes": "Delicious ice cream scoops",
          "isSpecial": false,
          "isTrending": false,
          "isFavorite": false,
          "badge": null
        },
        {
          "name": "Chocolate",
          "description": "Chocolate - Fresh and delicious ice cream scoops",
          "category": "Ice Cream Scoops",
          "price": "109",
          "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
          "flavorNotes": "Delicious ice cream scoops",
          "isSpecial": false,
          "isTrending": false,
          "isFavorite": false,
          "badge": null
        },
        {
          "name": "Red Velvet",
          "description": "Red Velvet - Fresh and delicious ice cream scoops",
          "category": "Ice Cream Scoops",
          "price": "119",
          "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
          "flavorNotes": "Delicious ice cream scoops",
          "isSpecial": false,
          "isTrending": false,
          "isFavorite": false,
          "badge": null
        },
        {
          "name": "Salted Caramel",
          "description": "Salted Caramel - Fresh and delicious ice cream scoops",
          "category": "Ice Cream Scoops",
          "price": "119",
          "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
          "flavorNotes": "Delicious ice cream scoops",
          "isSpecial": false,
          "isTrending": false,
          "isFavorite": false,
          "badge": null
        },
        {
          "name": "Strawberry",
          "description": "Strawberry - Fresh and delicious ice cream scoops",
          "category": "Ice Cream Scoops",
          "price": "109",
          "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
          "flavorNotes": "Delicious ice cream scoops",
          "isSpecial": false,
          "isTrending": false,
          "isFavorite": false,
          "badge": null
        },
        {
          "name": "Blueberry",
          "description": "Blueberry - Fresh and delicious ice cream scoops",
          "category": "Ice Cream Scoops",
          "price": "109",
          "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
          "flavorNotes": "Delicious ice cream scoops",
          "isSpecial": false,
          "isTrending": false,
          "isFavorite": false,
          "badge": null
        },
        {
          "name": "Dark Chocolate",
          "description": "Dark Chocolate - Fresh and delicious ice cream scoops",
          "category": "Ice Cream Scoops",
          "price": "119",
          "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
          "flavorNotes": "Delicious ice cream scoops",
          "isSpecial": false,
          "isTrending": false,
          "isFavorite": false,
          "badge": null
        },
        {
          "name": "Coconut",
          "description": "Coconut - Fresh and delicious ice cream scoops",
          "category": "Ice Cream Scoops",
          "price": "105",
          "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
          "flavorNotes": "Delicious ice cream scoops",
          "isSpecial": false,
          "isTrending": false,
          "isFavorite": false,
          "badge": null
        },
        {
          "name": "Pineapple",
          "description": "Pineapple - Fresh and delicious ice cream scoops",
          "category": "Ice Cream Scoops",
          "price": "105",
          "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
          "flavorNotes": "Delicious ice cream scoops",
          "isSpecial": false,
          "isTrending": false,
          "isFavorite": false,
          "badge": null
        },
        {
          "name": "Butterscotch",
          "description": "Butterscotch - Fresh and delicious ice cream scoops",
          "category": "Ice Cream Scoops",
          "price": "105",
          "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
          "flavorNotes": "Delicious ice cream scoops",
          "isSpecial": false,
          "isTrending": false,
          "isFavorite": false,
          "badge": null
        },
        {
          "name": "Rose Cardamom",
          "description": "Rose Cardamom - Fresh and delicious ice cream scoops",
          "category": "Ice Cream Scoops",
          "price": "109",
          "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
          "flavorNotes": "Delicious ice cream scoops",
          "isSpecial": false,
          "isTrending": false,
          "isFavorite": false,
          "badge": null
        },
        {
          "name": "Raspberry",
          "description": "Raspberry - Fresh and delicious ice cream scoops",
          "category": "Ice Cream Scoops",
          "price": "109",
          "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
          "flavorNotes": "Delicious ice cream scoops",
          "isSpecial": false,
          "isTrending": false,
          "isFavorite": false,
          "badge": null
        },
        {
          "name": "Mango",
          "description": "Mango - Fresh and delicious ice cream scoops",
          "category": "Ice Cream Scoops",
          "price": "105",
          "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
          "flavorNotes": "Delicious ice cream scoops",
          "isSpecial": false,
          "isTrending": false,
          "isFavorite": false,
          "badge": null
        },
        {
          "name": "Pista",
          "description": "Pista - Fresh and delicious ice cream scoops",
          "category": "Ice Cream Scoops",
          "price": "109",
          "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
          "flavorNotes": "Delicious ice cream scoops",
          "isSpecial": false,
          "isTrending": false,
          "isFavorite": false,
          "badge": null
        },
        {
          "name": "Coffee",
          "description": "Coffee - Fresh and delicious ice cream scoops",
          "category": "Ice Cream Scoops",
          "price": "109",
          "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
          "flavorNotes": "Delicious ice cream scoops",
          "isSpecial": false,
          "isTrending": false,
          "isFavorite": false,
          "badge": null
        },
        {
          "name": "Chocolate Milkshake",
          "description": "Chocolate Milkshake - Fresh and delicious milkshakes",
          "category": "Milkshakes",
          "price": "219",
          "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
          "flavorNotes": "Delicious milkshakes",
          "isSpecial": false,
          "isTrending": false,
          "isFavorite": false,
          "badge": null
        },
        {
          "name": "Strawberry Bliss",
          "description": "Strawberry Bliss - Fresh and delicious milkshakes",
          "category": "Milkshakes",
          "price": "219",
          "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
          "flavorNotes": "Delicious milkshakes",
          "isSpecial": false,
          "isTrending": false,
          "isFavorite": false,
          "badge": null
        },
        {
          "name": "Cookies n‘ Cream",
          "description": "Cookies n‘ Cream - Fresh and delicious milkshakes",
          "category": "Milkshakes",
          "price": "219",
          "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
          "flavorNotes": "Delicious milkshakes",
          "isSpecial": false,
          "isTrending": false,
          "isFavorite": false,
          "badge": null
        },
        {
          "name": "Peanut Butter Indulgence",
          "description": "Peanut Butter Indulgence - Fresh and delicious milkshakes",
          "category": "Milkshakes",
          "price": "219",
          "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
          "flavorNotes": "Delicious milkshakes",
          "isSpecial": false,
          "isTrending": false,
          "isFavorite": false,
          "badge": null
        },
        {
          "name": "Coffee Lovers",
          "description": "Coffee Lovers - Fresh and delicious milkshakes",
          "category": "Milkshakes",
          "price": "219",
          "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
          "flavorNotes": "Delicious milkshakes",
          "isSpecial": false,
          "isTrending": false,
          "isFavorite": false,
          "badge": null
        },
        {
          "name": "Lotus Biscoff",
          "description": "Lotus Biscoff - Fresh and delicious milkshakes",
          "category": "Milkshakes",
          "price": "219",
          "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
          "flavorNotes": "Delicious milkshakes",
          "isSpecial": false,
          "isTrending": false,
          "isFavorite": false,
          "badge": null
        },
        {
          "name": "Mango Milkshake",
          "description": "Mango Milkshake - Fresh and delicious milkshakes",
          "category": "Milkshakes",
          "price": "219",
          "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
          "flavorNotes": "Delicious milkshakes",
          "isSpecial": false,
          "isTrending": false,
          "isFavorite": false,
          "badge": null
        },
        {
          "name": "Blueberry Milkshake",
          "description": "Blueberry Milkshake - Fresh and delicious milkshakes",
          "category": "Milkshakes",
          "price": "219",
          "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
          "flavorNotes": "Delicious milkshakes",
          "isSpecial": false,
          "isTrending": false,
          "isFavorite": false,
          "badge": null
        },
        {
          "name": "Pista Milkshake",
          "description": "Pista Milkshake - Fresh and delicious milkshakes",
          "category": "Milkshakes",
          "price": "219",
          "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
          "flavorNotes": "Delicious milkshakes",
          "isSpecial": false,
          "isTrending": false,
          "isFavorite": false,
          "badge": null
        },
        {
          "name": "Butterscotch Milkshake",
          "description": "Butterscotch Milkshake - Fresh and delicious milkshakes",
          "category": "Milkshakes",
          "price": "219",
          "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
          "flavorNotes": "Delicious milkshakes",
          "isSpecial": false,
          "isTrending": false,
          "isFavorite": false,
          "badge": null
        },
        {
          "name": "Rose Cardamom Milkshake",
          "description": "Rose Cardamom Milkshake - Fresh and delicious milkshakes",
          "category": "Milkshakes",
          "price": "219",
          "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
          "flavorNotes": "Delicious milkshakes",
          "isSpecial": false,
          "isTrending": false,
          "isFavorite": false,
          "badge": null
        },
        {
          "name": "Black Currant Milkshake",
          "description": "Black Currant Milkshake - Fresh and delicious milkshakes",
          "category": "Milkshakes",
          "price": "219",
          "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
          "flavorNotes": "Delicious milkshakes",
          "isSpecial": false,
          "isTrending": false,
          "isFavorite": false,
          "badge": null
        },
        {
          "name": "Kit Kat Milkshake",
          "description": "Kit Kat Milkshake - Fresh and delicious milkshakes",
          "category": "Milkshakes",
          "price": "219",
          "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
          "flavorNotes": "Delicious milkshakes",
          "isSpecial": false,
          "isTrending": false,
          "isFavorite": false,
          "badge": null
        },
        {
          "name": "Water Bottle (Small)",
          "description": "Water Bottle (Small) - Fresh and delicious others",
          "category": "Others",
          "price": "10",
          "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
          "flavorNotes": "Delicious others",
          "isSpecial": false,
          "isTrending": false,
          "isFavorite": false,
          "badge": null
        },
        {
          "name": "Water Bottle",
          "description": "Water Bottle - Fresh and delicious others",
          "category": "Others",
          "price": "20",
          "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
          "flavorNotes": "Delicious others",
          "isSpecial": false,
          "isTrending": false,
          "isFavorite": false,
          "badge": null
        },
        {
          "name": "Packing Charges",
          "description": "Packing Charges - Fresh and delicious others",
          "category": "Others",
          "price": "15",
          "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
          "flavorNotes": "Delicious others",
          "isSpecial": false,
          "isTrending": false,
          "isFavorite": false,
          "badge": null
        },
        {
          "name": "Extra Dry Ice",
          "description": "Extra Dry Ice - Fresh and delicious others",
          "category": "Others",
          "price": "15",
          "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
          "flavorNotes": "Delicious others",
          "isSpecial": false,
          "isTrending": false,
          "isFavorite": false,
          "badge": null
        },
        {
          "name": "Delivery",
          "description": "Delivery - Fresh and delicious others",
          "category": "Others",
          "price": "100",
          "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
          "flavorNotes": "Delicious others",
          "isSpecial": false,
          "isTrending": false,
          "isFavorite": false,
          "badge": null
        },
        {
          "name": "Caribbean Lychee",
          "description": "Caribbean Lychee - Fresh and delicious sundaes",
          "category": "Sundaes",
          "price": "189",
          "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
          "flavorNotes": "Delicious sundaes",
          "isSpecial": false,
          "isTrending": false,
          "isFavorite": false,
          "badge": null
        },
        {
          "name": "Cookies & Cream",
          "description": "Cookies & Cream - Fresh and delicious sundaes",
          "category": "Sundaes",
          "price": "199",
          "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
          "flavorNotes": "Delicious sundaes",
          "isSpecial": false,
          "isTrending": false,
          "isFavorite": false,
          "badge": null
        },
        {
          "name": "Classic Hot Chocolate Fudge",
          "description": "Classic Hot Chocolate Fudge - Fresh and delicious sundaes",
          "category": "Sundaes",
          "price": "199",
          "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
          "flavorNotes": "Delicious sundaes",
          "isSpecial": false,
          "isTrending": false,
          "isFavorite": false,
          "badge": null
        },
        {
          "name": "Strawberry Choco Chip",
          "description": "Strawberry Choco Chip - Fresh and delicious sundaes",
          "category": "Sundaes",
          "price": "199",
          "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
          "flavorNotes": "Delicious sundaes",
          "isSpecial": false,
          "isTrending": false,
          "isFavorite": false,
          "badge": null
        },
        {
          "name": "Coconut Paan Meetha",
          "description": "Coconut Paan Meetha - Fresh and delicious sundaes",
          "category": "Sundaes",
          "price": "199",
          "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
          "flavorNotes": "Delicious sundaes",
          "isSpecial": false,
          "isTrending": false,
          "isFavorite": false,
          "badge": null
        },
        {
          "name": "Berry Banana Dream",
          "description": "Berry Banana Dream - Fresh and delicious sundaes",
          "category": "Sundaes",
          "price": "199",
          "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
          "flavorNotes": "Delicious sundaes",
          "isSpecial": false,
          "isTrending": false,
          "isFavorite": false,
          "badge": null
        },
        {
          "name": "Strawberry Bliss",
          "description": "Strawberry Bliss - Fresh and delicious sundaes",
          "category": "Sundaes",
          "price": "199",
          "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
          "flavorNotes": "Delicious sundaes",
          "isSpecial": false,
          "isTrending": false,
          "isFavorite": false,
          "badge": null
        },
        {
          "name": "Butterscotch Toffee",
          "description": "Butterscotch Toffee - Fresh and delicious sundaes",
          "category": "Sundaes",
          "price": "199",
          "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
          "flavorNotes": "Delicious sundaes",
          "isSpecial": false,
          "isTrending": false,
          "isFavorite": false,
          "badge": null
        },
        {
          "name": "Kit Kat Wonder",
          "description": "Kit Kat Wonder - Fresh and delicious sundaes",
          "category": "Sundaes",
          "price": "199",
          "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
          "flavorNotes": "Delicious sundaes",
          "isSpecial": false,
          "isTrending": false,
          "isFavorite": false,
          "badge": null
        },
        {
          "name": "Candy Pop",
          "description": "Candy Pop - Fresh and delicious sundaes",
          "category": "Sundaes",
          "price": "199",
          "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
          "flavorNotes": "Delicious sundaes",
          "isSpecial": false,
          "isTrending": false,
          "isFavorite": false,
          "badge": null
        },
        {
          "name": "Tropical Blush",
          "description": "Tropical Blush - Fresh and delicious sundaes",
          "category": "Sundaes",
          "price": "199",
          "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
          "flavorNotes": "Delicious sundaes",
          "isSpecial": false,
          "isTrending": false,
          "isFavorite": false,
          "badge": null
        },
        {
          "name": "Dark Temptation",
          "description": "Dark Temptation - Fresh and delicious sundaes",
          "category": "Sundaes",
          "price": "199",
          "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
          "flavorNotes": "Delicious sundaes",
          "isSpecial": false,
          "isTrending": false,
          "isFavorite": false,
          "badge": null
        },
        {
          "name": "Mocha Almond Fudge",
          "description": "Mocha Almond Fudge - Fresh and delicious sundaes",
          "category": "Sundaes",
          "price": "209",
          "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
          "flavorNotes": "Delicious sundaes",
          "isSpecial": false,
          "isTrending": false,
          "isFavorite": false,
          "badge": null
        },
        {
          "name": "Lotus Biscoff",
          "description": "Lotus Biscoff - Fresh and delicious sundaes",
          "category": "Sundaes",
          "price": "209",
          "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
          "flavorNotes": "Delicious sundaes",
          "isSpecial": false,
          "isTrending": false,
          "isFavorite": false,
          "badge": null
        },
        {
          "name": "Midnight Berry Swirl",
          "description": "Midnight Berry Swirl - Fresh and delicious sundaes",
          "category": "Sundaes",
          "price": "199",
          "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
          "flavorNotes": "Delicious sundaes",
          "isSpecial": false,
          "isTrending": false,
          "isFavorite": false,
          "badge": null
        },
        {
          "name": "Blueberry Delight",
          "description": "Blueberry Delight - Fresh and delicious sundaes",
          "category": "Sundaes",
          "price": "199",
          "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
          "flavorNotes": "Delicious sundaes",
          "isSpecial": false,
          "isTrending": false,
          "isFavorite": false,
          "badge": null
        },
        {
          "name": "Skippy Banana",
          "description": "Skippy Banana - Fresh and delicious sundaes",
          "category": "Sundaes",
          "price": "199",
          "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
          "flavorNotes": "Delicious sundaes",
          "isSpecial": false,
          "isTrending": false,
          "isFavorite": false,
          "badge": null
        },
        {
          "name": "Dry Fruit Medley",
          "description": "Dry Fruit Medley - Fresh and delicious sundaes",
          "category": "Sundaes",
          "price": "229",
          "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
          "flavorNotes": "Delicious sundaes",
          "isSpecial": false,
          "isTrending": false,
          "isFavorite": false,
          "badge": null
        },
        {
          "name": "Classic Banana Split (Triple)",
          "description": "Classic Banana Split (Triple) - Fresh and delicious sundaes",
          "category": "Sundaes",
          "price": "349",
          "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
          "flavorNotes": "Delicious sundaes",
          "isSpecial": false,
          "isTrending": false,
          "isFavorite": false,
          "badge": null
        },
        {
          "name": "Chocolate Thickshake",
          "description": "Chocolate Thickshake - Fresh and delicious thickshakes",
          "category": "Thickshakes",
          "price": "259",
          "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
          "flavorNotes": "Delicious thickshakes",
          "isSpecial": false,
          "isTrending": false,
          "isFavorite": false,
          "badge": null
        },
        {
          "name": "Peanut Butter Indulgence",
          "description": "Peanut Butter Indulgence - Fresh and delicious thickshakes",
          "category": "Thickshakes",
          "price": "259",
          "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
          "flavorNotes": "Delicious thickshakes",
          "isSpecial": false,
          "isTrending": false,
          "isFavorite": false,
          "badge": null
        },
        {
          "name": "Strawberry Thickshake",
          "description": "Strawberry Thickshake - Fresh and delicious thickshakes",
          "category": "Thickshakes",
          "price": "259",
          "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
          "flavorNotes": "Delicious thickshakes",
          "isSpecial": false,
          "isTrending": false,
          "isFavorite": false,
          "badge": null
        },
        {
          "name": "Blueberry Thickshake",
          "description": "Blueberry Thickshake - Fresh and delicious thickshakes",
          "category": "Thickshakes",
          "price": "259",
          "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
          "flavorNotes": "Delicious thickshakes",
          "isSpecial": false,
          "isTrending": false,
          "isFavorite": false,
          "badge": null
        },
        {
          "name": "Coffee Thickshake",
          "description": "Coffee Thickshake - Fresh and delicious thickshakes",
          "category": "Thickshakes",
          "price": "259",
          "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
          "flavorNotes": "Delicious thickshakes",
          "isSpecial": false,
          "isTrending": false,
          "isFavorite": false,
          "badge": null
        },
        {
          "name": "Rose Cardamom",
          "description": "Rose Cardamom - Fresh and delicious thickshakes",
          "category": "Thickshakes",
          "price": "259",
          "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
          "flavorNotes": "Delicious thickshakes",
          "isSpecial": false,
          "isTrending": false,
          "isFavorite": false,
          "badge": null
        },
        {
          "name": "Black Currant Thickshake",
          "description": "Black Currant Thickshake - Fresh and delicious thickshakes",
          "category": "Thickshakes",
          "price": "259",
          "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
          "flavorNotes": "Delicious thickshakes",
          "isSpecial": false,
          "isTrending": false,
          "isFavorite": false,
          "badge": null
        },
        {
          "name": "Mango Thickshake",
          "description": "Mango Thickshake - Fresh and delicious thickshakes",
          "category": "Thickshakes",
          "price": "259",
          "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
          "flavorNotes": "Delicious thickshakes",
          "isSpecial": false,
          "isTrending": false,
          "isFavorite": false,
          "badge": null
        },
        {
          "name": "Lotus Biscoff Thickshake",
          "description": "Lotus Biscoff Thickshake - Fresh and delicious thickshakes",
          "category": "Thickshakes",
          "price": "269",
          "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
          "flavorNotes": "Delicious thickshakes",
          "isSpecial": false,
          "isTrending": false,
          "isFavorite": false,
          "badge": null
        },
        {
          "name": "Pista Thickshake",
          "description": "Pista Thickshake - Fresh and delicious thickshakes",
          "category": "Thickshakes",
          "price": "269",
          "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
          "flavorNotes": "Delicious thickshakes",
          "isSpecial": false,
          "isTrending": false,
          "isFavorite": false,
          "badge": null
        },
        {
          "name": "Butterscotch Thickshake",
          "description": "Butterscotch Thickshake - Fresh and delicious thickshakes",
          "category": "Thickshakes",
          "price": "259",
          "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
          "flavorNotes": "Delicious thickshakes",
          "isSpecial": false,
          "isTrending": false,
          "isFavorite": false,
          "badge": null
        },
        {
          "name": "Cookies n‘ Cream",
          "description": "Cookies n‘ Cream - Fresh and delicious thickshakes",
          "category": "Thickshakes",
          "price": "259",
          "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
          "flavorNotes": "Delicious thickshakes",
          "isSpecial": false,
          "isTrending": false,
          "isFavorite": false,
          "badge": null
        },
        {
          "name": "Nuttela Brownie Thickshake",
          "description": "Nuttela Brownie Thickshake - Fresh and delicious thickshakes",
          "category": "Thickshakes",
          "price": "299",
          "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
          "flavorNotes": "Delicious thickshakes",
          "isSpecial": false,
          "isTrending": false,
          "isFavorite": false,
          "badge": null
        },
        {
          "name": "Kit Kat Thickshake",
          "description": "Kit Kat Thickshake - Fresh and delicious thickshakes",
          "category": "Thickshakes",
          "price": "259",
          "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
          "flavorNotes": "Delicious thickshakes",
          "isSpecial": false,
          "isTrending": false,
          "isFavorite": false,
          "badge": null
        },
        {
          "name": "Triple Chocochip Thickshake",
          "description": "Triple Chocochip Thickshake - Fresh and delicious thickshakes",
          "category": "Thickshakes",
          "price": "259",
          "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
          "flavorNotes": "Delicious thickshakes",
          "isSpecial": false,
          "isTrending": false,
          "isFavorite": false,
          "badge": null
        },
        {
          "name": "Coconut Powder",
          "description": "Coconut Powder - Fresh and delicious toppings",
          "category": "Toppings",
          "price": "10",
          "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
          "flavorNotes": "Delicious toppings",
          "isSpecial": false,
          "isTrending": false,
          "isFavorite": false,
          "badge": null
        },
        {
          "name": "Oreo",
          "description": "Oreo - Fresh and delicious toppings",
          "category": "Toppings",
          "price": "15",
          "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
          "flavorNotes": "Delicious toppings",
          "isSpecial": false,
          "isTrending": false,
          "isFavorite": false,
          "badge": null
        },
        {
          "name": "Jelly",
          "description": "Jelly - Fresh and delicious toppings",
          "category": "Toppings",
          "price": "15",
          "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
          "flavorNotes": "Delicious toppings",
          "isSpecial": false,
          "isTrending": false,
          "isFavorite": false,
          "badge": null
        },
        {
          "name": "Jujube",
          "description": "Jujube - Fresh and delicious toppings",
          "category": "Toppings",
          "price": "15",
          "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
          "flavorNotes": "Delicious toppings",
          "isSpecial": false,
          "isTrending": false,
          "isFavorite": false,
          "badge": null
        },
        {
          "name": "Gems",
          "description": "Gems - Fresh and delicious toppings",
          "category": "Toppings",
          "price": "15",
          "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
          "flavorNotes": "Delicious toppings",
          "isSpecial": false,
          "isTrending": false,
          "isFavorite": false,
          "badge": null
        },
        {
          "name": "Cashew",
          "description": "Cashew - Fresh and delicious toppings",
          "category": "Toppings",
          "price": "30",
          "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
          "flavorNotes": "Delicious toppings",
          "isSpecial": false,
          "isTrending": false,
          "isFavorite": false,
          "badge": null
        },
        {
          "name": "Almonds",
          "description": "Almonds - Fresh and delicious toppings",
          "category": "Toppings",
          "price": "30",
          "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
          "flavorNotes": "Delicious toppings",
          "isSpecial": false,
          "isTrending": false,
          "isFavorite": false,
          "badge": null
        },
        {
          "name": "Pista",
          "description": "Pista - Fresh and delicious toppings",
          "category": "Toppings",
          "price": "40",
          "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
          "flavorNotes": "Delicious toppings",
          "isSpecial": false,
          "isTrending": false,
          "isFavorite": false,
          "badge": null
        },
        {
          "name": "Choco Chips",
          "description": "Choco Chips - Fresh and delicious toppings",
          "category": "Toppings",
          "price": "15",
          "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
          "flavorNotes": "Delicious toppings",
          "isSpecial": false,
          "isTrending": false,
          "isFavorite": false,
          "badge": null
        },
        {
          "name": "White Choco Chips",
          "description": "White Choco Chips - Fresh and delicious toppings",
          "category": "Toppings",
          "price": "15",
          "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
          "flavorNotes": "Delicious toppings",
          "isSpecial": false,
          "isTrending": false,
          "isFavorite": false,
          "badge": null
        },
        {
          "name": "Black Currant",
          "description": "Black Currant - Fresh and delicious toppings",
          "category": "Toppings",
          "price": "20",
          "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
          "flavorNotes": "Delicious toppings",
          "isSpecial": false,
          "isTrending": false,
          "isFavorite": false,
          "badge": null
        },
        {
          "name": "Butterscotch Nuts",
          "description": "Butterscotch Nuts - Fresh and delicious toppings",
          "category": "Toppings",
          "price": "15",
          "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
          "flavorNotes": "Delicious toppings",
          "isSpecial": false,
          "isTrending": false,
          "isFavorite": false,
          "badge": null
        },
        {
          "name": "Lychee",
          "description": "Lychee - Fresh and delicious toppings",
          "category": "Toppings",
          "price": "15",
          "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
          "flavorNotes": "Delicious toppings",
          "isSpecial": false,
          "isTrending": false,
          "isFavorite": false,
          "badge": null
        },
        {
          "name": "Pineapple",
          "description": "Pineapple - Fresh and delicious toppings",
          "category": "Toppings",
          "price": "15",
          "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
          "flavorNotes": "Delicious toppings",
          "isSpecial": false,
          "isTrending": false,
          "isFavorite": false,
          "badge": null
        },
        {
          "name": "Nutella",
          "description": "Nutella - Fresh and delicious toppings",
          "category": "Toppings",
          "price": "20",
          "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
          "flavorNotes": "Delicious toppings",
          "isSpecial": false,
          "isTrending": false,
          "isFavorite": false,
          "badge": null
        },
        {
          "name": "Chocolate Syrup",
          "description": "Chocolate Syrup - Fresh and delicious toppings",
          "category": "Toppings",
          "price": "20",
          "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
          "flavorNotes": "Delicious toppings",
          "isSpecial": false,
          "isTrending": false,
          "isFavorite": false,
          "badge": null
        },
        {
          "name": "Kiwi Crush",
          "description": "Kiwi Crush - Fresh and delicious toppings",
          "category": "Toppings",
          "price": "15",
          "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
          "flavorNotes": "Delicious toppings",
          "isSpecial": false,
          "isTrending": false,
          "isFavorite": false,
          "badge": null
        },
        {
          "name": "Strawberry",
          "description": "Strawberry - Fresh and delicious toppings",
          "category": "Toppings",
          "price": "15",
          "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
          "flavorNotes": "Delicious toppings",
          "isSpecial": false,
          "isTrending": false,
          "isFavorite": false,
          "badge": null
        },
        {
          "name": "Mango",
          "description": "Mango - Fresh and delicious toppings",
          "category": "Toppings",
          "price": "15",
          "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
          "flavorNotes": "Delicious toppings",
          "isSpecial": false,
          "isTrending": false,
          "isFavorite": false,
          "badge": null
        },
        {
          "name": "Cherry",
          "description": "Cherry - Fresh and delicious toppings",
          "category": "Toppings",
          "price": "15",
          "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
          "flavorNotes": "Delicious toppings",
          "isSpecial": false,
          "isTrending": false,
          "isFavorite": false,
          "badge": null
        },
        {
          "name": "Whip Cream",
          "description": "Whip Cream - Fresh and delicious toppings",
          "category": "Toppings",
          "price": "20",
          "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
          "flavorNotes": "Delicious toppings",
          "isSpecial": false,
          "isTrending": false,
          "isFavorite": false,
          "badge": null
        },
        {
          "name": "Dark Choco Chips",
          "description": "Dark Choco Chips - Fresh and delicious toppings",
          "category": "Toppings",
          "price": "15",
          "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
          "flavorNotes": "Delicious toppings",
          "isSpecial": false,
          "isTrending": false,
          "isFavorite": false,
          "badge": null
        },
        {
          "name": "Waffle Cone",
          "description": "Waffle Cone - Fresh and delicious toppings",
          "category": "Toppings",
          "price": "10",
          "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
          "flavorNotes": "Delicious toppings",
          "isSpecial": false,
          "isTrending": false,
          "isFavorite": false,
          "badge": null
        },
        {
          "name": "Waffle Cup",
          "description": "Waffle Cup - Fresh and delicious toppings",
          "category": "Toppings",
          "price": "10",
          "imageUrl": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
          "flavorNotes": "Delicious toppings",
          "isSpecial": false,
          "isTrending": false,
          "isFavorite": false,
          "badge": null
        }
      ];

      for (const product of productsData) {
        await storage.createProduct(product);
      }
    }

    // Seed Blogs
    const existingBlogs = await storage.getBlogs();
    if (existingBlogs.length === 0) {
      const blogsData = [
        {
          title: "The Art of Making Perfect Artisanal Ice Cream",
          content: "Learn the secrets behind our creamy textures and unique flavor profiles...",
          author: "Chef Antonio",
          imageUrl: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=800",
          excerpt: "Discover the craftsmanship that goes into every scoop at Frocone.",
          category: "Behind the Scenes"
        },
        {
          title: "Top 5 Summer Flavors You Must Try",
          content: "From Mango Tango to Berry Blast, here are our top picks for the heat...",
          author: "Sarah J.",
          imageUrl: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=800",
          excerpt: "Cool down with our refreshing seasonal specialties.",
          category: "Recommendations"
        }
      ];
      for (const blog of blogsData) {
        await storage.createBlog(blog);
      }
    }

    // Seed FAQs
    const existingFaqs = await storage.getFaqs();
    if (existingFaqs.length === 0) {
      const faqsData = [
        {
          question: "Do you offer vegan options?",
          answer: "Yes! We have a range of fruit-based sorbets that are 100% vegan.",
          category: "Dietary"
        },
        {
          question: "Do you cater for events?",
          answer: "Absolutely! We love being part of fests and college events. Contact us for bulk orders.",
          category: "General"
        }
      ];
      for (const faq of faqsData) {
        await storage.createFaq(faq);
      }
    }

    // Seed Fests
    const existingFests = await storage.getFests();
    if (existingFests.length === 0) {
      const festsData = [
        {
          name: "ATMOS 2024",
          college: "BITS Pilani, Hyderabad",
          description: "Technical fest with amazing workshops and competitions.",
          date: "October 18-20, 2024",
          imageUrl: "https://images.unsplash.com/photo-1540575861501-7ad0582371f3?w=800",
          contactPerson: "Student Council"
        },
        {
          name: "Pearl 2024",
          college: "BITS Pilani, Hyderabad",
          description: "Cultural extravaganza with concerts and dance battles.",
          date: "March 15-17, 2024",
          imageUrl: "https://images.unsplash.com/photo-1459749411177-042180ceea72?w=800",
          contactPerson: "Cultural Committee"
        }
      ];
      for (const fest of festsData) {
        await storage.createFest(fest);
      }
    }

    const existingTestimonials = await storage.getTestimonials();
    if (existingTestimonials.length === 0) {
      const testimonialsData = [
        {
          customerName: "Priya Sharma",
          rating: 5,
          comment: "Best ice cream in Hyderabad! The mango tango is absolutely divine.",
          avatar: null,
          isVerified: true,
        },
        {
          customerName: "Rahul Mehta",
          rating: 5,
          comment: "The brownie sundae is heaven on a plate. Perfect spot for dessert dates!",
          avatar: null,
          isVerified: true,
        }
      ];

      for (const testimonialData of testimonialsData) {
        await db.insert(testimonials).values(testimonialData);
      }
    }

    console.log("✅ Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}
