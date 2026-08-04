"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { Col, Container, Modal, Nav, Row, Tab } from "react-bootstrap";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import PhoneInput from "react-phone-input-2";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { useDispatch, useSelector } from "react-redux";
import InlineSVG from "svg-inline-react";
import * as yup from "yup";
import { Gallery } from "@/components/dashboards/profile-services/Gallery";
import GoogleLocation from "@/components/dashboards/profile-services/GoogleLocations";
import { Hours } from "@/components/dashboards/profile-services/Hours";
import { ProfileAmenities } from "@/components/dashboards/profile-services/ProfileAmenities";
import Review from "@/components/dashboards/profile-services/Review";
import { Services } from "@/components/dashboards/profile-services/Services";
import LoadingButton from "@/components/shared/button/LoadingButton";
import { FormProvider, RHFTextInput } from "@/components/shared/hook-form";
import { useToaster } from "@/hooks";
import { authCheckSliceSelector, loginDetail } from "@/redux/authCheck";
import {
  handleBlock,
  handlePersonalInfoTab,
  handleProfileTab,
  handleSubscribe,
  messageCheckSliceSelector,
  tabHandle,
} from "@/redux/messageTab";
import { NEW_DASHBOARD_PATH, PATH_AUTH, PATH_DASHBOARD, PATH_SCHEDULER } from "@/routes/paths";
import { API_ROUTER } from "@/services/apiRouter";
import {
  Button,
  FormGroup,
  Input,
  MainLayoutWrapper,
  SubTitleText16,
  SubTitleText18,
} from "@/styles/global/main.style";
import {
  LightyellowBoxWrapper,
  OurServicesTabWrapper,
  ProfileServicesLayoutWrapper,
} from "@/styles/pages/profile.style";
import { camera_icon, download_icon, edit_icon } from "@/styles/svgs";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";
import { removeCookie } from "@/utils/cookie";
import { setImageUpload } from "@/utils/helper";
const sign = require("jwt-encode");
// import { CustomTabs } from "@/components/shared/tabs";

