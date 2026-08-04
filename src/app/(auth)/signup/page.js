"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import * as yup from "yup";
import VerifyMessagePopup from "@/components/auth/modal/varifyMessagepopup";
import Apple from "@/components/auth/socialLogin/Apple";
import GoogleButton from "@/components/auth/socialLogin/GoogleButton";
import SignupGoogleLocations from "@/components/dashboards/profile-services/SignupGoogleLocations";
import LoadingButton from "@/components/shared/button/LoadingButton";
import { FormProvider, RHFPasswordInput, RHFTextInput } from "@/components/shared/hook-form";
import { useToaster } from "@/hooks";
import useFcmToken from "@/hooks/useFcmToken";
import { PATH_AUTH } from "@/routes/paths";
import { API_ROUTER } from "@/services/apiRouter";
import {
  Button,
  FormGroup,
  Image,
  Input,
  Label,
  SocialLoginIconsWrapper,
} from '@/styles/global/main.style';
import {
  LoginFormWrapper,
  LoginLayoutUpdatedWrapper,
} from '@/styles/pages/signup.style';
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";

export default function SignUp() {
  const { fcmToken } = useFcmToken();

  const { t } = useTranslation();

  // states
  const [appleData, setAppleData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [placeId, setPlaceId] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [currentLocationLoading, setCurrentLocationLoading] = useState(false);

  // Create a ref to track current step for validation
  const currentStepRef = useRef(currentStep);

  // Update ref when currentStep changes
  useEffect(() => {
    currentStepRef.current = currentStep;
  }, [currentStep]);

  // Form Config
  const defaultValues = useMemo(
    () => ({
      userName: "",
      ownerName: "",
      mobileNumber: "",
      email: appleData?.email || "",
      password: "",
      location: {
        address: "",
        lat: null,
        log: null,
        city: "",
        state: "",
        country: ""
      },
    }),
    [appleData]
  );

  // Mobile number validation function - only numbers allowed
  const validateMobileNumber = (value) => {
    const mobileRegex = /^[0-9]{10}$/;
    return mobileRegex.test(value);
  };

  // Function to prevent spaces and special characters in real-time
  const preventSpacesAndSpecialChars = (e) => {
    // Prevent spaces
    if (e.key === ' ' || e.key === 'Space') {
      e.preventDefault();
      return false;
    }
    // Allow only letters and basic characters (no numbers or special chars except basic ones)
    const key = e.key;
    const allowedRegex = /^[A-Za-z\s]*$/;
    if (!allowedRegex.test(key) && key !== 'Backspace' && key !== 'Delete' && key !== 'Tab' && key !== 'Enter') {
      e.preventDefault();
      return false;
    }
  };

  // Function to prevent spaces at the beginning and allow only letters
  const handleNameChange = (e, fieldName) => {
    let value = e.target.value;
    // Remove any numbers and special characters, keep only letters and spaces
    value = value.replace(/[^A-Za-z\s]/g, '');
    // Prevent multiple consecutive spaces
    value = value.replace(/\s+/g, ' ');
    // Prevent leading space
    if (value.startsWith(' ')) {
      value = value.trimStart();
    }
    setValue(fieldName, value, { shouldValidate: true });
  };

  // Function to handle mobile number input - only numbers
  const handleMobileNumberChange = (e) => {
    let value = e.target.value;
    // Remove any non-numeric characters
    value = value.replace(/[^0-9]/g, '');
    // Limit to 10 digits
    if (value.length > 10) {
      value = value.slice(0, 10);
    }
    setValue('mobileNumber', value, { shouldValidate: true });
  };

  // Function to prevent paste of invalid characters in name fields
  const handleNamePaste = (e, fieldName) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text');
    // Remove numbers and special characters, keep only letters and spaces
    let cleanedText = pastedText.replace(/[^A-Za-z\s]/g, '');
    // Remove multiple spaces
    cleanedText = cleanedText.replace(/\s+/g, ' ');
    // Trim leading/trailing spaces
    cleanedText = cleanedText.trim();
    setValue(fieldName, cleanedText, { shouldValidate: true });
  };

  // Function to handle mobile number paste
  const handleMobilePaste = (e) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text');
    // Remove any non-numeric characters
    let cleanedText = pastedText.replace(/[^0-9]/g, '');
    // Limit to 10 digits
    if (cleanedText.length > 10) {
      cleanedText = cleanedText.slice(0, 10);
    }
    setValue('mobileNumber', cleanedText, { shouldValidate: true });
  };

  // validation - Updated with stricter validation
  const formSchema = yup
    .object()
    .shape({
      userName: yup
        .string()
        .required(t('reqName'))
        .max(40, t('errMaxNameLength'))
        .matches(/^[A-Za-z\s]+$/, 'Spa name should only contain letters and spaces')
        .test('no-leading-space', 'Spa name cannot start with a space', (value) => {
          return !value || !value.startsWith(' ');
        })
        .test('no-consecutive-spaces', 'Spa name cannot have multiple consecutive spaces', (value) => {
          return !value || !value.includes('  ');
        }),
      ownerName: yup
        .string()
        .required('Owner name is required')
        .max(40, 'Owner name cannot exceed 40 characters')
        .matches(/^[A-Za-z\s]+$/, 'Owner name should only contain letters and spaces')
        .test('no-leading-space', 'Owner name cannot start with a space', (value) => {
          return !value || !value.startsWith(' ');
        })
        .test('no-consecutive-spaces', 'Owner name cannot have multiple consecutive spaces', (value) => {
          return !value || !value.includes('  ');
        }),
      mobileNumber: yup
        .string()
        .required('Mobile number is required')
        .matches(/^[0-9]+$/, 'Mobile number should only contain digits')
        .test('mobile-number', 'Please enter a valid 10-digit mobile number', validateMobileNumber),
      email: yup
        .string()
        .required(t('reqEmail'))
        .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i, t('validEmailAddress')),
      password: yup
        .string()
        .required(t('reqPassword'))
        .min(8, t('errMinPassword'))
        .max(12, t('errMaxPassword'))
        .trim(t('validPassword'))
        .matches(
          /^(?=.*[A-Za-z0-9])(?=.*[@$!%*?&])[A-Za-z0-9@$!%*?&]+$/,
          t('errPassword')
        ),
      location: yup.object().shape({
        address: yup.string().nullable(),
        lat: yup.number().nullable(),
        log: yup.number().nullable(),
        city: yup.string().nullable(),
        state: yup.string().nullable(),
        country: yup.string().nullable(),
      }),
    })
    .strict(true);

  const appleFormSchema = yup
    .object()
    .shape({
      userName: yup
        .string()
        .required(t('reqName'))
        .matches(/^[A-Za-z\s]+$/, 'Spa name should only contain letters and spaces')
        .test('no-leading-space', 'Spa name cannot start with a space', (value) => {
          return !value || !value.startsWith(' ');
        })
        .test('no-consecutive-spaces', 'Spa name cannot have multiple consecutive spaces', (value) => {
          return !value || !value.includes('  ');
        }),
      ownerName: yup
        .string()
        .required('Owner name is required')
        .max(40, 'Owner name cannot exceed 40 characters')
        .matches(/^[A-Za-z\s]+$/, 'Owner name should only contain letters and spaces')
        .test('no-leading-space', 'Owner name cannot start with a space', (value) => {
          return !value || !value.startsWith(' ');
        })
        .test('no-consecutive-spaces', 'Owner name cannot have multiple consecutive spaces', (value) => {
          return !value || !value.includes('  ');
        }),
      mobileNumber: yup
        .string()
        .required('Mobile number is required')
        .matches(/^[0-9]+$/, 'Mobile number should only contain digits')
        .test('mobile-number', 'Please enter a valid 10-digit mobile number', validateMobileNumber),
      email: yup
        .string()
        .required(t('reqEmail'))
        .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i, t('validEmailAddress')),
      location: yup.object().shape({
        address: yup.string().nullable(),
        lat: yup.number().nullable(),
        log: yup.number().nullable(),
        city: yup.string().nullable(),
        state: yup.string().nullable(),
        country: yup.string().nullable(),
      }),
    })
    .strict(true);

  // Hooks
  const methods = useForm({
    resolver: yupResolver(appleData ? appleFormSchema : formSchema),
    defaultValues,
  });
  const { toaster } = useToaster();

  // Constants
  const {
    handleSubmit,
    reset,
    setValue,
    getValues,
    watch,
    clearErrors,
    trigger,
    setError,
    formState: { errors },
  } = methods;

  const selectedLocation = watch("location");

  // useEffect
  useEffect(() => {
    if (appleData) {
      setValue("email", appleData?.email);
    }
  }, [appleData, setValue]);

  // Handlers
  const onSubmit = async (data) => {
    console.log("error", errors);
    console.log("data", data);
    if (currentStep === 1) {
      // Validate step 1 fields before proceeding
      const isValid = await trigger(['userName', 'ownerName', 'mobileNumber', 'email', 'password']);
      if (isValid) {
        setCurrentStep(2);
      }
      return;
    }

    // Validate location on step 2 before submission
    if (currentStep === 2) {
      console.log("data", data);
      if ((!data?.location?.address || !data?.location?.city || data?.location?.address.trim() === '')) {
        // Set a manual error for the location field
        setError('location.address', {
          type: 'manual',
          message: 'Location is required'
        });
        return;
      }
      // Clear any existing location error
      clearErrors('location.address');
    }

    let signUpData = {
      username: data?.userName?.trim(),
      spaOwnerName: data?.ownerName?.trim(),
      phone: data?.mobileNumber?.trim(),
      location: data?.location?.address || "",
      lat: data?.location?.lat || "",
      log: data?.location?.log || "",
      city: data?.location?.city || "",
      state: data?.location?.state || "",
      country: data?.location?.country || "",
      countrycode: "+1",
    };

    if (appleData) {
      signUpData.email = appleData?.email || data?.email;
      signUpData.loginType = appleData?.loginType;
      signUpData.loginUid = appleData?.sub;
    } else {
      signUpData.email = data?.email;
      signUpData.password = data?.password;
      signUpData.loginType = "normal";
    }
    signUpData.deviceToken = fcmToken;
    if (placeId) {
      signUpData.place_id = placeId;
    }

    try {
      setLoading(true);
      const res = await axiosApiCall.post(API_ROUTER?.SIGNUP, signUpData);

      if (!res?.status) {
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        reset();
        setCurrentStep(1);
        setShowVerifyModal(true);
      }

    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setLoading(false);
    }
  };

  const getAddressComponent = (components = [], type) => (
    components.find((component) => component.types.includes(type))?.long_name || ""
  );

  const onChangeLocation = (locationData) => {
    setValue("location.address", locationData?.address);
    setValue("location.lat", locationData?.lat);
    setValue("location.log", locationData?.lng);
    setValue("location.city", locationData?.city || "");
    setValue("location.state", locationData?.state || "");
    setValue("location.country", locationData?.country || "");

    // Clear location error when location is set
    if (locationData?.address && locationData?.lat && locationData?.lng) {
      clearErrors("location");
      clearErrors("location.address");
    }
  };

  const clearLocationSearch = () => {
    setValue("location.address", "");
    setValue("location.lat", null);
    setValue("location.log", null);
    setValue("location.city", "");
    setValue("location.state", "");
    setValue("location.country", "");
    setPlaceId(null);
    clearErrors("location");
    clearErrors("location.address");
  };

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      toaster("Geolocation is not supported by your browser", TOAST_TYPES.ERROR);
      return;
    }

    setCurrentLocationLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = +position.coords.latitude.toFixed(6);
        const lng = +position.coords.longitude.toFixed(6);

        try {
          const geocoder = new window.google.maps.Geocoder();
          const { results } = await geocoder.geocode({ location: { lat, lng } });
          if (results?.length > 0) {
            const result = results[0];
            const addressComponents = result.address_components;

            setPlaceId(result.place_id);
            onChangeLocation({
              address: result.formatted_address,
              lat,
              lng,
              city: getAddressComponent(addressComponents, "locality") ||
                getAddressComponent(addressComponents, "administrative_area_level_2"),
              state: getAddressComponent(addressComponents, "administrative_area_level_1"),
              country: getAddressComponent(addressComponents, "country"),
            });
          } else {
            toaster("Unable to fetch address from current location", TOAST_TYPES.ERROR);
          }
        } catch (error) {
          toaster("Unable to fetch current location address", TOAST_TYPES.ERROR);
        } finally {
          setCurrentLocationLoading(false);
        }
      },
      () => {
        setCurrentLocationLoading(false);
        toaster("Please allow location permission", TOAST_TYPES.ERROR);
      }
    );
  };


  console.log("mobileNumber",getValues("mobileNumber"));
  return (
    <>
      <LoginLayoutUpdatedWrapper className="sitback-updated-signup-display-div">
        <section className="login-main-wrapper">
          <div className="login-inner-div signup-inner-div">
            <div className="login-left-div">
              <div className="login-left-image-div">
                <Image alt="sitback" src="/images/login-left-image.png" />
                <div className="login-above-image-div">
                  <Link href="/" className="login-logo-div">
                    <Image alt="sitback" src="/images/sitback-login-logo.svg" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="login-right-div">
              <div className="sitback-updated-signup-title-div">
                <Link href="/" className="logo-main-wrapper">
                  <Image alt="sitback" src="/images/sitback-logo.svg" />
                </Link>
                <h4>Register as Service Provider</h4>
                <div className="register-flow-display-wrapper">
                  <div className={`register-detail-div ${currentStep >= 1 ? "step-active-div" : ""}`}>
                    <div className="register-step-number-div">
                      <h5>1</h5>
                    </div>
                    <p>Basic Details</p>
                  </div>
                  <div className={`register-detail-div ${currentStep === 2 ? "step-active-div" : ""}`}>
                    <div className="register-step-number-div">
                      <h5>2</h5>
                    </div>
                    <p>Location</p>
                  </div>
                </div>
              </div>
              <LoginFormWrapper className="spaloginbook-appointment login-updated-form-wrapper">
                <FormProvider
                  methods={methods}
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className={currentStep === 1 ? "" : "d-none"}>
                    <FormGroup className="login-input-div">
                      <Label isLoginPageLableText={true}>{t('spaName')}*</Label>
                      <div className="icon-wrapper-main">
                        <i className="iconbox">
                          <Image alt="sitback" isContainImg src="/images/cityv5-icon.svg" />
                        </i>
                        <RHFTextInput
                          name="userName"
                          placeholder={t('enterYourBusinessName')}
                          autoComplete="off"
                          id="userName"
                          type="text"
                          onKeyDown={preventSpacesAndSpecialChars}
                          onChange={(e) => handleNameChange(e, 'userName')}
                          onPaste={(e) => handleNamePaste(e, 'userName')}
                        />
                      </div>

                    </FormGroup>

                    <FormGroup className="login-input-div">
                      <Label isLoginPageLableText={true}>Owner Name*</Label>
                      <div className="icon-wrapper-main">
                        <i className="iconbox">
                          <Image alt="sitback" isContainImg src="/images/userv5-icon.svg" />
                        </i>
                        <RHFTextInput
                          name="ownerName"
                          placeholder="Enter owner name"
                          autoComplete="off"
                          id="ownerName"
                          type="text"
                          onKeyDown={preventSpacesAndSpecialChars}
                          onChange={(e) => handleNameChange(e, 'ownerName')}
                          onPaste={(e) => handleNamePaste(e, 'ownerName')}
                        />
                      </div>

                    </FormGroup>

                    {appleData ?
                      <FormGroup className="login-input-div">
                        <Label isLoginPageLableText={true}>{t('emailAddress')}*</Label>
                        <div className="icon-wrapper-main">
                          <i className="iconbox">
                            <Image alt="sitback" isContainImg src="/images/emailv5-icon.svg" />
                          </i>
                          <RHFTextInput
                            name="email"
                            autoComplete="off"
                            placeholder={t('email')}
                            id="email"
                            type="email"
                            disabled
                          />
                        </div>
                      </FormGroup> : <FormGroup className="login-input-div">
                        <Label isLoginPageLableText={true}>{t('emailAddress')}*</Label>
                        <div className="icon-wrapper-main">
                          <i className="iconbox">
                            <Image alt="sitback" isContainImg src="/images/emailv5-icon.svg" />
                          </i>
                          <RHFTextInput
                            name="email"
                            autoComplete="off"
                            placeholder="Enter your email address"
                            id="email"
                            type="email"
                          />
                        </div>
                      </FormGroup>}

                    <FormGroup className="login-input-div">
                      <Label isLoginPageLableText={true}>Mobile Number*</Label>
                      <div className={getValues('mobileNumber') ? "phone-number-input-div " : "icon-wrapper-main"}>
                        {!getValues('mobileNumber') ?
                        <>
                         <i className="iconbox">
                            <Image alt="sitback" isContainImg src="/images/mobile-icon.svg" />
                          </i>
                        </> :
                        <div className="country-code-input">
                          <Input
                            placeholder="+1"
                            name="countryCode"
                            className="input-add-employee-wrapper"
                            readOnly
                          />
                        </div> }
                        <div className="mobile-number-input">
                          <Input
                            {...methods.register("mobileNumber", {
                              required: "Mobile number is required",
                              validate: validateMobileNumber
                            })}
                            placeholder="Enter 10-digit mobile number"
                            autoComplete="off"
                            id="mobileNumber"
                            type="tel"
                            maxLength={10}
                            onChange={handleMobileNumberChange}
                            onPaste={handleMobilePaste}
                            onKeyDown={(e) => {
                              // Allow only numbers, backspace, delete, tab, enter, arrow keys
                              const allowedKeys = ['Backspace', 'Delete', 'Tab', 'Enter', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];
                              if (!allowedKeys.includes(e.key) && !/^[0-9]$/.test(e.key)) {
                                e.preventDefault();
                              }
                            }}
                          />
                        </div>
                      </div>
                      {errors?.mobileNumber && (
                        <div className="error-message" style={{ color: '#DC3545', fontSize: '12px', marginTop: '5px', marginLeft: '20px' }}>
                          {errors?.mobileNumber?.message}
                        </div>
                      )}
                    </FormGroup>

                    {!appleData &&
                      <>
                        <FormGroup className="login-input-div">
                          <Label isLoginPageLableText={true}>{t('password')}*</Label>
                          <div className="icon-wrapper-main">
                            <i className="iconbox">
                              <Image alt="sitback" isContainImg src="/images/passwordv5-icon.svg" />
                            </i>
                            <RHFPasswordInput
                              name="password"
                              id="password"
                              placeholder="Enter your password"
                            />
                          </div>
                        </FormGroup>
                      </>
                    }
                  </div>
                  {/* search location section */}
                  <div className={`search-location-display-div ${currentStep === 2 ? "" : "d-none"}`}>
                    <FormGroup className="login-input-div">
                      <div className="search-input-div">
                        {/* <i className="img-icon"></i> */}
                        <PlacesAutocomplete
                          value={selectedLocation?.address || ""}
                          onChange={(address) => {
                            setValue("location.address", address);
                            setValue("location.lat", null);
                            setValue("location.log", null);
                            if (address === "") {
                              clearErrors("location");
                              clearErrors("location.address");
                            }
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
                              clearErrors("location");
                              clearErrors("location.address");

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

                              setValue("location.city", city);
                              setValue("location.state", state);
                              setValue("location.country", country);
                            } catch (error) {
                              toaster("Unable to fetch selected location", TOAST_TYPES.ERROR);
                            }
                          }}
                        >
                          {({ getInputProps, suggestions, getSuggestionItemProps }) => {
                            const addressValue = selectedLocation?.address || "";
                            const showClearSearch = addressValue.trim().length > 0;
                            return (
                            <div className="location-input-wrapper-div">
                              <div className={`icon-wrapper-main${showClearSearch ? " location-search-with-clear" : ""}`}>
                                <i className="iconbox">
                                  <Image alt="sitback" isContainImg src="/images/searchv5-Icon.svg" />
                                </i>
                                <Input
                                  isSmallInputWrapper={true}
                                  {...getInputProps({
                                    placeholder: "Search for your business location",
                                    className: `location-input${showClearSearch ? " location-input--has-clear" : ""}`,
                                  })}
                                />
                                {showClearSearch && (
                                  <button
                                    type="button"
                                    className="location-search-clear-btn"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      clearLocationSearch();
                                    }}
                                    aria-label="Clear location search"
                                  >
                                    ×
                                  </button>
                                )}
                              </div>
                              {currentStep === 2 && errors?.location?.address && (
                                <div className="error-message" style={{ color: '#DC3545', fontSize: '12px', marginTop: '5px' }}>
                                  {errors.location.address.message}
                                </div>
                              )}
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
                                          <span>
                                            <div>
                                              <div className="search-pin-icon">
                                                <Image alt="sitback" isContainImg src="/images/map-pin-Iconv6.svg" />
                                              </div>
                                            </div>
                                            {suggestion.description}
                                            </span>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                            );
                          }}
                        </PlacesAutocomplete>
                      </div>
                    </FormGroup>
                    <Button
                      type="button"
                      className="current-location-btn"
                      disabled={currentLocationLoading}
                      onClick={handleUseCurrentLocation}
                    >
                      <i className="img-icon">
                        <Image alt="sitback" isContainImg src="/images/use-my-surrent.svg" />
                      </i>
                      {currentLocationLoading ? "Fetching Current Location..." : "Use My Current Location"}
                    </Button>
                    <p className="note-display-text">
                      <div>
                        <i className="img-icon">
                          <Image alt="sitback" isContainImg src="/images/map-pinv5Icon.svg" />
                        </i>
                      </div>
                      Search for your business, select from suggestions, or tap the map to place your pin.
                    </p>
                    <div className="map-display-div">
                      <SignupGoogleLocations
                        location={selectedLocation}
                        draggable={true}
                        onChangeLocation={onChangeLocation}
                      />
                    </div>

                  </div>
                  {/* search location section */}
                  <LoadingButton
                    type="submit"
                    disabled={loading}
                    label={currentStep === 1 ? "NEXT: SELECT LOCATION" : t('agreeAndReg')}
                    loadinglabel={`${currentStep === 1 ? "NEXT: SELECT LOCATION" : t('agreeAndReg')}...`}
                    isLoading={loading}
                    className="loading-btn-wrapper"
                  />
                  <span
                    type="button"
                    className={`back-to-step-link ${currentStep === 2 ? "" : "d-none"}`}
                    onClick={() => setCurrentStep(1)}
                  >
                    Back to Step 1
                  </span>
                </FormProvider>
              </LoginFormWrapper>
              <div className="account-text-with-social-login-div">
                <div className="account-text-link">
                  <h5>{t('alreadyAccount')} <Link href={PATH_AUTH?.signIn} className="">{t('login')}</Link></h5>
                </div>
                <div className="social-login-wrapper">
                  <div className="login-text"><span>{t('orLoginWith')}</span></div>
                  <SocialLoginIconsWrapper>
                    <li>
                      <Apple
                        setAppleData={setAppleData}
                        loginType={"apple"}
                      />
                    </li>
                    <GoogleButton
                      setAppleData={setAppleData}
                      isSignUp={true}
                      loginType={"google"}
                    />
                  </SocialLoginIconsWrapper>
                </div>
              </div>
            </div>
          </div>
        </section>
      </LoginLayoutUpdatedWrapper>
      <VerifyMessagePopup
        show={showVerifyModal}
        onHide={() => setShowVerifyModal(false)}
        appleData={appleData}

      />
    </>
  )
}
