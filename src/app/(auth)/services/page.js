
import Services from "./services"; // Import the client-side Blog component

export async function generateMetadata() {

  const canonicalUrl = `${process.env.APPLE_REDIRECT_URL}/services`;

    return {
    title: "Top Spa Services for Relaxation and Wellness",
      description: "Find the best spa services near you, including deep tissue, Swedish, Thai massage, facials, and luxury wellness treatments. Book instantly with Sitback.",
      alternates: {
        canonical: canonicalUrl,
      },
    };

  }

// This is the server-side component that renders the page
export default async function ServicesPage() {

  return (
    <div>
      <Services />
    </div>
  );
}
