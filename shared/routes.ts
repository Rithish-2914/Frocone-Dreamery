import { z } from 'zod';
import { insertProductSchema, insertOrderSchema, insertContactInquirySchema, insertBlogSchema, insertFaqSchema, insertFestSchema } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  products: {
    list: {
      method: 'GET' as const,
      path: '/api/products' as const,
      input: z.object({
        category: z.string().optional(),
        special: z.string().optional(),
        trending: z.string().optional(),
      }).optional(),
      responses: {
        200: z.array(z.any()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/products/:id' as const,
      responses: {
        200: z.any(),
        404: errorSchemas.notFound,
      },
    },
  },
  orders: {
    create: {
      method: 'POST' as const,
      path: '/api/orders' as const,
      input: insertOrderSchema,
      responses: {
        201: z.any(),
        400: errorSchemas.validation,
      },
    },
  },
  contact: {
    create: {
      method: 'POST' as const,
      path: '/api/contact' as const,
      input: insertContactInquirySchema,
      responses: {
        201: z.any(),
        400: errorSchemas.validation,
      },
    },
  },
  testimonials: {
    list: {
      method: 'GET' as const,
      path: '/api/testimonials' as const,
      responses: {
        200: z.array(z.any()),
      },
    },
  },
  blogs: {
    list: {
      method: 'GET' as const,
      path: '/api/blogs' as const,
      responses: {
        200: z.array(z.any()),
      },
    },
  },
  faqs: {
    list: {
      method: 'GET' as const,
      path: '/api/faqs' as const,
      responses: {
        200: z.array(z.any()),
      },
    },
  },
  fests: {
    list: {
      method: 'GET' as const,
      path: '/api/fests' as const,
      responses: {
        200: z.array(z.any()),
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

export type ProductInput = z.infer<typeof insertProductSchema>;
export type OrderInput = z.infer<typeof insertOrderSchema>;
export type ContactInput = z.infer<typeof insertContactInquirySchema>;
export type BlogInput = z.infer<typeof insertBlogSchema>;
export type FaqInput = z.infer<typeof insertFaqSchema>;
export type FestInput = z.infer<typeof insertFestSchema>;
