import { API_ROUTER } from "@/services/apiRouter";
import axiosApiCall from "@/utils/axios";

export async function GET() {
  const baseUrl = process.env.APPLE_REDIRECT_URL || "";
  const today = new Date().toISOString();

  let serviceItems = [];

  try {
    const serviceSlug = await axiosApiCall.get(API_ROUTER?.SERVICE_SLUG_LIST);
    serviceItems = serviceSlug?.data?.data || [];
  } catch {}

  const serviceIndexUrl = `
      <url>
        <loc>${(`${baseUrl}/services`)}</loc>
        <lastmod>${today}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1</priority>
      </url>`;

  const urls = serviceItems
    .filter((item) => item?.slug)
    .map((item) => {
      return `
      <url>
        <loc>${(`${baseUrl}/services/${item.slug}`)}</loc>
        <lastmod>${today}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${serviceIndexUrl}${urls}
    </urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
