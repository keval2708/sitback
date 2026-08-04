
import Blog from "./blog"; // Import the client-side Blog component

export async function generateMetadata() {

  let canonicalUrl = `${process.env.APPLE_REDIRECT_URL}/blog`;

  return {
    title: "Sitback Blog – Spa Booking, Services & Wellness Tips",
    description: "Discover expert spa booking tips, treatment guides, and wellness insights on the Sitback blog. Learn how to choose the right services and make every spa visit better.",
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

// This is the server-side component that renders the page
export default async function ServicesPage() {

  return (
    <div>
      <Blog />
    </div>
  );
}
