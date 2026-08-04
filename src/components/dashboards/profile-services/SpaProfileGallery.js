import { useEffect, useState } from "react";
import { Container, } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import AddGalleryModal from "../models/AddGalleryModal";
import ReactImageVideoLightbox from "@/components/reactImageLightbox";
import { useToaster } from "@/hooks";
import { PATH_QUICKBOOKING } from "@/routes/paths";
import { API_ROUTER } from "@/services/apiRouter";
import { Button, } from "@/styles/global/main.style";
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
        //return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        setGalleryData(res?.data?.data?.map(item => ({ ...item, type: "photo" })));

      }
    } catch (error) {
      //toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
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

  const showBookingModel = () => {
    let link = `${window?.location?.origin}${PATH_QUICKBOOKING?.quickbooking}/${slug?.slug}`;
    window.location.href = link;
  }

  return (
    <div className="spa-details-main-content-div">
      <Container fluid>
        <GalleryImageBoxWrapper className="gallery-image-updated-div">

          <div className="grid-row-div">
            {galleryData && galleryData.length > 0 ? (
              galleryData
                .reduce((rows, _, index) => {
                  if (index % 5 === 0) {
                    rows.push(galleryData.slice(index, index + 5));
                  }
                  return rows;
                }, [])
                .map((group, groupIndex) => (
                  <>
                    <div className="grid-inner-row-div">
                      {/* Big Image */}
                      <div
                        className="gallery-big-image-div"
                        onClick={() => {
                          setIsOpen(true);
                          setStartIndex(groupIndex * 5);
                        }}
                      >
                        <div className="gallery-img">
                          <img alt="big" src={group[0]?.image} />
                        </div>
                      </div>

                      {/* Small Images */}
                      <div className="small-images-wrapper">
                        {group.slice(1).map((img, imgIndex) => (
                          <div
                            key={imgIndex}
                            className="gallery-small-image-div"
                            onClick={() => {
                              setIsOpen(true);
                              setStartIndex(groupIndex * 5 + imgIndex + 1);
                            }}
                          >
                            <div className="gallery-img">
                              <img alt={`small-${imgIndex}`} src={img?.image} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                </>
                ))
            ) : (
              <div className="no-data gallery-no-data-div">
                <p>{t("noGalleryImg")}</p>
              </div>
            )}
          </div>

          <div className="spa-detail-mobile-btn-div">
            <Button className="request-btn" onClick={() => { showBookingModel()}}>Request An Appointment</Button>
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
      </Container>
    </div>

  );
};
