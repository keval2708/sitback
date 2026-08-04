// app/(auth)/spas/page.js

import Spa from "./spa";

export async function generateMetadata() {

  // ✅ Use full URL (IMPORTANT)
  let canonicalUrl = process.env.APPLE_REDIRECT_URL + "/spas";


  // ✅ fallback
  return {
    title: "Best Spas Near You for Mind and Body Relaxation",
    description:
      "Discover the best spas near you with Sitback. Browse trusted spa partners, compare services and prices, check real-time availability, and book your ideal spa visit in minutes.",
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

// ✅ Server Component
export default function SpaPage() {
  return (
    <div>
      <Spa />
    </div>
  );
}
