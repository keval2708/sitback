import { memo, useEffect, useMemo, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useToaster } from "@/hooks";
import { API_ROUTER } from "@/services/apiRouter";
import { AddGalleryModalWrapper, StyledAddGalleryModal } from "@/styles/pages/profile.style";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";

const UploadIcon = () => (
  <svg width="40" height="40" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.6667 21.333V10.4663L11.2 13.933L9.33337 11.9997L16 5.33301L22.6667 11.9997L20.8 13.933L17.3334 10.4663V21.333H14.6667ZM8.00004 26.6663C7.26671 26.6663 6.63915 26.4055 6.11737 25.8837C5.5956 25.3619 5.33426 24.7339 5.33337 23.9997V19.9997H8.00004V23.9997H24V19.9997H26.6667V23.9997C26.6667 24.733 26.4058 25.361 25.884 25.8837C25.3623 26.4063 24.7343 26.6672 24 26.6663H8.00004Z" fill="#007BFF" />
  </svg>

);

const CloseModalIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: '#E32C1F' }}>
    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const WarningIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: '#d97706' }}>
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
    <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const RemoveIcon = () => (
  <svg width="22" height="22" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.00004 14.8305C11.73 14.8305 14.8303 11.7368 14.8303 8.00021C14.8303 4.27021 11.7232 1.16992 7.99319 1.16992C4.2569 1.16992 1.17004 4.27021 1.17004 8.00021C1.17004 11.7368 4.26347 14.8305 8.00004 14.8305ZM8.00033 13.6922C4.83919 13.6922 2.31433 11.1608 2.31433 8.00021C2.31433 4.84592 4.83233 2.30821 7.99319 2.30821C11.1472 2.30821 13.6849 4.84621 13.6918 8.00021C13.6983 11.1611 11.1538 13.6922 7.99976 13.6922M5.70947 10.8396C5.8569 10.8396 5.9909 10.7794 6.09119 10.6722L7.99319 8.76364L9.8949 10.6722C9.99519 10.7725 10.1292 10.8396 10.2835 10.8396C10.5778 10.8396 10.8189 10.5916 10.8189 10.2971C10.8189 10.1431 10.7589 10.0159 10.6583 9.91535L8.75633 8.01364L10.6649 6.09849C10.772 5.98449 10.8258 5.87078 10.8258 5.72335C10.8261 5.65289 10.8125 5.58306 10.7858 5.51789C10.759 5.45273 10.7195 5.39352 10.6697 5.3437C10.6199 5.29388 10.5607 5.25443 10.4955 5.22764C10.4303 5.20086 10.3605 5.18726 10.29 5.18764C10.1492 5.18764 10.0286 5.23449 9.9149 5.34849L7.9929 7.26364L6.07776 5.35507C5.97747 5.24792 5.8569 5.20106 5.70947 5.20106C5.40833 5.20106 5.17376 5.42878 5.17376 5.73021C5.17376 5.87735 5.22747 6.00449 5.33462 6.10507L7.23633 8.01364L5.33462 9.92221C5.22747 10.0159 5.17376 10.1496 5.17376 10.2971C5.17376 10.5916 5.40804 10.8396 5.70947 10.8396Z" fill="#718096" />
  </svg>

);

