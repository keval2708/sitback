import { API_ROUTER } from "@/services/apiRouter";
import axiosApiCall from "@/utils/axios";

export async function GET() {
  const baseUrl = process.env.APPLE_REDIRECT_URL || "";
  const today = new Date().toISOString();

  let cityItems = [];

  try {
    const citySlug = await axiosApiCall.get(API_ROUTER?.CITY_SLUG_LIST);
    cityItems = citySlug?.data?.data || [];
  } catch {}


  const urls = cityItems
    .filter((item) => item?.cityslug)
    .map((item) => {
      return `
      <url>
        <loc>${(`${baseUrl}/spas/location/${item.cityslug}`)}</loc>
        <lastmod>${today}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}
    </urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
