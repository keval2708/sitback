import ComingSoon from './(auth)/comingsoon/page'
// import Login from './(auth)/login/page'
// import { useSelector } from 'react-redux';
// import { store } from '@/redux/store';

const canonicalUrl = `${process.env.APPLE_REDIRECT_URL}`;

export const metadata = {
  title: "Sitback - Best Spa Booking App for Services Near You",
  description: "Sitback is the best spa booking app to discover verified spas, compare prices, check real-time availability, and book massage services near you.",
   alternates: {
    canonical: canonicalUrl,
  },
}

export default function Home() {

  const BASE_URL = process.env.APPLE_REDIRECT_URL;
  const LOGO_URL = `${BASE_URL}/sitback-white-logo.svg`;

  return (
    <>
     <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "@id": `${BASE_URL}/#organization`,
            name: "Sitback",
            url: BASE_URL,
            logo: LOGO_URL
          })
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "@id": `${BASE_URL}/#website`,
            name: "Sitback",
            url: BASE_URL,
            potentialAction: {
              "@type": "SearchAction",
              target: `${BASE_URL}/spas?q={search_term_string}`,
              "query-input": "required name=search_term_string"
            }
          })
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "@id": `${BASE_URL}/#app`,
            name: "Sitback Spa Booking App",
            applicationCategory: "HealthApplication",
            operatingSystem: "iOS, Android",
            url: BASE_URL,
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD"
            }
          })
        }}
      />
      <ComingSoon />
    </>
  )
}
