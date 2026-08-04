import { API_ROUTER } from "@/services/apiRouter";
import axiosApiCall from "@/utils/axios";

export async function GET() {
  const baseUrl = process.env.APPLE_REDIRECT_URL || "";
  const today = new Date().toISOString();

  let spaItems = [];

  try {
    const spaSlug = await axiosApiCall.get(API_ROUTER?.SPA_SLUG_LIST);
    spaItems = spaSlug?.data?.data || [];
  } catch {}

  const spaIndexUrl = `
      <url>
        <loc>${(`${baseUrl}/spas`)}</loc>
        <lastmod>${today}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1</priority>
      </url>`;

  const urls = spaItems
    .filter((item) => item?.slug)
    .map((item) => {
      return `
      <url>
        <loc>${(`${baseUrl}/spas/${item.slug}`)}</loc>
        <lastmod>${today}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${spaIndexUrl}${urls}
    </urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
