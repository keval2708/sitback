"use client";

import React, { useEffect, useState } from "react";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";

import LoadingButton from "@/components/shared/button/LoadingButton";
import { useToaster } from "@/hooks";
import { authCheckSliceSelector, loginDetail } from "@/redux/authCheck";
import { API_ROUTER } from "@/services/apiRouter";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";

const formSchema = yup.object().shape({
  username: yup
    .string()
    .required("Spa Name is required")
    .max(40, "Spa Name must be 40 characters or less"),
  tagline: yup.string().nullable(),
  description: yup.string().nullable(),
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  phoneNumber: yup
    .string()
    .required("Phone Number is required")
    .matches(/^\d{10}$/, "Phone number must be exactly 10 digits"),
  street: yup.string().required("Address is required"),
});

export default function SpaDetails() {
  const { login } = useSelector(authCheckSliceSelector);
  const { toaster } = useToaster();
  const dispatch = useDispatch();

  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    username: "",
    tagline: "",
    description: "",
    email: "",
    phoneNumber: "",
    street: "",
    city: "",
    zipCode: "",
    state: "",
    country: "",
    lat: null,
    log: null,
    placeId: null,
  });

  useEffect(() => {
    if (login) {
      setFormData({
        username: login?.username || "",
        tagline: login?.tagline || "",
        description: login?.description || login?.about || "",
        email: login?.email || "",
        phoneNumber: login?.phone || "",
        street: login?.location || login?.street || "",
        city: login?.city || "",
        zipCode: login?.zip || login?.postalCode || "",
        state: login?.state || "",
        country: login?.country || "",
        lat: login?.lat || null,
        log: login?.log || null,
        placeId: login?.place_id || null,
      });
    }
  }, [login]);

  const handleChange = (field) => (event) => {
    setFormData((prev) => ({ ...prev, [field]: event.target.value }));
    if (errors[field]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }
  };

  const handlePhoneInputChange = (event) => {
    const val = event.target.value.replace(/\D/g, ""); // Only digits
    setFormData((prev) => ({ ...prev, phoneNumber: val }));
    if (errors.phoneNumber) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated.phoneNumber;
        return updated;
      });
    }
  };

  const handleLocationSelect = async (address) => {
    setFormData((prev) => ({
      ...prev,
      street: address,
      lat: null,
      log: null,
      placeId: null,
    }));
    if (errors.street) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated.street;
        return updated;
      });
    }
    try {
      const results = await geocodeByAddress(address);
      const latLng = await getLatLng(results[0]);
      const { lat, lng } = latLng;
      const placeId = results[0]?.place_id || null;
      // console.log("Latitude:", lat, "Longitude:", lng, "Place ID:", placeId);
      // return

      // Extract city, state, and postal code
      const addressComponents = results[0].address_components;
      let city = "";
      let state = "";
      let zipCode = "";
      let country = "";

      addressComponents.forEach((component) => {
        if (component.types.includes("locality")) {
          city = component.long_name;
        }
        if (component.types.includes("administrative_area_level_1")) {
          state = component.short_name; // e.g. "NY", "CA"
        }
        if (component.types.includes("postal_code")) {
          zipCode = component.long_name;
        }
        if (component.types.includes("country")) {
          country = component.long_name;
        }
      });

      setFormData((prev) => ({
        ...prev,
        street: address,
        city: city || prev.city,
        state: state || prev.state,
        zipCode: zipCode || prev.zipCode,
        country: country || prev.country,
        lat: +lat.toFixed(6),
        log: +lng.toFixed(6),
        placeId: placeId,
      }));
    } catch (error) {
      // Failed to geocode
    }
  };

  const handleEditDetails = async (event) => {
    event.preventDefault();
    try {
      setSubmitting(true);
      await formSchema.validate(formData, { abortEarly: false });
      setErrors({});

      const editData = {
        username: formData?.username,
        tagline: formData?.tagline,
        description: formData?.description,
        location: formData?.street || "",
        street: formData?.street || "",
        city: formData?.city || "",
        state: formData?.state || "",
        zip: formData?.zipCode || "",
        lat: formData?.lat || "",
        log: formData?.log || "",
        country: formData?.country || "",
        countrycode: "+1",
        phone: formData?.phoneNumber,
      };

      if (formData?.placeId) {
        editData.place_id = formData.placeId;
      }

      const res = await axiosApiCall.post(API_ROUTER?.UPDATE_SERVICE, editData);

      if (!res?.status) {
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        toaster(res?.data?.message, TOAST_TYPES.SUCCESS);
        dispatch(loginDetail(res?.data?.data));
      }
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const validationErrors = {};
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        setErrors(validationErrors);
      } else {
        toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="profile-subtab-panel">
      <form onSubmit={handleEditDetails}>
        <p className="panel-section-title">Basic Info</p>
        <div className="form-row-grid">
          <div className="form-field">
            <input
              type="text"
              name="username"
              placeholder="Spa Name"
              value={formData.username}
              onChange={handleChange("username")}
            />
            {errors.username && <p className="text-danger small mt-1">{errors.username}</p>}
          </div>
          <div className="form-field">
            <input
              type="text"
              name="tagline"
              placeholder="Tagline"
              value={formData.tagline}
              onChange={handleChange("tagline")}
            />
            {errors.tagline && <p className="text-danger small mt-1">{errors.tagline}</p>}
          </div>
        </div>

        <p className="panel-section-title">About</p>
        <div className="form-row-grid full-width">
          <div className="form-field">
            <textarea
              name="description"
              placeholder="About"
              className="form-control"
              value={formData.description}
              onChange={handleChange("description")}
            />
            {errors.description && <p className="text-danger small mt-1">{errors.description}</p>}
          </div>
        </div>

        <p className="panel-section-title">Contact</p>
        <div className="form-row-grid">
          <div className="form-field">
            <input
              type="email"
              name="email"
              disabled
              placeholder="Email"
              value={formData.email}
            />
          </div>
          <div className="form-field">
            <div className="phone-number-input-div">
              <div className="country-code-input">
                <input
                  type="text"
                  className="input-add-employee-wrapper css-7n8efy"
                  disabled
                  name="countryCode"
                  value={"+1"}
                  aria-label="Country code"
                />
              </div>
              <div className="phone-divider"></div>
              <div className="mobile-number-input">
                <input
                  type="tel"
                  placeholder="Enter 10-digit mobile number"
                  autoComplete="off"
                  id="mobileNumber"
                  maxLength="10"
                  className="css-7n8efy"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handlePhoneInputChange}
                />
              </div>
            </div>
            {errors.phoneNumber && <p className="text-danger small mt-1">{errors.phoneNumber}</p>}
          </div>
        </div>

        <p className="panel-section-title">Address</p>
        <div className="form-row-grid full-width">
          <div className="form-field">
            <PlacesAutocomplete
              value={formData.street}
              onChange={(address) => {
                setFormData((prev) => ({
                  ...prev,
                  street: address,
                  lat: null,
                  log: null,
                  placeId: null,
                }));
                if (errors.street) {
                  setErrors((prev) => {
                    const updated = { ...prev };
                    delete updated.street;
                    return updated;
                  });
                }
              }}
              onSelect={handleLocationSelect}
            >
              {({ getInputProps, suggestions, getSuggestionItemProps }) => (
                <div className="location-input-wrapper-div" style={{ position: "relative" }}>
                  <input
                    type="text"
                    {...getInputProps({
                      placeholder: "Address",
                      className: "form-control",
                    })}
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
            {errors.street && <p className="text-danger small mt-1">{errors.street}</p>}
          </div>
        </div>

        <LoadingButton
          type="submit"
          disabled={submitting}
          label="SAVE"
          loadinglabel="SAVING"
          isLoading={submitting}
          className="save-btn"
        />
      </form>
    </div>
  );
}
