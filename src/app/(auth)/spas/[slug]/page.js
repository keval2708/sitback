// app/blog/[slug]/page.js
import SpaDetails from "./spaDetails"; // Import the client-side Blog component
import { API_ROUTER } from "@/services/apiRouter";
import axiosApiCall from "@/utils/axios";

export async function generateMetadata({ params }) {
  // Fetch the blog post data based on the `slug` (or `id`)
  let param = { slug: params?.slug };
  let canonicalUrl = process.env.APPLE_REDIRECT_URL + "spas/";
  const response = await axiosApiCall.post(API_ROUTER?.SPA_DETAILSL, param);

  if (param) {
    canonicalUrl = `${process.env.APPLE_REDIRECT_URL}/spas/${param?.slug}`;
  }

  if (response?.status && response?.data?.data) {
    const spaData = response?.data?.data;

    return {
      title: spaData?.username || "Sitback - Service Provider",
      description:  "Sitback and relax",
      alternates: {
        canonical: canonicalUrl,
      },
    };
  }

  return {
    title: "Blog-Sitback",
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
      <SpaDetails />
    </div>
  );
}
