
import Services from "./location"; // Import the client-side Blog component
import { API_ROUTER } from "@/services/apiRouter";
import axiosApiCall from "@/utils/axios";

export async function generateMetadata({params}) {
  let param = { cityslug: params?.location, serviceslug: params?.service};
  let canonicalUrl = process.env.APPLE_REDIRECT_URL + "/services";
  if (param) {
    canonicalUrl = `${process.env.APPLE_REDIRECT_URL}/services/${params?.service}/${params?.location}`;
  }


  const response = await axiosApiCall.post(API_ROUTER?.GET_ALL_SPA_LIST_SERVICES_SLUG_META, param);
  if (response?.status && response?.data?.data) {
    const spaData = response?.data?.data;

    return {
      title: spaData?.meta_title || "Sitback - Service Provider",
      description:  spaData?.meta_description || '',
      alternates: {
        canonical: canonicalUrl,
      },
    };
  }
   return {
    title: "Location-Sitback",
    description: "Sitback and relax",
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
