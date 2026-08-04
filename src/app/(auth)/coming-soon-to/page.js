
import Services from "./coming-soon-to"; // Import the client-side Blog component

export async function generateMetadata() {



  return {
    title: "Sitback - Best Spa Booking App for Services Near You",
     description: 'Sitback is the best spa booking app to discover verified spas, compare prices, check real-time availability, and book massage services near you.',
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
