
// Import the client-side Blog component

import Massages from "./massages";

export async function generateMetadata() {



  return {
    title: 'Book the Best & Luxury Massage in USA',
  description: 'Explore the best and Luxury Massage in USA for ultimate relaxation. Discover rejuvenating treatments and serene environments designed for your well-being.',
  };
}

// This is the server-side component that renders the page
export default async function MassagesPage() {

  return (
    <div>
      <Massages />
    </div>
  );
}
