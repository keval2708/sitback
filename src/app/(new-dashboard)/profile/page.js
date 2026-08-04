"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { Col, Container, Modal, Nav, Row, Tab } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import PhoneInput from "react-phone-input-2";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { useDispatch, useSelector } from "react-redux";
import InlineSVG from "svg-inline-react";
import * as yup from "yup";
import DashBoardHeader from "@/components/dashboardheader/page";
import { Amenities } from "@/components/dashboards/dashboard-services/Amenities";
import { Gallery } from "@/components/dashboards/dashboard-services/Gallery";
import GoogleLocation from "@/components/dashboards/dashboard-services/GoogleLocations";
import { Hours } from "@/components/dashboards/dashboard-services/Hours";
import Review from "@/components/dashboards/dashboard-services/Review";
import { Services } from "@/components/dashboards/dashboard-services/Services";
import Upgrades from "@/components/dashboards/dashboard-services/Upgrades";
import LoadingButton from "@/components/shared/button/LoadingButton";
import { FormProvider, RHFTextInput } from "@/components/shared/hook-form";
import { useToaster } from "@/hooks";
import { authCheckSliceSelector, loginDetail, setdeviceTokens } from "@/redux/authCheck";
import { chatHandle } from "@/redux/messageDashboard";
import {
  handleBlock,
  handlePersonalInfoTab,
  handleProfileTab,
  handleSubscribe,
  messageCheckSliceSelector,
  tabHandle,
} from "@/redux/messageTab";
import { NEW_DASHBOARD_PATH, PATH_AUTH } from "@/routes/paths";
import { API_ROUTER } from "@/services/apiRouter";
import {
  Button,
  FormGroup,
  Input,
  Label,
  MainLayoutWrapper,
  SubTitleText16,
  SubTitleText18,
} from "@/styles/global/main.style";
import {
  LightyellowBoxWrapper,
  OurServicesTabWrapper,
  ProfileServicesLayoutWrapper,
} from "@/styles/pages/profile.style";
import { camera_icon, edit_icon } from "@/styles/svgs";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";
import { removeCookie } from "@/utils/cookie";
import { getSocketId, setImageUpload } from "@/utils/helper";
// import { CustomTabs } from "@/components/shared/tabs";

