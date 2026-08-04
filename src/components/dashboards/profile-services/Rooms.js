"use client";

import React, { useEffect, useMemo, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import DeleteModal from "@/components/shared/modal/DeleteModal";
import { useToaster } from "@/hooks";
import { API_ROUTER } from "@/services/apiRouter";
import { ProfileServicesRoomsWrapper, RoomModalWrapper, StyledRoomModal } from "@/styles/pages/profile.style";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";

// Icons
const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="#295086" d="M3.333 14h9.334C13.4 14 14 13.4 14 12.667V8h-1.333v4.667H3.333V3.333H8V2H3.333C2.6 2 2 2.6 2 3.333v9.334C2 13.4 2.6 14 3.333 14" /><path fill="#295086" d="M4.667 8.667v2c0 .366.3.666.666.666h2c.18 0 .347-.073.474-.193l6-6a.663.663 0 0 0 0-.94l-2-2a.663.663 0 0 0-.94 0L4.86 8.193a.67.67 0 0 0-.193.474m6.666-5.06 1.06 1.06-.726.726-1.06-1.06zM6 8.94l3.667-3.667 1.06 1.06L7.06 10H6z" /></svg>
);

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="#295086" d="M4.667 14q-.55 0-.942-.391a1.29 1.29 0 0 1-.392-.942V4a.64.64 0 0 1-.474-.192.65.65 0 0 1-.192-.475q0-.282.192-.474a.65.65 0 0 1 .474-.192H6q0-.284.192-.475A.65.65 0 0 1 6.667 2h2.666q.284 0 .476.192a.64.64 0 0 1 .191.475h2.667q.283 0 .475.192a.64.64 0 0 1 .191.474.65.65 0 0 1-.192.476.64.64 0 0 1-.474.191v8.667q0 .549-.392.942-.39.391-.942.391zm6.666-10H4.667v8.667h6.666zm-4.191 7.142a.65.65 0 0 0 .191-.475V6a.64.64 0 0 0-.192-.475.65.65 0 0 0-.474-.192.64.64 0 0 0-.475.192A.65.65 0 0 0 6 6v4.667q0 .283.192.475a.64.64 0 0 0 .475.191.65.65 0 0 0 .475-.191m2.667 0a.64.64 0 0 0 .191-.475V6a.64.64 0 0 0-.192-.475.65.65 0 0 0-.475-.192.64.64 0 0 0-.474.192.65.65 0 0 0-.192.475v4.667q0 .283.192.475a.64.64 0 0 0 .474.191.65.65 0 0 0 .476-.192" /></svg>
);

const UploadIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: '#295086' }}>
    <path d="M12 3v13m0-13L8 7m4-4l4 4M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CloseModalIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: '#E32C1F' }}>
    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
    <path stroke="#718096" strokeWidth="1.6" d="M6.4 7.2a2.4 2.4 0 1 0 0-4.8 2.4 2.4 0 0 0 0 4.8Z" />
    <path stroke="#718096" strokeLinecap="round" strokeWidth="1.6" d="M1.6 13.6a4.8 4.8 0 1 1 9.6 0" />
    <path stroke="#718096" strokeWidth="1.4" d="M12 6.56a1.76 1.76 0 1 0 0-3.52 1.76 1.76 0 0 0 0 3.52Z" />
    <path stroke="#718096" strokeLinecap="round" strokeWidth="1.4" d="M13.6 13.6c0-1.768-1.074-3.28-2.56-3.84" />
  </svg>
);

const EmptyStateIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 44V30.86M24 22H24.02M24 14H24.02M28 30.86V44M30 32C28.269 30.7018 26.1637 30 24 30C21.8363 30 19.731 30.7018 18 32M32 22H32.02M32 14H32.02M16 22H16.02M16 14H16.02" stroke="#007BFF" strokeOpacity="0.4" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M36 4H12C9.79086 4 8 5.79086 8 8V40C8 42.2091 9.79086 44 12 44H36C38.2091 44 40 42.2091 40 40V8C40 5.79086 38.2091 4 36 4Z" stroke="#007BFF" strokeOpacity="0.4" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
  </svg>

);

