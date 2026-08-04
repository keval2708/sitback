// app/blog/[slug]/page.js
import moment from "moment";
import Blog from "./Blog";
import { API_ROUTER } from "@/services/apiRouter";
import axiosApiCall from "@/utils/axios";

async function fetchBlogData(slug) {
  try {
    const param = { slug };
    const response = await axiosApiCall.post(API_ROUTER?.BLOG_DETAILS, param);

    if (response?.status && response?.data?.data) {
      return response?.data?.data;
    }
    return null;
  } catch (error) {
    console.error("Error fetching blog data:", error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const blogDetails = await fetchBlogData(params?.slug);
  const canonicalUrl = params?.slug
    ? `${process.env.APPLE_REDIRECT_URL}/blog/${params.slug}`
    : `${process.env.APPLE_REDIRECT_URL}/blog`;

  return {
    title: blogDetails?.title || "Sitback - Service Provider",
    description: blogDetails?.sort_desc || "Sitback and relax",
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function BlogPage({ params }) {
  const blogDetails = await fetchBlogData(params?.slug);
  const BASE_URL = process.env.APPLE_REDIRECT_URL;
  const url = `${BASE_URL}/blog/${blogDetails?.slug}`;
  const LOGO_URL = `${BASE_URL}/sitback-white-logo.svg`;
  const formattedPublishedDate = blogDetails?.createdAt
  ? moment(blogDetails?.createdAt).format('YYYY-MM-DD')
  : null;

const formattedModifiedDate = blogDetails?.updatedAt
  ? moment(blogDetails?.updatedAt).format('YYYY-MM-DD')
  : null;

  return (
    <div>

 {/* Breadcrumb */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: BASE_URL
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Blog",
                item: `${BASE_URL}/blog`
              },
              {
                "@type": "ListItem",
                position: 3,
                name: blogDetails?.title,
                item: url
              }
            ]
          })
        }}
      />

      {/* Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "@id": `${url}#article`,
            headline: blogDetails?.title,
            description: blogDetails?.sort_desc,
            url: url,
            datePublished:formattedPublishedDate,
            dateModified: formattedModifiedDate,
            image: blogDetails?.image,
            author: {
              "@type": "Person",
              name: blogDetails?.authorName
            },
            publisher: {
              "@type": "Organization",
              name: "Sitback",
              url: BASE_URL,
              logo: {
                "@type": "ImageObject",
                url: LOGO_URL
              }
            }
          })
        }}
      />
      <Blog />
    </div>
  );
}