export default function ProfileServices() {
  const { t } = useTranslation();

  // constant
  const { login,deviceTokens } = useSelector(authCheckSliceSelector);
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
  const [isSpaDeny, setSpaDeny] = useState(false);


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
      const socketId = getSocketId();
      const editData = {
        website: data?.website,
        location: data?.location?.address || "",
        lat: data?.location?.lat || "",
        log: data?.location?.log || "",
        city: data?.location?.city || "",
        state: data?.location?.state || "",
        country: data?.location?.country || "",
        socketId: socketId,

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
        getProfileInfo();
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
    } else if(name?.length == 0) {
      clonedError.nameValidate = t("reqName");
      is_error = true;
    } else {
      clonedError.nameValidate = null;
    }
    setError1(clonedError);
    return is_error;
  };

  const editSpa = async () => {
    const is_valid = Field_Validate();
    const socketId = getSocketId();
    if (is_valid) {
      return;
    }

    try {
      setEditSpaLoading(true);
      img && formData?.append("image", img?.fileObj);
      formData?.append("username", name?.trim());
      formData?.append("socketId", socketId);

      const res = await axiosApiCall.post(API_ROUTER?.UPDATE_SERVICE, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // console.log("res", res);
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

        toaster(res?.data?.message, TOAST_TYPES.SUCCESS);
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
        const profile = res?.data?.data;
        // Update redux and local state
        dispatch(handleBlock(profile.isBlocked));
        dispatch(handleSubscribe(profile.isSubscribe));
        dispatch(loginDetail(profile));
        // update component-level state and form values so UI reflects new data immediately
        setImg({ file: profile.image || null, fileObj: null });
        setName(profile.username || "");
        setPhNo({
          countryCode: profile?.countrycode ? profile.countrycode.replace("+", "") : "",
          number: profile?.phone || "",
        });
        // update form fields
        setValue("phoneNumber", (profile?.countrycode || "") + (profile?.phone || ""));
        setValue("location.address", profile?.location || "");
        setValue("location.lat", profile?.lat || null);
        setValue("location.log", profile?.log || null);
        setValue("website", profile?.website || "");
         if (profile.isBlocked) {
          // dispatch(handleBlock(res?.data?.data.isBlocked));
          // push(PATH_DASHBOARD?.serviceProvider);
          setSpaDeny(true)
        }
        else {
          setSpaDeny(false)
        }
        if(profile?.isAcceptDeny){
          setSpaDeny(true)
        } else {
          setSpaDeny(false)
        }
        if (profile?.isSubscribe == 1) {
          // if (res?.data?.data.planData?.status == "canceled") {
          //   push(PATH_DASHBOARD?.subscriptions);
          // }
          if (res?.data?.data.planData?.plan_id == 1) {
            dispatch(tabHandle("second"));
          }
        }
        if (res?.data?.data?.isSubscribe == 0) {
          //push(PATH_DASHBOARD?.subscriptions);
        }
        if (profile?.isSubscribe == 3) {
          if (profile?.planData?.status == "canceled") {
            leave_room();
          }
        }

        if(res?.data?.pendingAppointment == true && profile?.employeeType == "spa") {
          push(NEW_DASHBOARD_PATH?.dashboard)
        } else if (res?.data?.pendingAppointment == true && profile?.employeeType == "spaemployee") {
          const permissions = profile?.permissions;
          const permissionsArray = permissions?.split(',').map(item => item.trim());
          if(permissionsArray.includes("Approve/Deny Requests")) {
            push(NEW_DASHBOARD_PATH?.dashboard)
          }
        }
        // console.log("profile",profile);
        // return profile for callers if needed
        return profile;
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
        return res
      } else {
        //console.log("res", res);
        try {
           const res = await axiosApiCall.post(API_ROUTER?.LOGOUT, { id: login?.id,employeeType: login?.employeeType,deviceToken:deviceTokens });
          if (!res?.status) {

            return toaster(res?.message, TOAST_TYPES.ERROR);
          } else {
            dispatch(setdeviceTokens(null));
            removeCookie('token');
            localStorage.clear();
            dispatch(chatHandle(null));
            // push(PATH_AUTH?.signIn);
            window.location.href = PATH_AUTH?.signIn;
            //dispatch(handleLoginTab('first'));
            // window.location.reload();
            return res
          }
        } catch (error) {

          toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
        }
      }
    } catch (error) {
      // console.log("error",error);
      return error
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

  useEffect(() => {
    getProfileInfo();
    isEditInfo(false);
    setTimeout(() => {
        hideAgentButton()
      }, 1000);

  }, []);


    const hideAgentButton = () => {
      const chatbotIcon = document.getElementById('chatbot-icon');
        if (chatbotIcon) {
          chatbotIcon.style.display = 'none';
        }
      const chatbotFrame = document.getElementById('chatbot-frame');

        if(chatbotFrame) {
          chatbotFrame.style.display = 'none';
        }
    }


  const passwordChangeSchema = yup.object().shape({

    newPassword: yup
        .string()
        .required(t('reqPassword'))
        .min(8, t('errMinPassword'))
        .max(12, t('errMaxPassword'))
        .trim(t('validPassword'))
        .matches(
          /^(?=.*[A-Za-z0-9])(?=.*[@$!%*?&])[A-Za-z0-9@$!%*?&]+$/,
          t('errPassword')
        ),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("newPassword"), null], "Passwords must match")
      .required("Confirm Password is required"),

  });

  // Use a separate form instance for password change
  const passwordChangeMethods = useForm({
    resolver: yupResolver(passwordChangeSchema),
  });

  const handlePasswordChange = async (data) => {
    // Prevent the default form submit behavior (if necessary)
    event.preventDefault();

    if (data.newPassword !== data.confirmPassword) {
      setError("confirmPassword", { message: "Passwords do not match." });
      return;
    }

    const passwordData = {
      id:login?.id,
      password: data.newPassword,
    };

    try {
      const res = await axiosApiCall.post(API_ROUTER?.CHANGE_PASSWORD_EMPLOYEE, passwordData);

      if (!res?.status) {
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        leave_room()
        toaster("Password changed successfully.", TOAST_TYPES.SUCCESS);
      }

    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  };

  useEffect(() => {
    if (window.io) {
      hideAgentButton()
      if(login?.employeeType == "spa") {
          window.io.socket.on("serviceprovider", async (msg) => {
          if (msg?.action == "spa_ban_unban") {
            getProfileInfo()
          }
          if(msg?.action == "profileUpdate") {
            // Refresh profile fields in-place instead of redirecting
            await getProfileInfo();
          }
        });
      } else if (login?.employeeType == "spaemployee") {

           window.io.socket.on("spaemployee", async (msg) => {
          if (msg?.action == "spa_ban_unban") {
            getProfileInfo()
          }
          if(msg?.action == "profileUpdate") {
            // Refresh profile fields in-place instead of redirecting
            await getProfileInfo();
          }
        });
      }

    }
  }, [window.io]);

  return (
    <>
      <MainLayoutWrapper>
        <ProfileServicesLayoutWrapper isDashboardProfileServiceLayoutWrapper={true}>
          <Container>
            <DashBoardHeader />
            <Row className="dashboard-profile-main-boxes-row">
              {login?.employeeType == "spaemployee" ?
              <>
               <FormProvider {...passwordChangeMethods} onSubmit={passwordChangeMethods.handleSubmit(handlePasswordChange)}>
                <div className="sitback-profile-password-main-wrapper">
                  <h3>Change Password</h3>
                  <Row>
                    <Col md={12}>
                      <FormGroup controlId="formNewPassword">
                        <Label>New Password</Label>
                        <Input
                          {...passwordChangeMethods.register("newPassword")}
                          type="password"
                          placeholder="Enter new password"
                          isInvalid={!!passwordChangeMethods.formState.errors.newPassword}
                        />
                        {passwordChangeMethods.formState.errors.newPassword && (
                          <p className="text-danger mt-1">{passwordChangeMethods.formState.errors.newPassword.message}</p>
                        )}
                      </FormGroup>
                    </Col>

                    <Col md={12}>
                      <FormGroup controlId="formConfirmPassword">
                        <Label>Confirm Password</Label>
                        <Input
                          {...passwordChangeMethods.register("confirmPassword")}
                          type="password"
                          placeholder="Confirm new password"
                          isInvalid={!!passwordChangeMethods.formState.errors.confirmPassword}
                        />
                        {passwordChangeMethods.formState.errors.confirmPassword && (
                          <p className="text-danger mt-1">{passwordChangeMethods.formState.errors.confirmPassword.message}</p>
                        )}
                      </FormGroup>
                    </Col>

                    <Col md={12}>
                      <div className="personal-inform-footer">
                        <LoadingButton
                          type="submit"
                          disabled={Object.keys(passwordChangeMethods.formState.errors).length > 0 || loading}
                          label="Save"
                          loadinglabel="Saving"
                          isLoading={loading}
                          className="loading-btn-wrapper"
                        />
                      </div>
                    </Col>

                  </Row>
                </div>
                </FormProvider>
              </> :
              <>
              <Col md={4} lg={4}>
                <LightyellowBoxWrapper isDashboardProfileServiceBoxMainDiv={true}>
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

                          <FormGroup className="input-display-wrapper" controlId="exampleForm.ControlInput1">
                            <Input
                              isSmallInputWrapper={true}
                              isTextCenter={true}
                              type="email"
                              value={login?.email}
                              readOnly
                              placeholder={t("mailplaceholder")}
                            />
                          </FormGroup>

                          <LoadingButton
                            type="submit"
                            disabled={editSpaLoading}
                            label={t("save")}
                            loadinglabel={t("saving")}
                            isLoading={editSpaLoading}
                            className="loading-btn-wrapper"
                            onClick={() => {
                              editSpa();
                            }}
                          />
                           <Button
                            variant="primary"
                            type="cancel"
                            isBorderBtn={true}
                            onClick={() => { setEditSpaName(!editSpaName); setName(login?.username); setImg({ file: login?.image || null, fileObj: null }); }}
                            className="cancel-profile-btn"
                            >
                            {t("cancelCaps")}
                          </Button>
                        </div>
                      ) : (
                        <div>
                          <div>
                            <SubTitleText16>{login?.username}</SubTitleText16>
                            <div className="gmail-detail-wrapper">
                              <a className="mail-text" href={`mailto:${login?.email}`}>
                                {login?.email}
                              </a>
                              {/* <Link href={PATH_DASHBOARD?.subscriptions} className="upgrade-text">
                                {t("manageMembership")}
                              </Link> */}
                            </div>
                          </div>
                          <div className="edit-and-embed-code-wrapper">
                            <Button onClick={() => setEditSpaName(!editSpaName)}>
                              {t("EDIT")}
                            </Button>
                            {/* {login?.spaToken && (
                              <Button isBorderBtn onClick={handleShow}>
                                {t("embeddedCode")}
                                <i>
                                  <img alt="sitback" src="/images/arrows-icons-v3.svg" />
                                </i>
                              </Button>
                            )} */}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </LightyellowBoxWrapper>
              </Col>
              <Col md={8} lg={8}>
                <LightyellowBoxWrapper isDashboardProfileServiceBoxMainDiv={true}>
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
                            <div className="personal-inform-footer">
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
                                className="loading-btn-wrapper"
                              />
                              <Button
                                variant="primary"
                                type="cancel"
                                isBorderBtn={true}
                                onClick={() => handleCancel()}
                              >
                                {t("cancelCaps")}
                              </Button>
                            </div>
                          </Col>
                        </Row>
                      </FormProvider>
                    )}
                    {login?.isLocationMsgShow === 1 ? (
                      <Col md={12}>
                      <p className="warning-msg">
                        Google ratings couldn’t be fetched. Please enter the exact Google-listed address to sync ratings on SitBack user website.
                      </p>
                    </Col> ) : ''}

                  </div>
                </LightyellowBoxWrapper>
                <LightyellowBoxWrapper isDashboardProfileServiceBoxMainDiv={true}>
                  <OurServicesTabWrapper isDashboardProfileServiceTabSectionWrapper={true}>
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
                        <Nav.Item>
                          <Nav.Link eventKey="seventh">{t("Upgrades")}</Nav.Link>
                        </Nav.Item>
                      </Nav>
                      <Tab.Content>
                        <Tab.Pane eventKey="first">
                          {isProfileTab === 'first' && <Services />}
                        </Tab.Pane>
                         <Tab.Pane eventKey="sixth">
                          {isProfileTab === 'sixth' && <Amenities />}

                        </Tab.Pane>
                         <Tab.Pane eventKey="fifth">
                          {isProfileTab === 'fifth' && <Hours />}

                        </Tab.Pane>
                        <Tab.Pane eventKey="second">
                          {isProfileTab === 'second' && <Gallery/>}
                        </Tab.Pane>
                        <Tab.Pane eventKey="third">
                          {isProfileTab === 'third' && <Review/>}
                        </Tab.Pane>
                        <Tab.Pane eventKey="seventh">
                          {isProfileTab === 'seventh' && <Upgrades/>}
                        </Tab.Pane>
                        <Tab.Pane eventKey="fourth">
                          {isProfileTab === 'fourth' &&
                          <GoogleLocation
                            location={selectedLocation}
                            draggable={editInfo}
                            onChangeLocation={onChangeLocation}
                          />
                          }
                        </Tab.Pane>
                      </Tab.Content>
                    </Tab.Container>
                  </OurServicesTabWrapper>
                </LightyellowBoxWrapper>

              </Col>

              </> }


            </Row>
          </Container>
        </ProfileServicesLayoutWrapper>
      </MainLayoutWrapper>
      <Modal
        show={isSpaDeny}
        aria-labelledby="example-modal-sizes-title-lg"
        centered
        className="sitback-modal-wrapper warning-modal-wrapper"
      >
        <Modal.Body>
          <div className="sitback-request-modal-wrapper">
            <h5>{t('warning')}</h5>
            <p>{t('spaRestrictedByAdminText')}</p>
            <Button className="support-spa-btn" onClick={() => leave_room()}>{t('ok')}</Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