const spaServiceTypes = [
  "Massage",
  "Facial",
  "Body Treatment",
  "Hydrotherapy",
  "Steam",
  "Sauna",
  "Jacuzzi",
  "Couple Therapy",
  "Ayurvedic",
  "Beauty Treatment",
  "Relaxation",
  "Multi-Service",
];

export const Rooms = () => {
  const { t } = useTranslation();
  const { toaster } = useToaster();

  const roomValidationSchema = useMemo(() => yup.object().shape({
    roomName: yup
      .string()
      .required(t("roomNameRequired", "Room name is required"))
      .test("not-only-spaces", t("roomNameSpaces", "Room Name is required"), (value) => {
        return value && value.trim().length > 0;
      }),
    roomType: yup
      .string()
      .required(t("roomTypeRequired", "Room type is required")),
    capacity: yup
      .string()
      .required(t("capacityRequired", "Capacity is required"))
      .test("not-only-spaces", t("capacitySpaces", "Capacity is required"), (value) => {
        return value && value.trim().length > 0;
      })
      .matches(/^\d+$/, t("capacityNumber", "Capacity must be a valid number"))
      .test("is-positive", t("capacityPositive", "Capacity must be greater than 0"), (value) => {
        const num = parseInt(value, 10);
        return !isNaN(num) && num > 0;
      }),
    description: yup
      .string()
      .max(500, t("descriptionMax", "Description must not exceed 500 characters"))
      .nullable(),
    amenities: yup
      .array()
      .min(0),
    image: yup
      .mixed()
      .nullable()
      .test("fileSize", t("fileSizeError", "File size exceeds 5MB limit"), (value) => {
        if (!value) return true;
        if (typeof value === "string") return true;
        if (value && value.fileObj) {
          return value.fileObj.size <= 5 * 1024 * 1024;
        }
        return true;
      })
      .test("fileType", t("fileTypeError", "Unsupported file type. Please upload JPEG, PNG, GIF, or WEBP"), (value) => {
        if (!value) return true;
        if (typeof value === "string") return true;
        if (value && value.fileObj) {
          return ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"].includes(value.fileObj.type);
        }
        return true;
      }),
    isActive: yup
      .boolean()
  }), [t]);

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  // Pagination states
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  // Modal controls
  const [showModal, setShowModal] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  // Form states
  const [formRoomName, setFormRoomName] = useState("");
  const [formRoomType, setFormRoomType] = useState("Massage");
  const [formCapacity, setFormCapacity] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formAmenities, setFormAmenities] = useState([]);
  const [formIsActive, setFormIsActive] = useState(true);
  const [formImage, setFormImage] = useState(null);

  const [amenityInput, setAmenityInput] = useState("");
  const [formError, setFormError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  const fetchRooms = async (currentPage = page) => {
    try {
      setLoading(true);
      const res = await axiosApiCall.get(API_ROUTER?.LIST_ROOM, {
        params: {
          page: currentPage,
          limit,
          search: "",
        },
      });
      console.log("res", res);
      if (!res?.status) {
        toaster(res?.message || "Failed to fetch rooms.", TOAST_TYPES.ERROR);
      } else {
        const records = res?.data?.data?.roomList || (Array.isArray(res?.data?.data) ? res?.data?.data : []);
        setRooms(records);
        const totalCount = res?.data?.data?.totalRecords || res?.data?.data?.count || 0;
        const pages = Math.ceil(totalCount / limit) || 1;
        setTotalPages(pages);
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setLoading(false);
    }
  };

  // Fetch rooms on page changes
  useEffect(() => {
    fetchRooms(page);
  }, [page]);

  const handleOpenAdd = () => {
    setFormRoomName("");
    setFormRoomType("Massage");
    setFormCapacity("");
    setFormDescription("");
    setFormAmenities([]);
    setFormIsActive(true);
    setFormImage(null);
    setAmenityInput("");
    setFormError("");
    setValidationErrors({});
    setEditTarget(null);
    setShowModal(true);
  };

  const handleOpenEdit = (room) => {
    setEditTarget(room);
    setFormRoomName(room.name || "");
    setFormRoomType(room.roomType || room.type || "Massage");
    setFormCapacity(room.capacity ? String(room.capacity) : "");
    setFormDescription(room.description || "");

    let parsedAmenities = [];
    if (room.amenities) {
      if (Array.isArray(room.amenities)) {
        parsedAmenities = room.amenities;
      } else if (typeof room.amenities === "string") {
        try {
          parsedAmenities = JSON.parse(room.amenities);
        } catch (e) {
          parsedAmenities = room.amenities.split(",").map((a) => a.trim()).filter(Boolean);
        }
      }
    }
    setFormAmenities(parsedAmenities);

    setFormIsActive(room.isActive !== undefined ? room.isActive : true);
    setFormImage(room.image || null);
    setAmenityInput("");
    setFormError("");
    setValidationErrors({});
    setShowModal(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFormImage({
      file: URL.createObjectURL(file),
      fileObj: file,
    });
    setFormError("");
    setValidationErrors((prev) => {
      const next = { ...prev };
      delete next.image;
      return next;
    });
  };

  const removeImage = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (formImage?.file) {
      URL.revokeObjectURL(formImage.file);
    }
    setFormImage(null);
    setValidationErrors((prev) => {
      const next = { ...prev };
      delete next.image;
      return next;
    });
  };

  const handleAddAmenity = () => {
    if (amenityInput.trim()) {
      if (formAmenities.includes(amenityInput.trim())) {
        setFormError("Amenity already added.");
        return;
      }
      setFormAmenities((prev) => [...prev, amenityInput.trim()]);
      setAmenityInput("");
      setFormError("");
    }
  };

  const handleRemoveAmenity = (amenity) => {
    setFormAmenities((prev) => prev.filter((a) => a !== amenity));
  };

  const validateForm = async () => {
    try {
      await roomValidationSchema.validate({
        roomName: formRoomName,
        roomType: formRoomType,
        capacity: formCapacity,
        description: formDescription,
        amenities: formAmenities,
        image: formImage,
        isActive: formIsActive
      }, { abortEarly: false });
      setValidationErrors({});
      return true;
    } catch (err) {
      const errors = {};
      err.inner.forEach((error) => {
        errors[error.path] = error.message;
      });
      setValidationErrors(errors);
      return false;
    }
  };

  const handleSaveRoom = async (e) => {
    e.preventDefault();

    const isValid = await validateForm();
    if (!isValid) {
      return;
    }

    try {
      setActionLoading(true);
      const formData = new FormData();
      if (editTarget) {
        formData.append("roomId", editTarget.roomId || editTarget.id || editTarget._id);
      }
      formData.append("name", formRoomName.trim());
      formData.append("roomType", formRoomType);
      formData.append("capacity", formCapacity.trim());
      formData.append("description", formDescription.trim());
      formData.append("isActive", formIsActive);
      formData.append("amenities", JSON.stringify(formAmenities));

      if (formImage) {
        if (formImage.fileObj) {
          formData.append("image", formImage.fileObj);
        } else if (typeof formImage === "string") {
          formData.append("image", formImage);
        }
      } else {
        formData.append("image", "");
      }

      let res;
      if (editTarget) {
        res = await axiosApiCall.post(API_ROUTER?.EDIT_ROOM, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        res = await axiosApiCall.post(API_ROUTER?.ADD_ROOM, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      if (!res?.status) {
        toaster(res?.message || "Failed to save room details.", TOAST_TYPES.ERROR);
      } else {
        toaster(res?.data?.message || (editTarget ? "Room updated successfully!" : "Room added successfully!"), TOAST_TYPES.SUCCESS);
        setShowModal(false);
        fetchRooms(1);
        setPage(1);
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setActionLoading(false);
    }
  };

  const handleOpenDelete = (room) => {
    setDeleteTarget(room);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (deleteTarget) {
      try {
        setActionLoading(true);
        const roomId = deleteTarget.roomId || deleteTarget.id || deleteTarget._id;
        const res = await axiosApiCall.delete(`${API_ROUTER?.DELETE_ROOM}?roomId=${roomId}`);

        if (!res?.status) {
          toaster(res?.message || "Failed to delete room.", TOAST_TYPES.ERROR);
        } else {
          toaster(res?.data?.message || "Room deleted successfully!", TOAST_TYPES.SUCCESS);
          setShowDeleteModal(false);
          setDeleteTarget(null);
          fetchRooms(1);
          setPage(1);
        }
      } catch (error) {
        toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
      } finally {
        setActionLoading(false);
      }
    }
  };

  return (
    <div className="profile-subtab-panel">
      <ProfileServicesRoomsWrapper>
        {/* Header Row */}
        <div className="rooms-header-row">
          <h3>{t("Rooms") || "Rooms"}</h3>
          {!loading && rooms?.length > 0 && (
            <button type="button" className="add-room-btn" onClick={handleOpenAdd}>
              + {t("Add Room") || "Add Room"}
            </button>
          )}
        </div>

        {/* Conditional Layout Rendering */}
        {loading ? (
          <div className="rooms-grid-layout" style={{ cursor: 'default', pointerEvents: 'none' }}>
            {[1, 2, 3].map((item) => (
              <div className="room-ui-card" key={item}>
                <div className="room-image-area" style={{ background: 'transparent' }}>
                  <Skeleton width="100%" height="100%" />
                </div>
                <div className="room-body-area">
                  <div className="room-title-line" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Skeleton width={120} height={20} />
                    <Skeleton width={50} height={20} />
                  </div>
                  <div className="room-meta-line" style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                    <Skeleton width={60} height={16} borderRadius={50} />
                    <Skeleton width={40} height={16} />
                  </div>
                  <Skeleton count={2} height={14} style={{ marginTop: '12px' }} />
                </div>
              </div>
            ))}
          </div>
        ) : rooms?.length > 0 ? (
          <>
            <div className="rooms-grid-layout">
              {rooms?.map((room) => {
                const roomId = room?.id;
                const roomType = room?.roomType;
                const roomImage = room?.image;
                return (
                  <div className="room-ui-card" key={roomId}>
                    {/* Image Area */}
                    <div className="room-image-area">
                      {roomImage ? (
                        <img
                          src={typeof roomImage === "object" && roomImage?.file ? roomImage.file : roomImage}
                          alt={room?.name}
                        />
                      ) : (
                        <div className="no-image-placeholder">
                          {t("No Image") || "No Image"}
                        </div>
                      )}
                    </div>

                    {/* Body Area */}
                    <div className="room-body-area">
                      <div className="room-title-line">
                        <h4>{room?.name}</h4>
                        <div className="actions-container">
                          <button
                            type="button"
                            className="edit-btn"
                            onClick={() => handleOpenEdit(room)}
                            title={t("Edit") || "Edit"}
                          >
                            <EditIcon />
                          </button>
                          <button
                            type="button"
                            className="delete-btn"
                            onClick={() => handleOpenDelete(room)}
                            title={t("Delete") || "Delete"}
                          >
                            <TrashIcon />
                          </button>
                        </div>
                      </div>

                      <div className="room-meta-line">
                        <span className="type-pill">{t(roomType) || roomType}</span>
                        <span className="capacity-info">
                          <UserIcon /> <p>{room?.capacity || "0"}</p>
                        </span>
                      </div>

                      <p className="room-desc">{room?.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="pagination-container" style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '24px', alignItems: 'center' }}>
                <button
                  disabled={page === 1}
                  onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                  style={{
                    background: '#fff',
                    border: '1px solid #295086',
                    color: '#295086',
                    borderRadius: '100px',
                    padding: '6px 16px',
                    fontSize: '13px',
                    cursor: page === 1 ? 'not-allowed' : 'pointer',
                    opacity: page === 1 ? 0.5 : 1
                  }}
                >
                  {t("Prev") || "Prev"}
                </button>
                <span style={{ fontSize: '14px', color: '#295086', fontWeight: 600 }}>
                  {t("Page {{page}} of {{totalPages}}", { page, totalPages })}
                </span>
                <button
                  disabled={page === totalPages}
                  onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                  style={{
                    background: '#fff',
                    border: '1px solid #295086',
                    color: '#295086',
                    borderRadius: '100px',
                    padding: '6px 16px',
                    fontSize: '13px',
                    cursor: page === totalPages ? 'not-allowed' : 'pointer',
                    opacity: page === totalPages ? 0.5 : 1
                  }}
                >
                  {t("Next") || "Next"}
                </button>
              </div>
            )}
          </>
        ) : (
          /* Empty State (1st Image) */
          <div className="empty-state-card-view">
            <div className="empty-state-icon-box">
              <EmptyStateIcon />
            </div>
            <p className="empty-state-text">
              {t("No room details yet.") || "No room details yet."}
            </p>
            <button
              type="button"
              className="empty-state-add-btn"
              onClick={handleOpenAdd}
            >
              + {t("Add Room") || "Add Room"}
            </button>
          </div>
        )}
      </ProfileServicesRoomsWrapper>

      {/* Styled Modals */}
      <StyledRoomModal
        show={showModal}
        onHide={() => !actionLoading && setShowModal(false)}
        centered
        className="sitback-modal-wrapper room-modal-custom"
      >
        <Modal.Body>
          <RoomModalWrapper>
            <button
              type="button"
              className="close-modal-btn"
              disabled={actionLoading}
              onClick={() => setShowModal(false)}
              aria-label={t("close")}
            >
              <CloseModalIcon />
            </button>

            <h3 className="modal-title-text">
              {editTarget ? t("Edit Room") || "Edit Room" : t("Add Room") || "Add Room"}
            </h3>

            <form onSubmit={handleSaveRoom}>
              {formError && <p className="text-danger small text-center mb-3">{formError}</p>}

              {/* Upload Image Section */}
              <div className={`upload-dropzone`}>
                {formImage ? (
                  <div className="preview-container">
                    <img alt="preview" src={formImage.file || formImage} />
                    <button type="button" className="remove-preview-btn" disabled={actionLoading} onClick={removeImage}>
                      &times;
                    </button>
                  </div>
                ) : (
                  <>
                    <input
                      type="file"
                      name="file"
                      disabled={actionLoading}
                      onChange={handleFileChange}
                      accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                    />
                    <div className="upload-content">
                      <UploadIcon />
                      <span>{"Upload Image (optional)"}</span>
                    </div>
                  </>
                )}
              </div>
              {validationErrors.image && (
                <p className="text-danger mt-n2 mb-3">{validationErrors.image}</p>
              )}

              {/* Room Name Input */}
              <div className="form-group-custom">
                <input
                  type="text"
                  placeholder={t("Room Name") || "Room Name"}
                  disabled={actionLoading}
                  value={formRoomName}
                  onChange={(e) => {
                    setFormRoomName(e.target.value);
                    if (validationErrors.roomName) {
                      setValidationErrors((prev) => {
                        const next = { ...prev };
                        delete next.roomName;
                        return next;
                      });
                    }
                  }}
                />
                {validationErrors.roomName && (
                  <p className="text-danger">{validationErrors.roomName}</p>
                )}
              </div>

              {/* Type and Capacity */}
              <div className="form-row-two">
                <div className="form-group-custom">
                  <select
                    value={formRoomType}
                    disabled={actionLoading}
                    onChange={(e) => {
                      setFormRoomType(e.target.value);
                      if (validationErrors.roomType) {
                        setValidationErrors((prev) => {
                          const next = { ...prev };
                          delete next.roomType;
                          return next;
                        });
                      }
                    }}
                  >
                    {spaServiceTypes.map((type) => (
                      <option key={type} value={type}>
                        {t(type) || type}
                      </option>
                    ))}
                  </select>
                  {validationErrors.roomType && (
                    <p className="text-danger">{validationErrors.roomType}</p>
                  )}
                </div>
                <div className="form-group-custom">
                  <input
                    type="text"
                    placeholder={t("Capacity") || "Capacity"}
                    disabled={actionLoading}
                    value={formCapacity}
                    onChange={(e) => {
                      setFormCapacity(e.target.value);
                      if (validationErrors.capacity) {
                        setValidationErrors((prev) => {
                          const next = { ...prev };
                          delete next.capacity;
                          return next;
                        });
                      }
                    }}
                  />
                  {validationErrors.capacity && (
                    <p className="text-danger">{validationErrors.capacity}</p>
                  )}
                </div>
              </div>

              {/* Description Textarea */}
              <div className="form-group-custom">
                <textarea
                  placeholder={t("Description") || "Description"}
                  disabled={actionLoading}
                  value={formDescription}
                  onChange={(e) => {
                    setFormDescription(e.target.value);
                    if (validationErrors.description) {
                      setValidationErrors((prev) => {
                        const next = { ...prev };
                        delete next.description;
                        return next;
                      });
                    }
                  }}
                  className={validationErrors.description ? "error" : ""}
                />
                {validationErrors.description && (
                  <p className="text-danger">{validationErrors.description}</p>
                )}
              </div>

              {/* Room Amenities Input & + Add button */}
              <div className="form-group-custom">
                <div className="amenities-input-row">
                  <input
                    type="text"
                    placeholder={t("Room Amenities") || "Room Amenities"}
                    disabled={actionLoading}
                    value={amenityInput}
                    onChange={(e) => setAmenityInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddAmenity();
                      }
                    }}
                  />
                  <button type="button" className="add-amenity-btn" disabled={actionLoading || !amenityInput.trim()} onClick={handleAddAmenity}>
                    + {t("Add") || "Add"}
                  </button>
                </div>

                {/* Chips horizontal listing */}
                {formAmenities.length > 0 && (
                  <div className="chips-container">
                    {formAmenities.map((amenity, index) => (
                      <span className="amenity-chip" key={index}>
                        {amenity}
                        <button type="button" className="remove-btn" disabled={actionLoading} onClick={() => handleRemoveAmenity(amenity)}>
                          &times;
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Active Toggle Switch */}
              <div className="toggle-switch-container">
                <label className="custom-switch">
                  <input
                    type="checkbox"
                    disabled={actionLoading}
                    checked={formIsActive}
                    onChange={(e) => setFormIsActive(e.target.checked)}
                  />
                  <span className="slider"></span>
                </label>
                <span className="switch-label">{t("Active") || "Active"}</span>
              </div>

              {/* Footer Cancel and Add Room Buttons */}
              <div className="modal-buttons-row">
                <button type="button" className="cancel-btn" disabled={actionLoading} onClick={() => setShowModal(false)}>
                  {t("Cancel") || "Cancel"}
                </button>
                <button type="submit" className="submit-btn" disabled={actionLoading}>
                  {actionLoading ? "Saving..." : (editTarget ? t("Save Room") || "Save Room" : t("Add Room") || "Add Room")}
                </button>
              </div>
            </form>
          </RoomModalWrapper>
        </Modal.Body>
      </StyledRoomModal>

      {/* Delete Confirmation Modal */}
      <DeleteModal
        show={showDeleteModal}
        disabled={actionLoading}
        messageBody={<>{t("Are you sure you want to delete this room? This action cannot be undone.") || "Are you sure you want to delete this room? This action cannot be undone."}</>}
        handleClose={() => {
          setShowDeleteModal(false);
          setDeleteTarget(null);
        }}
        handleConfirmDelete={handleConfirmDelete}
      />
    </div>
  );
};
