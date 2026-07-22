import { smartBuyersGuideContent } from "./blog-content/smart-buyers-guide";

export type BlogContentBlock =
  | {
      type: "heading";
      text: string;
    }
  | {
      type: "paragraph";
      text: string;
    }
  | {
      type: "list";
      items: string[];
    }
  | {
      type: "image";
      src: string;
      alt: string;
    };

export type Blog = {
  id: number;
  title: string;
  excerpt: string;
  slug: string;
  category: string;
  categorySlug: string;
  date: string;
  author: string;
  image: string;
  heroLabel?: string;
  heroText?: string;
  metaTitle?: string;
  metaDescription?: string;
  content: BlogContentBlock[];
};

function createSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

const blogList = [
  {
    id: 1,
    title:
      "The Smart Buyer's Guide to Buying a Villa: Questions Every Homebuyer Should Ask Before Investing",
    excerpt:
      "Discover the essential questions every villa buyer should ask before investing, from legal approvals and construction quality to pricing and builder credibility.",
    slug: "smart-buyers-guide-to-buying-a-villa",
    category: "Villa Buying Guide",
    date: "2026-07-22",
    author: "Dev Appartments",
    image: "/images/blogs/villa-buyers-guide.jpg",
    heroLabel: "Smart Villa Investment",
    heroText:
      "The right questions today can lead to the right home and a secure investment for generations.",
    metaTitle:
      "The Smart Buyer's Guide to Buying a Villa | Divya Desam by Dev Appartments",
    metaDescription:
      "Planning to buy a villa? Discover the key factors every homebuyer should check, from legal approvals and construction quality to location, pricing and builder credibility.",
    content: smartBuyersGuideContent,
  },
] satisfies Omit<Blog, "categorySlug">[];

export const blogs: Blog[] = blogList.map((blog) => ({
  ...blog,
  categorySlug: createSlug(blog.category),
}));

export const sortedBlogs = [...blogs].sort(
  (a, b) =>
    new Date(b.date).getTime() -
    new Date(a.date).getTime(),
);

export const categories = Array.from(
  new Map(
    sortedBlogs.map((blog) => [
      blog.categorySlug,
      {
        name: blog.category,
        slug: blog.categorySlug,
        count: sortedBlogs.filter(
          (item) =>
            item.categorySlug === blog.categorySlug,
        ).length,
      },
    ]),
  ).values(),
);

export function getBlogByRoute(
  categorySlug: string,
  slug: string,
): Blog | undefined {
  return blogs.find(
    (blog) =>
      blog.categorySlug === categorySlug &&
      blog.slug === slug,
  );
}

export function getCategoryBySlug(
  categorySlug: string,
) {
  return categories.find(
    (category) => category.slug === categorySlug,
  );
}

export function getBlogsByCategory(
  categorySlug: string,
): Blog[] {
  return sortedBlogs.filter(
    (blog) => blog.categorySlug === categorySlug,
  );
}

export function getRelatedBlogs(
  currentBlog: Blog,
): Blog[] {
  const sameCategoryBlogs = sortedBlogs
    .filter((blog) => blog.id !== currentBlog.id)
    .filter(
      (blog) =>
        blog.categorySlug ===
        currentBlog.categorySlug,
    );

  if (sameCategoryBlogs.length >= 3) {
    return sameCategoryBlogs.slice(0, 3);
  }

  const otherBlogs = sortedBlogs.filter(
    (blog) =>
      blog.id !== currentBlog.id &&
      blog.categorySlug !==
        currentBlog.categorySlug,
  );

  return [...sameCategoryBlogs, ...otherBlogs].slice(
    0,
    3,
  );
}