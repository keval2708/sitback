// app/blog/[slug]/page.js
// Import the client-side Blog component
import SpaLocation from "./spaLocation";
import { API_ROUTER } from "@/services/apiRouter";
import axiosApiCall from "@/utils/axios";

export async function generateMetadata({ params }) {
  // Fetch the blog post data based on the `slug` (or `id`)
  let param = { cityslug: params?.slug };
  let canonicalUrl = process.env.APPLE_REDIRECT_URL + "spas/location/";

  if (param) {
    canonicalUrl = `${process.env.APPLE_REDIRECT_URL}/spas/location/${params?.slug}`;
  }

  const response = await axiosApiCall.post(API_ROUTER?.GET_ALL_SPA_META_DATA, param);
  if (response?.status && response?.data?.data) {
    const spaData = response?.data?.data;

    return {
      title: spaData?.meta_title || "Sitback - Service Provider",
      description:  spaData?.meta_description || '',
      alternates: {
        canonical: canonicalUrl,
      },
    };
  }

  return {
    title: "Location-Sitback",
    description: "Sitback and relax",
    alternates: {
        canonical: canonicalUrl,
      },
  };
}

// This is the server-side component that renders the page
export default async function BlogPage() {
  //const blogData = await getBlogData(params.slug);

  return (
    <div>
      {/* You can pass the fetched data to the Blog component */}
      <SpaLocation />
    </div>
  );
}
