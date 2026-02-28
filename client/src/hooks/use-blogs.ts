import { MENU_DATA } from "@shared/menu-data";

export function useBlogs() {
  const blogs = MENU_DATA.blogs.map((blog, idx) => ({
    id: idx + 1,
    title: blog.title,
    content: blog.content,
    author: "Frocone Team",
    imageUrl: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=800",
    excerpt: blog.content.substring(0, 100) + "...",
    category: "Dessert Guide",
    createdAt: new Date()
  }));

  return { data: blogs, isLoading: false };
}
