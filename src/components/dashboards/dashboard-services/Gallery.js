import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import InlineSVG from "svg-inline-react";
import AddGalleryModal from "../models/AddGalleryModal";
import DeleteModal from "@/components/shared/modal/DeleteModal";
import { useToaster } from "@/hooks";
import { API_ROUTER } from "@/services/apiRouter";
import { GalleryImageBoxWrapper } from "@/styles/pages/profile.style";
import { addmore_icon, delete_icon } from "@/styles/svgs";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";
import { getSocketId } from "@/utils/helper";

export const Gallery = () => {

  // state
  const [lgShow, setLgShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingGallery, setLoadingGallery] = useState(false);
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
  }, []);

  // methods
  const getGalleryImages = async () => {
    try {
      setLoadingGallery(true);
      const res = await axiosApiCall.get(API_ROUTER?.GET_GALLERY);
      if (!res?.status) {
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        setGalleryData(res?.data?.data)
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setLoadingGallery(false);
    }
  };

  const deleteImg = async (params) => {
    try {
      setLoading(true);
      const socketId = getSocketId();
      const param = {
        imageid: params.id,
        socketId: socketId,
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

  useEffect(() => {
      if (window.io) {
        window.io.socket.on("serviceprovider", async (msg) => {
          if(msg?.action == "serviceGalleryListUpdate") {
            getGalleryImages();
          }
        });
      }
    }, [window.io]);

  return (
    <>
      <GalleryImageBoxWrapper>
        {loadingGallery ? (
        <div className="appointment-submit-main-div">
            <div className="sitback-main-loader-wrapper">
              <div className="spinner-border text-info" role="status">
              </div>
            </div>
        </div>
        ) : (
          <div className="grid-row-div">
            {galleryData &&
              galleryData.length > 0 ?
              (galleryData?.map((gallery, key) => (
                <div key={key} className="grid-col-wrapper">
                  <div className="gallery-image-box-div">
                    <span className="delete-icon-box" onClick={() => handleShowDeleteModal(gallery)}>
                      <InlineSVG
                        src={delete_icon}
                        className="global_laguage_icon"
                      />
                    </span>
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
        )}
        <span className="add-icon-wrapper" onClick={() => setLgShow(true)}>
          <InlineSVG src={addmore_icon} className="global_laguage_icon" />
        </span>
      </GalleryImageBoxWrapper>
      <DeleteModal
        disabled={loading}
        show={showDeleteModal}
        messageBody={
          <>
            {t('deletemessage1')}
          </>
        }
        handleClose={handleCloseDeleteModal}
        handleConfirmDelete={handleConfirmDelete}
      />
      {/* Add gallery model */}
      <AddGalleryModal
        show={lgShow}
        onHide={() => setLgShow(false)}
        onConfirm={() => {
          setLgShow(false);
          getGalleryImages();
        }}
      />
    </>

  );
};