const AddGalleryModal = ({
  show,
  onHide = () => { },
  onConfirm = () => { },
  categories = [],
  defaultCategory = "",
}) => {
  const [images, setImages] = useState([]); // Array of { id, file, fileObj, title, category }
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [localCategories, setLocalCategories] = useState([]);
  const [dragActive, setDragActive] = useState(false);

  const { toaster } = useToaster();
  const { t } = useTranslation();

  // Calculate total size of selected images in MB
  const totalSizeMB = useMemo(() => {
    const totalBytes = images.reduce((acc, img) => acc + (img.fileObj?.size || 0), 0);
    return (totalBytes / (1024 * 1024)).toFixed(1);
  }, [images]);

  // Check if any selected image does not have a category assigned
  const hasUnassignedCategory = useMemo(() => {
    return images.some(img => !img.category);
  }, [images]);

  useEffect(() => {
    if (categories && categories.length > 0) {
      setLocalCategories(categories);
    } else if (show) {
      // Fetch categories if not passed as prop
      const fetchCategories = async () => {
        try {
          const res = await axiosApiCall.get(API_ROUTER?.GET_GALLERY_CATEGORY);
          if (res?.status) {
            const fetchedCats = res?.data?.data || [];
            const formattedCats = fetchedCats.map(cat => {
              if (typeof cat === "string") {
                return { id: cat, name: cat };
              }
              return {
                id: cat.id || cat.galleryCategoryId,
                name: cat.name || cat.title || cat.categoryName || cat.category
              };
            });
            setLocalCategories(formattedCats);
          }
        } catch (error) {
          console.error("Error fetching categories in modal:", error);
        }
      };
      fetchCategories();
    }
  }, [categories, show]);

  // Reset modal state on show/hide
  useEffect(() => {
    if (show) {
      // Clean up previous URLs to prevent memory leaks
      images.forEach(img => {
        if (img.file) URL.revokeObjectURL(img.file);
      });
      setImages([]);

      const hasDefault = defaultCategory && defaultCategory !== "All";
      const isDefaultInCategories = hasDefault && localCategories.some(c => String(c.id) === String(defaultCategory));

      if (isDefaultInCategories) {
        setCategory(defaultCategory);
      } else {
        const firstCat = localCategories.find(c => c.id !== "All");
        setCategory(firstCat ? firstCat.id : "");
      }
      setErrors({});
    }
  }, [show, localCategories, defaultCategory]);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
    e.target.value = "";
  };

  const handleFiles = (fileList) => {
    const newImages = [];
    const defaultCatId = category || (localCategories.find(c => c.id !== "All")?.id || "");

    Array.from(fileList).forEach(file => {
      // const isValidSize = file.size <= 10 * 1024 * 1024;
      const isValidType = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"].includes(file.type);

      if (!isValidType) {
        toaster(t("fileTypeError", "Unsupported file type. Please upload JPEG, PNG, GIF, or WEBP"), TOAST_TYPES.ERROR);
        return;
      }

      // if (!isValidSize) {
      //   toaster(t("fileSizeError", "File size exceeds 10MB limit"), TOAST_TYPES.ERROR);
      //   return;
      // }

      newImages.push({
        id: Date.now() + Math.random(),
        file: URL.createObjectURL(file),
        fileObj: file,
        title: "",
        category: defaultCatId
      });
    });

    if (newImages.length > 0) {
      setImages(prev => [...prev, ...newImages]);
      setErrors(prev => {
        const next = { ...prev };
        delete next.images;
        return next;
      });
    }
  };

  const removeSelectedImage = (id) => {
    setImages(prev => {
      const target = prev.find(img => img.id === id);
      if (target?.file) {
        URL.revokeObjectURL(target.file);
      }
      return prev.filter(img => img.id !== id);
    });
    setErrors(prev => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const clearAllImages = () => {
    images.forEach(img => {
      if (img.file) {
        URL.revokeObjectURL(img.file);
      }
    });
    setImages([]);
    setErrors({});
  };

  const updateImageField = (id, field, value) => {
    setImages(prev => prev.map(img => img.id === id ? { ...img, [field]: value } : img));
    if (field === "title" && value.trim()) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    }
  };

  const cancel = () => {
    clearAllImages();
    onHide();
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (images.length === 0) {
      setErrors({ images: t("pleaseSelectImages", "Please select at least one image to upload") });
      return;
    }

    // Validation: Image Title is required for all images
    const newErrors = {};
    let hasValidationErrors = false;


    images.forEach(img => {
      if (!img.title.trim()) {
        newErrors[img.id] = t("titleRequired", "Image Title is required");
        hasValidationErrors = true;
      }
    });

    if (hasValidationErrors) {
      setErrors(newErrors);
      toaster(t("resolveErrors", "Please assign a title to all images before uploading"), TOAST_TYPES.ERROR);
      return;
    }

    setLoading(true);
    let successCount = 0;
    // console.log("images", images);
    // return


    try {
      for (const img of images) {
        const formData = new FormData();
        const finalCategory = img.category || category || "Other";
        const finalTitle = img.title.trim();

        formData.append("title", finalTitle);
        formData.append("galleryCategoryId", finalCategory);
        formData.append("image", img.fileObj);

        // Save pending metadata locally before submitting so Gallery component can assign it
        localStorage.setItem("pending_gallery_upload_meta", JSON.stringify({
          title: finalTitle,
          category: localCategories.find(c => String(c.id) === String(finalCategory))?.name || finalCategory
        }));

        const res = await axiosApiCall.post(API_ROUTER?.CREATE_SERVICE_GALLERY, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
        });

        if (res?.status) {
          successCount++;
        }
      }

      if (successCount === images.length) {
        toaster(t("allUploaded", "All images uploaded successfully"), TOAST_TYPES.SUCCESS);
        onConfirm();
      } else if (successCount > 0) {
        toaster(t("partialUploaded", `Successfully uploaded ${successCount} of ${images.length} images`), TOAST_TYPES.ERROR);
        onConfirm();
      } else {
        toaster(t("uploadFailed", "Failed to upload images"), TOAST_TYPES.ERROR);
      }
    } catch (error) {
      localStorage.removeItem("pending_gallery_upload_meta");
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledAddGalleryModal
      show={show}
      onHide={cancel}
      aria-labelledby="example-modal-sizes-title-sm"
      centered
      className="sitback-modal-wrapper add-gallery-modal-custom"
    >
      <Modal.Body>
        <AddGalleryModalWrapper>
          <button type="button" className="close-modal-btn" onClick={cancel} aria-label={t("close")}>
            <CloseModalIcon />
          </button>

          <h3 className="modal-title-text">{t("Upload Gallery Images")}</h3>
          <p className="modal-subtitle-text">{t("Add multiple images at once. Assign a category to each for easy filtering.")}</p>

          <Form onSubmit={onSubmit}>
            <div
              className={`upload-dropzone ${dragActive ? 'drag-active' : ''}`}
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                name="file"
                multiple
                onChange={handleFileChange}
                accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
              />
              <div className="upload-content">
                <UploadIcon />
                <span>
                  {t("Drag & drop images here or ")}
                  <span style={{ textDecoration: 'underline', color: '#295086', fontWeight: 'bold' }}>{t("browse files")}</span>
                  {t(" from your device")}
                </span>
                {/* <span style={{ fontSize: '12px', color: '#7a8c9e', fontWeight: 'normal', marginTop: '2px' }}>
                  {t("JPG, PNG, WEBP • Max 10MB each")}
                </span> */}
              </div>
            </div>

            {errors.images && (
              <div className="text-danger small mb-3 px-3">
                {errors.images}
              </div>
            )}

            {images.length > 0 && (
              <>
                <div className="selected-images-header">
                  <span className="selected-count">
                    {/* {images.length} {images.length === 1 ? t("image selected") : t("images selected")} ({totalSizeMB} MB) */}
                  </span>
                  <button type="button" className="clear-all-btn" onClick={clearAllImages}>
                    <svg width="14" height="14" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '6px' }}>
                      <path d="M6 6L3 3M6 6L9 9M6 6L9 3M6 6L3 9" stroke="#718096" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>

                    {t("Clear all")}
                  </button>
                </div>

                <div className="selected-images-list">
                  {images.map((img) => (
                    <div key={img.id} className="selected-image-row">
                      <div className="thumbnail-wrapper">
                        <img src={img.file} alt="preview" />
                      </div>
                      <div className="image-info-fields">
                        <div className="input-field-container">
                          <input
                            type="text"
                            placeholder={t("Image Title")}
                            value={img.title}
                            onChange={(e) => updateImageField(img.id, 'title', e.target.value)}
                          // className={errors[img.id] ? "error-input" : ""}
                          />
                          {errors[img.id] && (
                            <span className="error-text">{errors[img.id]}</span>
                          )}
                        </div>
                        <div className="input-field-container">
                          <select
                            value={img.category}
                            onChange={(e) => updateImageField(img.id, 'category', e.target.value)}
                          >
                            <option value="" disabled>{t("Select Category")}</option>
                            {localCategories
                              ?.filter((cat) => cat.id !== "All")
                              ?.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                  {t(cat.name)}
                                </option>
                              ))}
                          </select>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="remove-image-btn"
                        onClick={() => removeSelectedImage(img.id)}
                        aria-label="Remove image"
                      >
                        <RemoveIcon />
                      </button>
                    </div>
                  ))}
                </div>

                {hasUnassignedCategory && (
                  <div className="warning-banner">
                    <WarningIcon />
                    <span>{t("Some images don't have a category assigned. They'll default to 'Other'.")}</span>
                  </div>
                )}
              </>
            )}

            <div className="modal-buttons-row add-gallery-modal">
              <button
                type="button"
                className="cancel-btn"
                onClick={cancel}
                disabled={loading}
              >
                {t("Cancel")}
              </button>
              <button
                type="submit"
                className="submit-btn"
                disabled={loading || images.length === 0}
              >
                {loading
                  ? t("Uploading...")
                  : images.length > 0
                    ? `${t("Upload")} ${images.length} ${images.length === 1 ? t("Image") : t("Images")}`
                    : t("Upload Images")}
              </button>
            </div>
          </Form>
        </AddGalleryModalWrapper>
      </Modal.Body>
    </StyledAddGalleryModal>
  );
};

export default memo(AddGalleryModal);
