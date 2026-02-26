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
          name: "Classic Vanilla Dream",
          description: "Rich Madagascar vanilla in premium cream. Pure bliss in every scoop.",
          category: "Scoops",
          price: "120",
          imageUrl: "https://images.unsplash.com/photo-1570197788417-0e93323c93bf?w=800",
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
          imageUrl: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800",
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
          imageUrl: "https://images.unsplash.com/photo-1590085423125-673e1dc1938b?w=800",
          flavorNotes: "Sweet tropical mango, smooth and fruity",
          isSpecial: true,
          isTrending: false,
          isFavorite: false,
          badge: "Limited Edition",
        },
        {
          name: "Oreo Shake",
          description: "Thick milkshake blended with Oreo cookies and vanilla ice cream.",
          category: "Shakes",
          price: "180",
          imageUrl: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800",
          flavorNotes: "Cookies and cream, smooth and thick",
          isSpecial: false,
          isTrending: true,
          isFavorite: false,
          badge: "Trending Now",
        },
        {
          name: "Belgian Waffle",
          description: "Crispy waffle topped with ice cream, whipped cream, and syrup.",
          category: "Waffles",
          price: "200",
          imageUrl: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=800",
          flavorNotes: "Warm waffle, cold ice cream, maple syrup",
          isSpecial: false,
          isTrending: false,
          isFavorite: true,
          badge: null,
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
