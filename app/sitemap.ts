import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.devappartments.com";

  const routes = [
    {
      path: "",
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    {
      path: "/about-us",
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      path: "/projects",
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      path: "/projects/ongoing-projects",
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      path: "/projects/recent-projects",
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      path: "/projects/completed-projects",
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      path: "/dream-destination",
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      path: "/divya-desam",
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      path: "/blog",
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      path: "/blog/villa-buying-guide/smart-buyers-guide-to-buying-a-villa",
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      path: "/contact",
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}