export default function ProfileServices() {
  const { t } = useTranslation();

  // constant
  const { login } = useSelector(authCheckSliceSelector);
  const { isProfileTab, personalInfo } = useSelector(messageCheckSliceSelector);
  const number = login?.countrycode + login?.phone;
  // state
  const [editInfo, isEditInfo] = useState(personalInfo?.isEdit);
  const [editSpaName, setEditSpaName] = useState(false);
  const [editSpaLoading, setEditSpaLoading] = useState(false);
  const [img, setImg] = useState(null);
  const [phNo, setPhNo] = useState({
    countryCode: "",
    number: "",
  });
  // const [phNoLength, setPhNoLength] = useState(number?.length);
  const [placeId, setPlaceId] = useState(null);
  const [name, setName] = useState(login?.username || "");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(isProfileTab);

  // Form Config
  const defaultValues = useMemo(
    () => ({
      phoneNumber: number || "",
      location:
        { address: login?.location, lat: login?.lat || null, log: login?.log || null } || "",
      website: login?.website || "",
      email: login?.email || "",
    }),
    [login]
  );

  // validation
  const formSchema = useMemo(() => {
    return yup.object().shape({
      website: yup
        .string()
        .matches(/^(https?:\/\/)?(www\.)?[a-zA-Z0-9.-]+(\.[a-zA-Z]{2,})+$/, t("urlValidate")),
      location: yup.object().shape({
        address: yup.string().required("Location is required"),
      }),
      phoneNumber: yup
        .string()
        .required("Phone Number is required")
        .min(5, "please enter a valid phone number"),
    });
  }, [login]);

  // Hooks
  const methods = useForm({
    resolver: yupResolver(formSchema),
    defaultValues,
  });
  const { push } = useRouter();
  const { toaster } = useToaster();
  const dispatch = useDispatch();
  const formData = new FormData();

  // Constants
  const {
    handleSubmit,
    setValue,
    watch,
    setError,
    clearErrors,
    formState: { errors },
    reset,
  } = methods;

  const selectedLocation = watch("location");
  const websiteValue = watch("website");
  const phoneNumberValue = watch("phoneNumber");

  // methods
  const edit = async (data) => {

    try {
      // if (phoneNumberValue?.length == undefined || phoneNumberValue?.replace(/[- )(]/g, "")?.length != phNoLength) {
      //   return;
      // }

      if (String(phoneNumberValue).length < 5) {
        setError("phoneNumber", { message: "Please Enter Phone number" });
        return;
      }

      setLoading(true);
      const editData = {
        website: data?.website,
        location: data?.location?.address || "",
        lat: data?.location?.lat || "",
        log: data?.location?.log || "",
        city: data?.location?.city || "",
        state: data?.location?.state || "",
        country: data?.location?.country || "",
      };
      if (phNo?.countryCode || phNo?.number) {
        editData.countrycode = `+${phNo?.countryCode}` || `+${login?.countrycode}`;
        editData.phone = phNo?.number || login?.phone;
      }
      if (placeId) {
        editData.place_id = placeId;
      }
      const res = await axiosApiCall.post(API_ROUTER?.UPDATE_SERVICE, editData);

      // const res = await axiosApiCall({
      //   method: "post",
      //   url: API_ROUTER?.UPDATE_SERVICE_V3,
      //   baseURL: process.env.API_URL_V3,
      //   data: editData,
      // });
      if (!res?.status) {
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        toaster(res?.data?.message, TOAST_TYPES.SUCCESS);
        dispatch(loginDetail(res?.data?.data));
        dispatch(handlePersonalInfoTab({ isEdit: false, isLocationFocus: false }));
        isEditInfo(!editInfo);
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setLoading(false);
    }
  };

  const blobGenerate = (arg) => {
    let res = setImageUpload(arg);
    setImg({ file: res.file, fileObj: res?.fileObj });
  };

  const [error1, setError1] = useState({ nameValidate: null });

  const Field_Validate = () => {
    let is_error = false;
    const clonedError = { ...error1 };

    if (name && name.length > 40) {
      clonedError.nameValidate = t("errMaxNameLength");
      is_error = true;
    } else {
      clonedError.nameValidate = null;
    }

    setError1(clonedError);
    return is_error;
  };

  const editSpa = async () => {
    const is_valid = Field_Validate();
    if (is_valid) {
      return;
    }

    try {
      setEditSpaLoading(true);
      img && formData?.append("image", img?.fileObj);
      formData?.append("username", name?.trim());

      const res = await axiosApiCall.post(API_ROUTER?.UPDATE_SERVICE, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // const res = await axiosApiCall.post(API_ROUTER?.UPDATE_SERVICE, formData, {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // });
      // const res = await axiosApiCall({
      //   method: "post",
      //   url: API_ROUTER?.UPDATE_SERVICE_V3,
      //   baseURL: process.env.API_URL_V3,
      //   data: formData,
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // });
      if (!res?.status) {
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        toaster(res?.message, TOAST_TYPES.SUCCESS);
        dispatch(loginDetail(res?.data?.data));
        setName(res?.data?.data?.username);
        setEditSpaName(!editSpaName);
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setEditSpaLoading(false);
    }
  };

  const onLocationChange = () => {
    setActiveTab("fourth");
  };

  const onChangeLocation = (locationData) => {
    setValue("location.address", locationData?.address);
    setValue("location.lat", locationData?.lat);
    setValue("location.log", locationData?.lng);
  };

  const handleChangeTab = (e) => {
    dispatch(handleProfileTab(e));
    setActiveTab(e);
  };

  const handleCancel = () => {
    isEditInfo(!editInfo);
    dispatch(handlePersonalInfoTab({ isEdit: false, isLocationFocus: false }));

    setValue("location", {
      address: login?.location,
      lat: login?.lat || null,
      log: login?.log || null,
    });
    reset(defaultValues);
  };

  const handleEditProfile = () => {
    isEditInfo(!editInfo);
    dispatch(handlePersonalInfoTab({ isEdit: true, isLocationFocus: false }));
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    Field_Validate();
    setError1((prevError) => ({ ...prevError, nameValidate: null }));
  };

  const getProfileInfo = async () => {
    try {
      const res = await axiosApiCall.get(API_ROUTER?.GET_DETAILS);
      if (!res?.status) {
        return res;
      } else {
        dispatch(handleBlock(res?.data?.data.isBlocked));
        dispatch(handleSubscribe(res?.data?.data.isSubscribe));
        dispatch(loginDetail(res?.data?.data));
        if (res?.data?.data.isBlocked) {
          push(PATH_DASHBOARD?.serviceProvider);
        }
        if (res?.data?.data?.isSubscribe == 1) {
          if (res?.data?.data.planData?.status == "canceled") {
            push(PATH_DASHBOARD?.subscriptions);
          }
          if (res?.data?.data?.spa_type == "onlydashboard") {
            push(NEW_DASHBOARD_PATH?.dashboard);
          }
          if (res?.data?.data.planData?.plan_id == 1) {
            dispatch(tabHandle("second"));
          }
        }
        if (res?.data?.data?.isSubscribe == 0) {
          push(PATH_DASHBOARD?.subscriptions);
        }
        if (res?.data?.data?.isSubscribe == 3) {
          if (res?.data?.data.planData?.status == "canceled") {
            leave_room();
          }
        }
      }
    } catch (error) {
      // return error
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  };

  const leave_room = async () => {
    try {
      const res = await axiosApiCall.get(API_ROUTER?.USER_LEAVE_ROOM);
      if (!res?.status) {
        return res;
      } else {
        try {
          const res = await axiosApiCall.post(API_ROUTER?.LOGOUT, { id: login?.id });
          if (!res?.status) {
            return toaster(res?.message, TOAST_TYPES.ERROR);
          } else {
            removeCookie("token");
            localStorage.clear();
            push(PATH_AUTH?.signIn);
            window.location.reload();
            return res;
          }
        } catch (error) {
          toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
        }
      }
    } catch (error) {
      return error;
    }
  };

  // const cancelSubscription = async () => {
  //   try {
  //     let param = {
  //       subscription_id: login?.planData?.subscription_id,
  //       cancel_at_period_end: true
  //     }
  //     const res = await axiosApiCall.post(API_ROUTER?.CANCEL_SUBSCRIPTION, param);
  //     if (!res?.status) {
  //       return res
  //     } else {
  //       push(PATH_DASHBOARD?.subscriptions);
  //     }
  //   } catch (error) {
  //     toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
  //   }
  // }

  const generateIframe = useMemo(() => {
    let link = `${window?.location?.origin}${PATH_SCHEDULER?.scheduler}/${sign(
      login?.spaToken,
      process.env.SECRET_KEY
    )}`;
    let url = `<a style="background: #295086;color: #fff;padding: 10px;text-decoration: none;text-transform: capitalize;border-radius: 5px;" href="${link}">book appointment</a>`;

    return url;
  }, [login]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getProfileInfo();
    isEditInfo(false);
  }, []);

  const handleDownload = () => {
    // Step 1: Create the HTML content
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        ${generateIframe}
      </head>
      <body>

      </body>
      </html>
    `;

    // Step 2: Create a Blob from the HTML content
    const blob = new Blob([htmlContent], { type: "text/html" });

    // Step 3: Create a link to trigger the download
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = login?.username + ".html";

    // Step 4: Trigger the download
    link.click();

    // Step 5: Clean up the URL object
    URL.revokeObjectURL(link.href);
  };

  return (
    <>
      <MainLayoutWrapper>
        <ProfileServicesLayoutWrapper className="sitback-updated-profile-services-wrapper">
          <Container>
            <Row>
              <Col md={4} lg={4}>
                <LightyellowBoxWrapper className="sitback-updated-white-box-wrapper">
                  <div className="user-profile-block">
                    <div className="upload-profile-div">
                      <div className="profile-img">
                        <img
                          alt="sitback"
                          src={img?.file || login?.image || "/images/profile-img.png"}
                          onChange={(e) => blobGenerate(e)}
                          onError={(e) => {
                            e.target.src = "/images/profile-img.png"; // some replacement image
                          }}
                        />
                      </div>
                      {editSpaName && (
                        <div className="upload-profile-icon">
                          <input type="file" accept="image/*" onChange={(e) => blobGenerate(e)} />
                          <i>
                            <InlineSVG src={camera_icon} className="global_laguage_icon" />
                          </i>
                        </div>
                      )}
                    </div>
                    <div className="user-profile-detail-wrapper">
                      {editSpaName ? (
                        <div>
                          <FormGroup className="mb-3" controlId="exampleForm.ControlInput1">
                            <Input
                              isSmallInputWrapper={true}
                              isTextCenter={true}
                              type="text"
                              placeholder={t("simplicityspa")}
                              onChange={(e) => handleNameChange(e)}
                              value={name}
                            />
                            <p className="text-danger">{error1.nameValidate}</p>
                          </FormGroup>

                          <FormGroup className="mb-3" controlId="exampleForm.ControlInput1">
                            <Input
                              isSmallInputWrapper={true}
                              isTextCenter={true}
                              type="email"
                              value={login?.email}
                              disabled
                              // readOnly
                              placeholder={t("mailplaceholder")}
                            />
                          </FormGroup>

                          <LoadingButton
                            type="submit"
                            disabled={editSpaLoading}
                            label={t("save")}
                            loadinglabel={t("saving")}
                            isLoading={editSpaLoading}
                            className="loading-btn-wrapper sitback-updated-save-btn-wrapper"
                            onClick={() => {
                              editSpa();
                            }}
                          />
                        </div>
                      ) : (
                        <div>
                          <div>
                            <SubTitleText16>{login?.username}</SubTitleText16>
                            <div className="gmail-detail-wrapper">
                              <a className="mail-text" href={`mailto:${login?.email}`}>
                                {login?.email}
                              </a>
                              <Link href={PATH_DASHBOARD?.subscriptions} className="upgrade-text">
                                {t("manageMembership")}
                              </Link>
                            </div>
                          </div>
                          <div className="edit-and-embed-code-wrapper">
                            <Button onClick={() => setEditSpaName(!editSpaName)}>
                              {t("EDIT")}
                            </Button>
                            {login?.spaToken && (
                              <Button isBorderBtn onClick={handleShow} className="sitback-updated-embed-code-btn-wrapper">
                                {t("embeddedCode")}
                                <i>
                                  <img alt="sitback" src="/images/arrows-icons-v3.svg" />
                                </i>
                              </Button>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </LightyellowBoxWrapper>
              </Col>
              <Col md={8} lg={8}>
                <LightyellowBoxWrapper className="sitback-updated-white-box-wrapper">
                  <div className="personal-information-wrapper">
                    <div className="personal-information-header">
                      <SubTitleText16>{t("personalInformation")}</SubTitleText16>
                      <span className="edit-profile-icon">
                        <InlineSVG
                          // onClick={() => handleCancel()}
                          onClick={() => handleEditProfile()}
                          src={edit_icon}
                          className="global_laguage_icon"
                        />
                      </span>
                    </div>
                    {!editInfo ? (
                      <Row>
                        <Col md={6}>
                          <div className="personal-detail-list">
                            <SubTitleText18>{t("phone")}:</SubTitleText18>
                            <a className="link-text">
                              ({login?.countrycode}) {login?.phone}
                            </a>
                          </div>
                        </Col>
                        <Col md={6}>
                          <div className="personal-detail-list">
                            <SubTitleText18>{t("email")}:</SubTitleText18>
                            <a className="link-text">{login?.email}</a>
                          </div>
                        </Col>
                        <Col md={6}>
                          <div className="personal-detail-list">
                            <SubTitleText18>{t("website")}:</SubTitleText18>
                            <a className="link-text">{login?.website}</a>
                          </div>
                        </Col>
                        <Col md={6}>
                          <div className="personal-detail-list">
                            <SubTitleText18>{t("location")}:</SubTitleText18>
                            <a className="link-text">{login?.location}</a>
                          </div>
                        </Col>
                      </Row>
                    ) : (
                      <FormProvider methods={methods} onSubmit={handleSubmit(edit)}>
                        <Row>
                          <Col md={6}>
                            <div className="personal-detail-list">
                              <SubTitleText18>{t("phone")}:</SubTitleText18>
                              <PhoneInput
                                placeholder={t("enterphoneNumber")}
                                specialLabel={t("phonenumber")}
                                name="phoneNumber"
                                country={"us"}
                                className="phone-number-input-wrapper"
                                // value={`${profileData?.countryCode} ${profileData?.phoneNumber}`}
                                // value="+919913478156"
                                value={defaultValues?.phoneNumber.toString()}
                                onChange={(phone, data, event, formattedValue) => {
                                  let countryCode = formattedValue.split(" ")[0];
                                  // setPhNoLength(data?.format?.replace(/[- )(]/g, "").length - (countryCode.length - 1));
                                  let filedValue = formattedValue
                                    ?.slice(countryCode.length + 1)
                                    ?.replace(/[- )(]/g, "");
                                  setPhNo({ countryCode: data?.dialCode, number: filedValue });
                                  setValue("phoneNumber", formattedValue);
                                  if (
                                    !(
                                      data?.format?.replace(/[- )(]/g, "").length -
                                      countryCode.length ==
                                      filedValue.length
                                    )
                                  ) {
                                    setError("phoneNumber", {
                                      message: "please enter valid phone number.",
                                    });
                                  } else {
                                    clearErrors("phoneNumber");
                                  }
                                }}
                              />
                            </div>
                            {errors?.phoneNumber ? (
                              <p className="text-error text-danger">
                                {errors?.phoneNumber?.message}
                              </p>
                            ) : (
                              <></>
                            )}
                          </Col>
                          <Col md={6}>
                            <div className="personal-detail-list">
                              <SubTitleText18>{t("email")}:</SubTitleText18>
                              <RHFTextInput
                                name="email"
                                disabled
                                //readOnly
                                isSmallInputWrapper={true}
                                type="email"
                              />
                            </div>
                          </Col>
                          <Col md={6}>
                            <div className="personal-detail-list">
                              <SubTitleText18>{t("website")}:</SubTitleText18>
                              <RHFTextInput
                                name="website"
                                isSmallInputWrapper={true}
                                placeholder="www.web.com"
                                id="website"
                                type="text"
                              />
                            </div>
                            {websiteValue.trim() === "" && websiteValue.length > 0 ? (
                              <p className="text-danger">
                                Please add details for the website field.
                              </p>
                            ) : (
                              <></>
                            )}
                          </Col>
                          <Col md={6}>
                            <div className="personal-detail-list">
                              <SubTitleText18>{t("location")}:</SubTitleText18>
                              <PlacesAutocomplete
                                value={selectedLocation?.address}
                                onChange={(address) => {
                                  setValue("location.address", address);
                                  setValue("location.lat", null);
                                  setValue("location.log", null);
                                  clearErrors("location");
                                }}
                                onSelect={async (address) => {
                                  setValue("location.address", address);
                                  try {
                                    const results = await geocodeByAddress(address);
                                    setPlaceId(results[0].place_id);
                                    const latLng = await getLatLng(results[0]);
                                    const { lat, lng } = latLng;
                                    setValue("location.lat", +lat.toFixed(6));
                                    setValue("location.log", +lng.toFixed(6));

                                    // Extract city, state, and country
                                    const addressComponents = results[0].address_components;
                                    let city = "";
                                    let state = "";
                                    let country = "";

                                    addressComponents.forEach((component) => {
                                      if (component.types.includes("locality")) {
                                        city = component.long_name;
                                      }
                                      if (component.types.includes("administrative_area_level_1")) {
                                        state = component.long_name;
                                      }
                                      if (component.types.includes("country")) {
                                        country = component.long_name;
                                      }
                                    });

                                    // // Update form values or state
                                    setValue("location.city", city);
                                    setValue("location.state", state);
                                    setValue("location.country", country);
                                  } catch (error) {
                                    //console.error("Error fetching geocode:", error);
                                  }
                                }}
                              >
                                {({ getInputProps, suggestions, getSuggestionItemProps }) => (
                                  <div className="location-input-wrapper-div">
                                    <Input
                                      isSmallInputWrapper={true}
                                      {...getInputProps({
                                        placeholder: "Search places ...",
                                        className: "location-input",
                                      })}
                                      autoFocus={personalInfo?.isLocationFocus}
                                      onClick={() => onLocationChange()}
                                    />
                                    {suggestions.length > 0 && (
                                      <div className="autocomplete-dropdown-container">
                                        {suggestions.map((suggestion, i) => {
                                          const className = suggestion.active
                                            ? "suggestion-item--active"
                                            : "suggestion-item";
                                          return (
                                            <div key={i}>
                                              <div
                                                {...getSuggestionItemProps(suggestion, {
                                                  className,
                                                })}
                                              >
                                                <span>{suggestion.description}</span>
                                              </div>
                                            </div>
                                          );
                                        })}
                                      </div>
                                    )}
                                  </div>
                                )}
                              </PlacesAutocomplete>
                            </div>
                            {errors?.location?.address ? (
                              <p className="text-error text-danger">
                                {errors?.location?.address?.message}
                              </p>
                            ) : (
                              <></>
                            )}
                          </Col>
                          <Col md={12}>
                            <div className="personal-inform-footer sitback-updated-personal-inform-footer">
                              <LoadingButton
                                type="submit"
                                disabled={
                                  (!selectedLocation.lat && selectedLocation.address !== "") ||
                                  Object.keys(errors).length > 0 ||
                                  loading
                                }
                                label={t("saveCaps")}
                                loadinglabel={t("saving")}
                                isLoading={loading}
                                className="loading-btn-wrapper sitback-updated-save-btn-wrapper"
                              />
                              <Button
                                variant="primary"
                                type="cancel"
                                isBorderBtn={true}
                                onClick={() => handleCancel()}
                                className="sitback-updated-cancel-button-wrapper"
                              >
                                {t("cancelCaps")}
                              </Button>
                            </div>
                          </Col>
                        </Row>
                      </FormProvider>
                    )}
                  </div>
                </LightyellowBoxWrapper>
                <LightyellowBoxWrapper className="sitback-updated-white-box-wrapper">
                  <OurServicesTabWrapper className="sitback-updated-our-services-tab-div" isDashboardProfileServiceTabSectionWrapper={true}>
                    <Tab.Container
                      id="left-tabs-example"
                      activeKey={activeTab}
                      onSelect={(e) => handleChangeTab(e)}
                    >
                      <Nav variant="pills" className="">
                        <Nav.Item>
                          <Nav.Link eventKey="first">{t("services")}</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="sixth">{t("amenitiesText")}</Nav.Link>
                        </Nav.Item>
                         <Nav.Item>
                            <Nav.Link eventKey="fifth">{t("hours")}</Nav.Link>
                          </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="second">{t("gallery")}</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="third">{t("reviews")}</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="fourth">{t("location")}</Nav.Link>
                        </Nav.Item>
                      </Nav>
                      <Tab.Content>
                        <Tab.Pane eventKey="first">
                          <Services />
                        </Tab.Pane>
                        <Tab.Pane eventKey="second">
                          <Gallery />
                        </Tab.Pane>
                         <Tab.Pane eventKey="sixth">
                            <ProfileAmenities />
                          </Tab.Pane>
                         <Tab.Pane eventKey="fifth">
                          <Hours />
                        </Tab.Pane>
                        <Tab.Pane eventKey="third">
                          <Review />
                        </Tab.Pane>
                        <Tab.Pane eventKey="fourth">
                          <GoogleLocation
                            location={selectedLocation}
                            draggable={editInfo}
                            onChangeLocation={onChangeLocation}
                          />
                        </Tab.Pane>
                      </Tab.Content>
                    </Tab.Container>
                  </OurServicesTabWrapper>
                </LightyellowBoxWrapper>
              </Col>
            </Row>
          </Container>
        </ProfileServicesLayoutWrapper>
      </MainLayoutWrapper>
      <Modal
        show={show}
        onHide={() => handleClose()}
        centered
        className="sitback-modal-wrapper sitback-modalv2-wrapper sitback-updated-profile-service-modal"
      >
        <Modal.Header closeButton className="red-close-icon pb-2"></Modal.Header>
        <Modal.Body className="pt-0">
          <div className="EmbedinWebsiteWrapper">
            <h3 className="modal-title-text">{t("embeddedWeb")}</h3>
            <div className="copy-link-input-wrapper">
              <input type="text" value={generateIframe} disabled />
              <CopyToClipboard text={generateIframe}>
                <Button variant="primary" onClick={() => handleClose()}>
                  {t("copy")}
                </Button>
              </CopyToClipboard>
            </div>
            <div>
              <Button variant="primary" onClick={handleDownload} className="download-btn-wrapper sitback-updated-download-btn-wrapper">
                Download
                <InlineSVG src={download_icon} className="global_laguage_icon" />
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
