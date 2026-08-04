import FAQS from "./faqs";
import { API_ROUTER } from "@/services/apiRouter";
import axiosApiCall from "@/utils/axios";


async function fetchSpaMetadata() {
  try {


    const res = await axiosApiCall.get(API_ROUTER?.GET_FAQS);

    if (res?.status && res?.data) {
      return res.data;
    }
    return null;
  } catch (error) {
    console.error("Error fetching faqs metadata:", error);
    return null;
  }
}

export async function generateMetadata() {

  // ✅ Use full URL (IMPORTANT)
  let canonicalUrl = process.env.APPLE_REDIRECT_URL + "/faqs";


  // ✅ fallback
  return {
    title: "Sitback - Best Spa Booking App for Services Near You",
    description:
      "Sitback is the best spa booking app to discover verified spas, compare prices, check real-time availability, and book massage services near you.",
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

// ✅ Server Component
export default async function FAQSPage() {
  const faqs = await fetchSpaMetadata();
  return (
    <div>
       <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs?.data.map((f) => ({
              "@type": "Question",
              name: f.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: f.answer
              }
            }))
          })
        }}
      />

      <FAQS />
    </div>
  );
}
