import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import AddGalleryModal from "../models/AddGalleryModal";
import ReactImageVideoLightbox from "@/components/reactImageLightbox";
import { useToaster } from "@/hooks";
import { API_ROUTER } from "@/services/apiRouter";
import { GalleryImageBoxWrapper } from "@/styles/pages/profile.style";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";


export const SpaProfileGallery = (slug) => {

  // state
  const [lgShow, setLgShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [galleryData, setGalleryData] = useState([]);

  //delete model
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  //hooks
  const { toaster } = useToaster();
  const { t } = useTranslation();

  // useEffect
  useEffect(() => {
    getGalleryImages()
  }, [lgShow]);

  // methods
  const getGalleryImages = async () => {
    let param = {
      slug: slug?.slug,
    };
    try {
      const res = await axiosApiCall.post(API_ROUTER?.GET_HOME_GALLERY,param);
      if (!res?.status) {
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        setGalleryData(res?.data?.data?.map(item => ({ ...item, type: "photo" })));

      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  };

  const deleteImg = async (params) => {
    try {
      setLoading(true);
      const param = {
        imageid: params.id
      }
      const res = await axiosApiCall.post(API_ROUTER?.DELETE_GALLERY_IMAGE, param);
      if (!res?.status) {
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        toaster(res?.data?.message, TOAST_TYPES.SUCCESS);
        getGalleryImages();
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setLoading(false);
    }
  }

  //delete modal
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

  return (
    <>
      <GalleryImageBoxWrapper>
        <div className="grid-row-div">
          {galleryData &&
            galleryData.length > 0 ?
            (galleryData?.map((gallery, key) => (
              <div key={key} className="grid-col-wrapper" onClick={() => {
                    setIsOpen(true);
                    setStartIndex(key);
                }}>
                <div className="gallery-image-box-div">
                  <div className="gallery-img">
                    <img alt="sitback" src={gallery?.image} />
                  </div>
                </div>
              </div>
            ))
            ) : (
              <div className="no-data" style={{ margin: "15% auto 0" }}>
                <p>{t('noGalleryImg')}</p>
              </div>
            )
          }
        </div>
      </GalleryImageBoxWrapper>

      {/* Add gallery model */}
      <AddGalleryModal
        show={lgShow}
        onHide={() => setLgShow(false)}
        onConfirm={() => setLgShow(false)}
      />
       {isOpen ? (
        <ReactImageVideoLightbox
          className="zindex-block-slider"
          data={galleryData}
          startIndex={startIndex}
          showResourceCount={true}
          showThumbnails={true}
          enableAutoPlay={true}
          imageWidth="70%"
          imageHeight="70%"
          videoWidth="70%"
          videoHeight="90%"
          onCloseCallback={() => setIsOpen(false)}
          onNavigationCallback={(currentIndex) =>
            console.log(`Current index: ${currentIndex}`)
          }
        />
      ) : null}

    </>

  );
};
