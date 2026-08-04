import React, { useEffect, useState } from "react";
import { Container, } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useToaster } from "@/hooks"; // Assuming you have a custom hook for toasts
import { PATH_QUICKBOOKING } from "@/routes/paths";
import { API_ROUTER } from "@/services/apiRouter";
import { Button, Image, } from "@/styles/global/main.style";
import axiosApiCall from "@/utils/axios";

export const Amenities = (slug) => {
  // Hooks
  const { toaster } = useToaster();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [spaAmenities,setSpaAmenities]  = useState([]);




  const listAmenities = async () => {

    try {
      setLoading(true); // Set loading to true when API request starts
       let param = {
        slug: slug?.slug,
      };
      const res = await axiosApiCall.post(API_ROUTER?.HOME_LIST_AMENITIES,param);
      //return
      if (!res?.status) {
        //toaster(res?.message, TOAST_TYPES.ERROR);
        setLoading(false); // Set loading to false if API call fails
      } else {
        setSpaAmenities(res?.data?.data);
        setLoading(false); // Set loading to false once data is fetched
      }
    } catch (error) {
      //toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
      setLoading(false); // Set loading to false if there's an error
    }
  };


  const showBookingModel = () => {
    let link = `${window?.location?.origin}${PATH_QUICKBOOKING?.quickbooking}/${slug?.slug}`;
    window.location.href = link;
  }


  useEffect(() => {
    listAmenities()
  }, []);

  return (
    <>
      <div className="amenities-main-updated-content-div">
        <Container fluid>
          <div className="amenities-display-wrapper">
          {spaAmenities && spaAmenities.length > 0 ? (
            <div className="amenities-main-div">
              {spaAmenities.map((data, key) => (
                <span key={key}>
                {data?.name}

                </span>
              ))}
               <div className="spa-detail-mobile-btn-div">
                <Button className="request-btn" onClick={() => { showBookingModel()}}>Request An Appointment</Button>
              </div>
            </div>
          ) : (
            <div className="no-data amenities-no-data-div" style={{ margin: "50px auto 0", textAlign: "center" }}>
              {/* <p>No Amenities available.</p> */}
              <div className="amenities-display-div">
                <div className="amenities-inner-div">
                  <div className="amenities-image-div">
                    <Image
                      alt="sitback"
                      isContainImg={true}
                      src="/images/amenities-no-updated-image.png"
                    />
                  </div>
                  <p>No Amenities Available.</p>
                </div>
              </div>
              <div className="spa-detail-mobile-btn-div">
                <Button className="request-btn" onClick={() => { showBookingModel()}}>Request An Appointment</Button>
              </div>
            </div>
          )}

          </div>

        </Container>
      </div>
    </>
  );
};
