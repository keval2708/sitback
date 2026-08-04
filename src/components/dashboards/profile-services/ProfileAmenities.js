import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import * as yup from "yup";
import { CogIcon } from "./SpaTabIcons";
import { useToaster } from "@/hooks";
import { API_ROUTER } from "@/services/apiRouter";
import { AmenitiesCardWrapper } from "@/styles/pages/profile.style";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";
import { getSocketId } from "@/utils/helper";

const amenitySchema = yup.string()
  .trim()
  .required("Amenity name is required")
  .max(120, "Amenity name cannot exceed 120 characters");

export const ProfileAmenities = () => {
  const { toaster } = useToaster();
  const [loading, setLoading] = useState(false);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [spaAmenities, setSpaAmenities] = useState([]);
  const [deletingAmenityId, setDeletingAmenityId] = useState(null);
  const [addingAmenityId, setAddingAmenityId] = useState(null);

  const [amenityInput, setAmenityInput] = useState("");
  const [error, setError] = useState("");

  // Fetch lists on mount
  const listAmenities = async (isFirstTime = false) => {
    try {
      if (isFirstTime) {
        setLoading(true);
      }
      const res = await axiosApiCall.get(API_ROUTER?.SPA_LIST_AMENITIES);
      if (!res?.status) {
        toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        setSpaAmenities(res?.data?.data || []);
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      if (isFirstTime) {
        setLoading(false);
      }
    }
  };

  const fetchAllAmenities = async () => {
    try {
      const res = await axiosApiCall.get(API_ROUTER?.LIST_AMENITIES);
      if (res?.status) {
        setSelectedAmenities(res?.data?.data || []);
      }
    } catch (error) {
      console.error("Error fetching all amenities:", error);
    }
  };

  useEffect(() => {
    listAmenities(true);
    fetchAllAmenities();
  }, []);

  // Socket updates
  useEffect(() => {
    if (window.io) {
      const socketHandler = async (msg) => {
        if (msg?.action === "spaAmenitiesListUpdate") {
          listAmenities(false);
          fetchAllAmenities();
        }
      };
      window.io.socket.on("serviceprovider", socketHandler);
      return () => {
        window.io.socket.off("serviceprovider", socketHandler);
      };
    }
  }, [window.io]);

  const handleAddAmenity = async (param) => {
    try {
      const res = await axiosApiCall.post(API_ROUTER?.ADD_AMENITIES, param);
      if (!res?.status) {
        toaster(res?.message || "Failed to add amenity", TOAST_TYPES.ERROR);
      } else {
        toaster(res?.data?.message || "Amenity added successfully!", TOAST_TYPES.SUCCESS);
        listAmenities(false);
        fetchAllAmenities();
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  };

  const handleRemoveAmenity = async (id) => {
    setDeletingAmenityId(id);
    const socketId = getSocketId();
    try {
      const param = {
        id: id,
        socketId: socketId,
      };
      const res = await axiosApiCall.post(API_ROUTER?.DELETE_AMENITIES, param);
      if (!res?.status) {
        toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        toaster("Amenity removed successfully!", TOAST_TYPES.SUCCESS);
        setSpaAmenities((prev) => prev.filter((a) => a.id !== id));
        listAmenities(false);
        fetchAllAmenities();
      }
    } catch (err) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setDeletingAmenityId(null);
    }
  };

  const handleAddCustom = async () => {
    const inputVal = amenityInput.trim();
    
    try {
      await amenitySchema.validate(inputVal);
      setError("");
    } catch (err) {
      setError(err.message);
      return;
    }

    // Check if it's already active
    const activeNames = spaAmenities.map((a) => a.name.toLowerCase());
    if (activeNames.includes(inputVal.toLowerCase())) {
      setError("Amenity already added!");
      return;
    }

    const param = {
      name: inputVal,
      socketId: getSocketId(),
    };
    await handleAddAmenity(param);
    setAmenityInput("");
  };

  const handleSuggestionClick = async (amenity) => {
    setAddingAmenityId(amenity.id);
    const param = {
      amenities_id: amenity.id,
      name: amenity.name,
      socketId: getSocketId(),
    };
    try {
      await handleAddAmenity(param);
    } finally {
      setAddingAmenityId(null);
    }
  };

  // Filter out suggestions that are already active
  const activeNames = spaAmenities.map((a) => a.name.toLowerCase());
  const suggestionsToShow = selectedAmenities.filter(
    (amenity) => amenity?.name && !activeNames.includes(amenity.name.toLowerCase())
  );

  return (
    <div className="profile-subtab-panel">
      {loading ? (
        <AmenitiesCardWrapper style={{ cursor: 'default', pointerEvents: 'none' }}>
          {/* Current Amenities Skeleton */}
          <div className="amenities-section">
            <Skeleton width={150} height={20} style={{ marginBottom: '12px' }} />
            <div className="chips-container" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {[1, 2, 3, 4].map((item) => (
                <Skeleton key={item} width={90} height={32} borderRadius={20} />
              ))}
            </div>
          </div>

          {/* Add Amenity Skeleton */}
          <div className="amenities-section" style={{ marginTop: '20px' }}>
            <Skeleton width={110} height={20} style={{ marginBottom: '12px' }} />
            <div className="input-action-row" style={{ display: 'flex', gap: '10px' }}>
              <Skeleton width="70%" height={40} borderRadius={8} />
              <Skeleton width="20%" height={40} borderRadius={8} />
            </div>
          </div>

          {/* Suggestions Skeleton */}
          <div className="amenities-section" style={{ marginTop: '20px' }}>
            <Skeleton width={120} height={20} style={{ marginBottom: '12px' }} />
            <div className="chips-container" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <Skeleton key={item} width={110} height={32} borderRadius={20} />
              ))}
            </div>
          </div>
        </AmenitiesCardWrapper>
      ) : (
        <AmenitiesCardWrapper>
          {/* Current Amenities */}
          <div className="amenities-section">
            <h4 className="section-title">Current Amenities</h4>
            <div className="chips-container">
              {spaAmenities.length > 0 ? (
                spaAmenities.map((amenity) => (
                  <div key={amenity.id} className="amenity-chip">
                    {amenity.name}
                    <button
                      type="button"
                      className="remove-btn"
                      onClick={() => handleRemoveAmenity(amenity.id)}
                      disabled={deletingAmenityId !== null || loading}
                    >
                      {deletingAmenityId === amenity.id ? (
                        <img
                          alt="loading"
                          className="loader-img"
                          src="/images/loader-icon.gif"
                        />
                      ) : (
                        "×"
                      )}
                    </button>
                  </div>
                ))
              ) : (
                <span className="empty-text">No amenities added yet.</span>
              )}
            </div>
          </div>

          {/* Add Amenity */}
          <div className="amenities-section">
            <h4 className="section-title">Add Amenity</h4>
            <div className="add-amenity-form">
              <div className="input-action-row">
                <input
                  type="text"
                  className="text-input-field"
                  placeholder="Type amenity name..."
                  value={amenityInput}
                  maxLength={120}
                  onChange={(e) => {
                    setAmenityInput(e.target.value);
                    if (error) setError("");
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddCustom();
                    }
                  }}
                />
                <button
                  type="button"
                  className="add-action-btn"
                  onClick={handleAddCustom}
                  disabled={loading || !amenityInput.trim()}
                >
                  + Add
                </button>
              </div>
              {error && (
                <p className="text-danger" style={{ marginTop: "6px", fontSize: "13px", paddingLeft: "4px" }}>
                  {error}
                </p>
              )}
            </div>
          </div>

          {/* Suggestions */}
          <div className="amenities-section">
            <h4 className="section-title">
              <CogIcon />
              Suggestions
            </h4>
            <div className="chips-container">
              {suggestionsToShow.length > 0 ? (
                suggestionsToShow.map((amenity) => (
                  <div
                    key={amenity.id}
                    className="suggestion-chip"
                    style={{
                      pointerEvents: (addingAmenityId !== null || loading) ? "none" : "auto",
                      opacity: (addingAmenityId === amenity.id) ? 0.6 : 1,
                      cursor: (addingAmenityId !== null || loading) ? "not-allowed" : "pointer"
                    }}
                    onClick={() => {
                      if (addingAmenityId === null && !loading) {
                        handleSuggestionClick(amenity);
                      }
                    }}
                  >
                    {addingAmenityId === amenity.id ? "Adding..." : `+ ${amenity.name}`}
                  </div>
                ))
              ) : (
                <span className="empty-text">All suggestions added.</span>
              )}
            </div>
          </div>
        </AmenitiesCardWrapper>
      )}
    </div>
  );
};
