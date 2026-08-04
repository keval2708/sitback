import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Container, Dropdown, Modal, } from "react-bootstrap";
import { useTranslation } from "react-i18next";
// import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from "react-redux";
import InlineSVG from "svg-inline-react";
import Loader from "@/components/shared/spinner/loader";
import { useToaster } from "@/hooks";
import { authCheckSliceSelector } from "@/redux/authCheck";
import { mySelectedServiceList, mySelectedSpecialist, myServiceList } from "@/redux/service";
import { PATH_QUICKBOOKING } from "@/routes/paths";
import { API_ROUTER } from "@/services/apiRouter";
import { Button, Image, LoginTextTitle, SubTitleText18, } from "@/styles/global/main.style";
import { RadioCheckMark_icon, } from "@/styles/svgs";
import axiosApiCall from "@/utils/axios";

export const SpaProfileServices = (slug) => {
  const { login } = useSelector(authCheckSliceSelector);
  // state

  const [smShowServiceModal, setSmShowServiceModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedSpecialist, setSelectedSpecialist] = useState(null);
  const [serviceDataLoaded, setServiceDataLoaded] = useState(false);

  const [smShowProviderModal, setSmShowProviderModal] = useState(false);
  const [serviceData, setServiceData] = useState([]);

  const [providerData, setProviderData] = useState([]);
  const [Managearget, setManagearget] = useState(null);

  const [smShowEditProviderModal, setSmshowEditProviderModal] = useState(false);
  const [smShowTotalTipsModal, setTotalTipsModal] = useState(false);
  const [EditTarget, setEditTarget] = useState(null);
  const [showTipData, setShowTipData] = useState(null);

  //delete Service model
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [loading, setLoading] = useState(false);

  //delete Employee model

  const [providerColor, setProviderColor] = useState("");



  // hooks
  const { toaster } = useToaster();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { push } = useRouter();

  function hslToHex(h, s, l) {
    // Convert hsl to rgb
    let r, g, b;

    if (s === 0) {
      r = g = b = l; // achromatic
    } else {
      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    // Convert rgb to hex
    const toHex = (x) => {
      const hex = Math.round(x * 255).toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }

  const generateUniqueColor = () => {
    let color;
    let isUnique = false;

    while (!isUnique) {
      const hue = Math.floor(Math.random() * 360);
      const saturation = Math.random() * 0.5;
      const lightness = 0.8 + Math.random() * 0.2;
      // const hslColor = `hsl(${hue}, ${saturation * 100}%, ${lightness * 100}%)`
      // const hexColor = hslToRgb(hue, saturation * 100, lightness * 100);
      color = hslToHex(hue / 360, saturation, lightness);
      isUnique = !providerData?.some((provider) => provider.color === color);
    }
    setProviderColor(color);
  };

  useEffect(() => {
    generateUniqueColor();
  }, [providerData]);

  // useEffect
  useEffect(() => {
    getServices();
    dispatch(mySelectedServiceList(null))
    dispatch(mySelectedSpecialist(null))
    //generateIframes();
    //getProviderList();
    // checkBookableService();
  }, [smShowServiceModal, showDeleteModal]);




  useEffect(() => {
    getEmployee();
  }, [smShowProviderModal, smShowEditProviderModal]);

  const [showModel, setShowModel] = useState(false);
  const handleCloseModel = () => {
    dispatch(mySelectedServiceList(null))
    dispatch(mySelectedSpecialist(null))
    setShowModel(false);
  }
  const handleShowModel = () => setShowModel(true);



  // Service
  const getServices = async () => {
    let param = {
      slug: slug?.slug,
    };
    try {
      setServiceDataLoaded(true);
      const res = await axiosApiCall.post(API_ROUTER?.GET_HOME_SERVICES_LIST,param);
      if (!res?.status) {
        //return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        dispatch(myServiceList(res?.data?.data));
        setServiceData(res?.data?.data);
      }
    } catch (error) {
      //toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setServiceDataLoaded(false);
    }
  };

   const getEmployee = async () => {
    let param = {
      slug: slug?.slug,
    };
    try {
      const res = await axiosApiCall.post(API_ROUTER?.GET_HOME_EMPLOYEE_LIST,param);
      if (!res?.status) {
        //return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        // dispatch(myServiceList(res?.data?.data));
        setProviderData(res?.data?.data);
      }
    } catch (error) {
      //toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  };


 const handleSelectedService = (data) => {
   setSelectedService(data);

    //  dispatch(mySelectedServiceList(
    //     {
    //         value:data?.id,
    //         label:data?.name,
    //         image:data?.image,
    //         price:data?.price,
    //         time: { hour:data?.hour, minute:data?.minutes },
    //         calculatedTime: `(${data?.hour * 60 +data?.minutes} min)`,
    //       }
    //   ));
    //   window.location.href = slug?.linkSpa;
      //handleShowModel()
  };

  const handleSelectedSpecialist = (id) => {
  setSelectedSpecialist(id); // Track selected specialist

};

useEffect(() => {
  if (selectedService && selectedSpecialist) {
    redirectToBookingFlow(selectedService, selectedSpecialist);
  }
}, [selectedService, selectedSpecialist]);

const redirectToBookingFlow = (service, specialist) => {
  // console.log("Selected Service:", service);
  // console.log("Selected Specialist:", specialist);

  if(service && specialist) {
     dispatch(mySelectedServiceList(
        {
            value:service?.id,
            label:service?.name,
            image:service?.image,
            price:service?.price,
            time: { hour:service?.hour, minute:service?.minutes },
            calculatedTime: `(${service?.hour * 60 +service?.minutes} min)`,
          }
      ));
    dispatch (mySelectedSpecialist(specialist))
    setTimeout(() => {
      window.location.href = slug?.linkSpa;
    }, 500);

  }
};

  const formatName = (value) => {
    let name = value.split(" ");
    if (name[1]) return `${name[0]} ${name[1]?.charAt(0).toUpperCase()}`;
    else return `${name[0]}`;
  };

  const showBookingModel = () => {
    let link = `${window?.location?.origin}${PATH_QUICKBOOKING?.quickbooking}/${slug?.slug}`;
    window.location.href = link;
  }


  return (
    <div className="spa-details-main-content-div">
      <Container fluid>
        <div className="massage-specialist-section">
          {/* <SubTitleText16>Massage Specialist</SubTitleText16> */}
          <div className="services-category-wrapper">
            <div className="services-category-list-wrapper services-category-home sqaure-user-icon">
              {providerData?.length > 0 &&
                providerData?.map((provider) => (
                  <div
                    key={provider?.id}
                    className={`grid-cols ${selectedSpecialist === provider?.id ? 'selected-item' : ''} cursor-pointer`}
                    onClick={() => handleSelectedSpecialist(provider?.id)}
                  >
                    <div className="whitebox-wrapper">

                      <Dropdown>

                      </Dropdown>
                      <div className="cursor-pointer">
                        <div className="icon-wrapper">
                          <Image
                            alt="sitback"
                            src={
                              provider?.thumb_image
                                ? provider?.thumb_image
                                : "/images/right-top-img-1.svg"
                            }
                          />
                        </div>
                      </div>
                      {/* <p className="paragraph-text">{formatName(provider?.name)}</p> */}
                      <p className="paragraph-text">{(provider?.name) }</p>
                      {/* <div className="hour-text rating-text">
                        <p>
                          {provider?.employeeReview && provider?.employeeReview == "0" ? (
                            ""
                          ) : <span><InlineSVG src={StarV1_icon} className="global_laguage_icon" /> {provider?.employeeReview}</span>}
                        </p>
                      </div> */}
                      <div className="checkmark-icon-wrapper">
                        <InlineSVG src={RadioCheckMark_icon} className="global_laguage_icon" />
                      </div>
                    </div>
                  </div>
                ))}
            </div>

          </div>
        </div>
        <div className="services-category-wrapper service-bottom-section">
          <Loader loading={serviceDataLoaded} />
          <div className="services-category-list-wrapper services-category-home">
            {serviceData?.length > 0 &&
              serviceData?.map((service) => (
                <div
                    key={service?.id}
                    className={`grid-cols ${selectedService?.id === service?.id ? 'selected-item' : ''}`}
                    onClick={() => handleSelectedService(service)}
                  >
                  <div className="whitebox-wrapper cursor-pointer" onClick={() => handleSelectedService(service)}>
                    <div className="cursor-pointer">
                      <div className="icon-wrapper">
                        <div className="inner-img-div">
                          <Image
                            alt="sitback"
                            isContainImg={true}
                            src={
                              service?.image
                                ? service?.image
                                : "/images/right-top-img-1.svg"
                            }
                          />
                        </div>
                        <div className="checkmark-icon-wrapper">
                          <InlineSVG src={RadioCheckMark_icon} className="global_laguage_icon" />
                        </div>
                      </div>
                      <p className="paragraph-text">{service?.name}</p>
                    </div>
                    <div className="">
                      <div className="hour-text">
                        <p>Time:</p>
                        <p>{service?.hour * 60 + service?.minutes} Min</p>
                      </div>
                      <div className="price-text">
                        <p>Price:</p>
                        <SubTitleText18>${parseFloat(service?.price)?.toFixed(2)}</SubTitleText18>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="spa-detail-mobile-btn-div">
           <Button className="request-btn" onClick={() => { showBookingModel()}}>Request An Appointment</Button>
        </div>

      <Modal
          show={showModel}
          onHide={() => handleCloseModel()}
          aria-labelledby="example-modal-sizes-title-lg"
          centered
          className="sitback-modal-wrapper sitback-modalv2-wrapper cloud-image-wrapper-main"
        >
          <Modal.Header closeButton className="red-close-icon"></Modal.Header>
          <Modal.Body>
            <div className="app-store-wrapper">
              <LoginTextTitle>{t("loginModelText")}</LoginTextTitle>
              <div className="app-store-btns-wrapper">
                <Link href="javascript:void(0)" className="app-store-btn"  onClick={() => window.location = 'https://apps.apple.com/us/app/id6475679969'}>
                  <Image isContainImg={true} alt="sitback" src="/images/app-store.svg" />
                </Link>
                <Link href="javascript:void(0)" className="app-store-btn" onClick={() => window.location = 'https://play.google.com/store/apps/details?id=com.truvyn.sitback'}>
                  <Image isContainImg={true} alt="sitback" src="/images/google-play.svg" />
                </Link>
                <p className="or-text">OR</p>
                {/* <Link href="/">{t("bookAnAppointmentLink")}</Link> */}
                <Link className="link-text" href={slug?.linkSpa} >
                  {t("bookAnAppointmentLink")}
                </Link>
              </div>
            </div>
          </Modal.Body>
        </Modal>

      </Container>
    </div>
  );
};
