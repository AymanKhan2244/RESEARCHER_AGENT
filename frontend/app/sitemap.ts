import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://researcher-agent-e9cv.vercel.app",
      lastModified: new Date(),
    },
  ];
}