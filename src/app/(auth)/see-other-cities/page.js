// app/blog/[slug]/page.js
import Spa from "./Seeothercity"; // Import the client-side Blog component

export async function generateMetadata() {

  return {
    title: "Find the Top Rated &  Best Spas in Scottsdale Arizona",
          description: "Discover the Best Spas in Scottsdale Arizona! Relax at top-rated Scottsdale spas offering luxury treatments and serene experiences.",
  };
}

// This is the server-side component that renders the page
export default async function BlogPage() {
  //const blogData = await getBlogData(params.slug);

  return (
    <div>
      {/* You can pass the fetched data to the Blog component */}
      <Spa />
    </div>
  );
}
