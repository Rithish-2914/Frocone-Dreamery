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
        totalAmount: z.coerce.number(),
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

  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  try {
    const existingProducts = await storage.getProducts();
    
    if (existingProducts.length === 0) {
      const products = [
        {
          name: "Classic Vanilla Dream",
          description: "Rich Madagascar vanilla in premium cream. Pure bliss in every scoop.",
          category: "Scoops",
          price: "120",
          imageUrl: "/api/placeholder/400/300",
          flavorNotes: "Creamy, sweet vanilla with hints of caramel",
          isSpecial: false,
          isTrending: true,
          isFavorite: true,
          badge: "Customer Favorite",
        },
        {
          name: "Chocolate Fudge Brownie",
          description: "Dark Belgian chocolate with chunks of fudgy brownies.",
          category: "Scoops",
          price: "140",
          imageUrl: "/api/placeholder/400/300",
          flavorNotes: "Rich chocolate, gooey brownie chunks",
          isSpecial: false,
          isTrending: true,
          isFavorite: false,
          badge: "Trending Now",
        },
        {
          name: "Mango Tango",
          description: "Fresh Alphonso mango pulp swirled into creamy goodness.",
          category: "Scoops",
          price: "130",
          imageUrl: "/api/placeholder/400/300",
          flavorNotes: "Sweet tropical mango, smooth and fruity",
          isSpecial: true,
          isTrending: false,
          isFavorite: false,
          badge: "Limited Edition",
        },
        {
          name: "Mint Chocolate Chip",
          description: "Cool mint ice cream studded with dark chocolate chips.",
          category: "Scoops",
          price: "135",
          imageUrl: "/api/placeholder/400/300",
          flavorNotes: "Refreshing mint, crunchy chocolate",
          isSpecial: false,
          isTrending: false,
          isFavorite: false,
          badge: null,
        },
        {
          name: "Strawberry Cheesecake",
          description: "Creamy cheesecake ice cream with strawberry swirls and graham cracker crumbs.",
          category: "Scoops",
          price: "150",
          imageUrl: "/api/placeholder/400/300",
          flavorNotes: "Tangy cheesecake, sweet berries, buttery crust",
          isSpecial: true,
          isTrending: true,
          isFavorite: true,
          badge: "Limited Edition",
        },
        {
          name: "Hot Fudge Sundae",
          description: "Three scoops topped with hot fudge, whipped cream, and a cherry.",
          category: "Sundaes",
          price: "220",
          imageUrl: "/api/placeholder/400/300",
          flavorNotes: "Warm fudge, cold cream, perfect contrast",
          isSpecial: false,
          isTrending: true,
          isFavorite: false,
          badge: "Customer Favorite",
        },
        {
          name: "Cookie Monster Sundae",
          description: "Vanilla and chocolate ice cream loaded with cookies and cookie dough.",
          category: "Sundaes",
          price: "240",
          imageUrl: "/api/placeholder/400/300",
          flavorNotes: "Cookie heaven, crunchy and creamy",
          isSpecial: false,
          isTrending: false,
          isFavorite: true,
          badge: null,
        },
        {
          name: "Oreo Shake",
          description: "Thick milkshake blended with Oreo cookies and vanilla ice cream.",
          category: "Shakes",
          price: "180",
          imageUrl: "/api/placeholder/400/300",
          flavorNotes: "Cookies and cream, smooth and thick",
          isSpecial: false,
          isTrending: true,
          isFavorite: false,
          badge: "Trending Now",
        },
        {
          name: "Chocolate Peanut Butter Shake",
          description: "Rich chocolate shake with creamy peanut butter swirl.",
          category: "Shakes",
          price: "190",
          imageUrl: "/api/placeholder/400/300",
          flavorNotes: "Chocolate-peanut butter perfection",
          isSpecial: false,
          isTrending: false,
          isFavorite: false,
          badge: null,
        },
        {
          name: "Berry Blast Shake",
          description: "Mixed berry shake with strawberry, blueberry, and raspberry.",
          category: "Shakes",
          price: "185",
          imageUrl: "/api/placeholder/400/300",
          flavorNotes: "Fresh berries, tangy and sweet",
          isSpecial: true,
          isTrending: false,
          isFavorite: false,
          badge: "Only Available This Week",
        },
        {
          name: "Belgian Waffle",
          description: "Crispy waffle topped with ice cream, whipped cream, and syrup.",
          category: "Waffles",
          price: "200",
          imageUrl: "/api/placeholder/400/300",
          flavorNotes: "Warm waffle, cold ice cream, maple syrup",
          isSpecial: false,
          isTrending: false,
          isFavorite: true,
          badge: null,
        },
        {
          name: "Nutella Waffle",
          description: "Golden waffle drizzled with Nutella and topped with vanilla ice cream.",
          category: "Waffles",
          price: "220",
          imageUrl: "/api/placeholder/400/300",
          flavorNotes: "Hazelnut chocolate, crispy waffle",
          isSpecial: false,
          isTrending: true,
          isFavorite: false,
          badge: "Customer Favorite",
        },
        {
          name: "Death by Chocolate Brownie",
          description: "Warm fudgy brownie topped with chocolate ice cream and hot fudge.",
          category: "Brownies",
          price: "210",
          imageUrl: "/api/placeholder/400/300",
          flavorNotes: "Triple chocolate overload, gooey and rich",
          isSpecial: false,
          isTrending: true,
          isFavorite: true,
          badge: "Trending Now",
        },
        {
          name: "Caramel Brownie Delight",
          description: "Brownie with vanilla ice cream, caramel sauce, and pecans.",
          category: "Brownies",
          price: "215",
          imageUrl: "/api/placeholder/400/300",
          flavorNotes: "Sweet caramel, crunchy pecans, fudgy brownie",
          isSpecial: false,
          isTrending: false,
          isFavorite: false,
          badge: null,
        },
        {
          name: "Red Velvet Brownie",
          description: "Red velvet brownie with cream cheese ice cream and white chocolate.",
          category: "Brownies",
          price: "225",
          imageUrl: "/api/placeholder/400/300",
          flavorNotes: "Tangy cream cheese, sweet red velvet",
          isSpecial: true,
          isTrending: false,
          isFavorite: false,
          badge: "Limited Edition",
        },
      ];

      for (const product of products) {
        await storage.createProduct(product);
      }

      const testimonialsData = [
        {
          customerName: "Priya Sharma",
          rating: 5,
          comment: "Best ice cream in Hyderabad! The mango tango is absolutely divine. Can't stop coming back!",
          avatar: null,
          isVerified: true,
        },
        {
          customerName: "Rahul Mehta",
          rating: 5,
          comment: "The brownie sundae is heaven on a plate. Perfect spot for dessert dates!",
          avatar: null,
          isVerified: true,
        },
        {
          customerName: "Ananya Singh",
          rating: 5,
          comment: "Love the vibe and the quality! Every scoop hits different indeed. My go-to dessert place.",
          avatar: null,
          isVerified: true,
        },
        {
          customerName: "Karthik Reddy",
          rating: 4,
          comment: "Amazing flavors and great service. The waffles are crispy and delicious!",
          avatar: null,
          isVerified: true,
        },
        {
          customerName: "Sneha Patel",
          rating: 5,
          comment: "Instagram-worthy presentation and tastes even better! Highly recommend the chocolate fudge brownie.",
          avatar: null,
          isVerified: true,
        },
      ];

      for (const testimonialData of testimonialsData) {
        const [existing] = await db.select().from(testimonials).where(eq(testimonials.customerName, testimonialData.customerName));
        if (!existing) {
          await db.insert(testimonials).values(testimonialData);
        }
      }

      console.log("✅ Database seeded successfully with products and testimonials!");
    }
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}
