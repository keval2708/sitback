// app/(auth)/spas/page.js

import moment from "moment";
import Service from "./service";
import { API_ROUTER } from "@/services/apiRouter";
import axiosApiCall from "@/utils/axios";

async function fetchSpaMetadata(serviceId) {
  try {
    if (!serviceId) return null;

    const param = {
      page: 1,
      perpage: 1,
      serviceid: serviceId,
      date: moment(new Date()).format("MM-DD-yyyy"),
    };

    const response = await axiosApiCall.post(
      API_ROUTER?.GET_SPA_LIST_META,
      param
    );

    if (response?.status && response?.data) {
      return response.data;
    }
    return null;
  } catch (error) {
    console.error("Error fetching spa metadata:", error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const id = params?.service;
  const spaMetadata = await fetchSpaMetadata(id);

  const canonicalUrl = id
    ? `${process.env.APPLE_REDIRECT_URL}/services/${id}`
    : `${process.env.APPLE_REDIRECT_URL}/services`;

  return {
    title: spaMetadata?.meta_title || "Best Spas Near You for Mind and Body Relaxation",
    description: spaMetadata?.meta_description || "Discover the best spas near you with Sitback. Browse trusted spa partners, compare services and prices, check real-time availability, and book your ideal spa visit in minutes.",
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function SpaPage({ params }) {
  const id = params?.service;
  const spaMetadata = await fetchSpaMetadata(id);
  const BASE_URL = process.env.APPLE_REDIRECT_URL;
  const url = id ? `${BASE_URL}/services/${id}` : `${BASE_URL}/services`;

  return (
    <div>

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
                name: "Services",
                item: `${BASE_URL}/services`
              },
              {
                "@type": "ListItem",
                position: 3,
                name: spaMetadata.servicename,
                item: url
              }
            ]
          })
        }}
      />

      {/* Service Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "@id": `${url}#service`,
            name: spaMetadata.servicename,
            description: spaMetadata.meta_description,
            url: url,
            serviceType: spaMetadata.servicename,
            provider: {
              "@type": "Organization",
              name: "Sitback",
              url: BASE_URL
            }
          })
        }}
      />

      <Service />
    </div>
  );
}
