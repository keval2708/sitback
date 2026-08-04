import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useTranslation } from "react-i18next";
import AddGalleryModal from "../models/AddGalleryModal";
import DeleteModal from "@/components/shared/modal/DeleteModal";
import { useToaster } from "@/hooks";
import { API_ROUTER } from "@/services/apiRouter";
import { ProfileServicesGalleryWrapper } from "@/styles/pages/profile.style";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";
import { getSocketId } from "@/utils/helper";

const PhotoPlaceholderIcon = () => (
  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: '#9AAEBF' }}>
    <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" stroke="currentColor" strokeWidth="1.5" />
    <path d="M21 15L16 10L5 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const TrashIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: '#fff' }}>
    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" fill="currentColor" />
  </svg>
);

export const Gallery = () => {
  const [lgShow, setLgShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingGallery, setLoadingGallery] = useState(false);
  const [galleryData, setGalleryData] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [categories, setCategories] = useState([{ id: "All", name: "All" }]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const { toaster } = useToaster();
  const { t } = useTranslation();

  const getCategories = async () => {
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
        setCategories([{ id: "All", name: "All" }, ...formattedCats]);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const getGalleryImages = async () => {
    try {
      setLoadingGallery(true);
      const categoryParam = activeCategory === "All" ? 'all' : activeCategory;
      const res = await axiosApiCall.get(`${API_ROUTER?.GET_GALLERY}?galleryCategoryId=${categoryParam}`);

      if (!res?.status) {
        return toaster(res?.message, TOAST_TYPES.ERROR);
      }

      const apiImages = res?.data?.data || [];

      // Simply map the API data directly - no localStorage needed
      const images = apiImages.map((img, idx) => ({
        ...img,
        title: img.title || `Gallery Image ${idx + 1}`,
        category: img.category || img.galleryCategoryId // Use what API returns
      }));

      setGalleryData(images);

    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setLoadingGallery(false);
    }
  };

  useEffect(() => {
    getGalleryImages();
  }, [activeCategory]);

  // Socket listener for real-time updates
  useEffect(() => {
    if (typeof window !== "undefined" && window.io) {
      const socketHandler = async (msg) => {
        if (msg?.action === "serviceGalleryListUpdate") {
          getGalleryImages();
        }
      };
      window.io.socket.on("serviceprovider", socketHandler);
      return () => {
        window.io.socket.off("serviceprovider", socketHandler);
      };
    }
  }, []); // Remove galleryData dependency

  const deleteImg = async (params) => {
    try {
      setLoading(true);
      const socketId = getSocketId();
      const param = {
        imageid: params.id,
        socketId: socketId
      };
      const res = await axiosApiCall.post(API_ROUTER?.DELETE_GALLERY_IMAGE, param);

      if (!res?.status) {
        return toaster(res?.message, TOAST_TYPES.ERROR);
      }

      toaster(res?.data?.message, TOAST_TYPES.SUCCESS);
      getGalleryImages(); // Refresh the list

    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setLoading(false);
    }
  };

  const handleShowDeleteModal = (target) => {
    setDeleteTarget(target);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setDeleteTarget(null);
  };

  const handleConfirmDelete = async () => {
    if (deleteTarget) {
      await deleteImg(deleteTarget);
      handleCloseDeleteModal();
    }
  };

  // No filtering needed if backend already filters by category
  const filteredGallery = galleryData;

  return (
    <div className="profile-subtab-panel">
      <ProfileServicesGalleryWrapper>
        <div className="hours-header-flex">
          <h3>{t("Gallery")}</h3>
          {!loadingGallery && galleryData.length > 0 && (
            <button
              type="button"
              className="add-image-btn-top"
              onClick={() => setLgShow(true)}
            >
              + {t("Add Image")}
            </button>
          )}
        </div>

        <div className="categories-row">
          <div className="tabs-container">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`tab-btn ${activeCategory === cat.id ? "active" : ""}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {t(cat?.name)}
              </button>
            ))}
          </div>
        </div>

        {loadingGallery ? (
          <div className="image-grid" style={{ cursor: 'default', pointerEvents: 'none' }}>
            {[1, 2, 3, 4].map((item) => (
              <div className="image-card" key={item} style={{ background: '#f5f7fa', overflow: 'hidden' }}>
                <Skeleton width="100%" height={200} />
              </div>
            ))}
          </div>
        ) : filteredGallery.length > 0 ? (
          <div className="image-grid">
            {filteredGallery.map((gallery, key) => (
              <div className="image-card" key={gallery.id || key}>
                <img alt={gallery.title} src={gallery.image} />
                <div className="overlay">
                  <span className="tag-pill">{t(gallery?.title)}</span>
                  <span
                    className="delete-btn"
                    onClick={() => handleShowDeleteModal(gallery)}
                    title={t("Delete Image")}
                  >
                    <TrashIcon />
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state-container">
            <div className="empty-icon">
              <PhotoPlaceholderIcon />
            </div>
            <p className="empty-title">
              {activeCategory === "All"
                ? t("No gallery images yet.")
                : `${t("No")} ${t(categories.find(c => c.id === activeCategory)?.name || activeCategory)} ${t("gallery images yet.")}`}
            </p>
            <button
              type="button"
              className="empty-add-btn"
              onClick={() => setLgShow(true)}
            >
              + {t("Add Image")}
            </button>
          </div>
        )}
      </ProfileServicesGalleryWrapper>

      <DeleteModal
        disabled={loading}
        show={showDeleteModal}
        messageBody={<>{t("deletemessage1")}</>}
        handleClose={handleCloseDeleteModal}
        handleConfirmDelete={handleConfirmDelete}
      />

      <AddGalleryModal
        show={lgShow}
        onHide={() => setLgShow(false)}
        onConfirm={() => {
          setLgShow(false);
          getGalleryImages();
        }}
        categories={categories}
        defaultCategory={activeCategory}
      />
    </div>
  );
};
