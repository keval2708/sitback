import { API_ROUTER } from "@/services/apiRouter";
import axiosApiCall from "@/utils/axios";

export async function GET() {
  const baseUrl = process.env.APPLE_REDIRECT_URL || "";
  const today = new Date().toISOString();

  let blogItems = [];

  try {
    const blogSlug = await axiosApiCall.get(API_ROUTER?.BLOG_SLUG_LIST);
    blogItems = blogSlug?.data?.data || [];
  } catch {}

  const blogIndexUrl = `
      <url>
        <loc>${(`${baseUrl}/blog`)}</loc>
        <lastmod>${today}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1</priority>
      </url>`;

  const urls = blogItems
    .filter((item) => item?.slug)
    .map((item) => {
      return `
      <url>
        <loc>${(`${baseUrl}/blog/${item.slug}`)}</loc>
        <lastmod>${today}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${blogIndexUrl}${urls}
    </urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
