"use client";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Container, } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import ReactStars from "react-rating-stars-component";
import DeleteModal from "@/components/shared/modal/DeleteModal";
import { useToaster } from "@/hooks";
import { PATH_QUICKBOOKING } from "@/routes/paths";
import { API_ROUTER } from "@/services/apiRouter";
import { Button, } from "@/styles/global/main.style";
import { ClientReviewsBlock } from "@/styles/pages/profile.style";
import { Stat_icon,
} from "@/styles/svgs";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";

const SpaReview = (slug) => {
  // hooks
  const { toaster } = useToaster();
  const { t } = useTranslation();

  // states
  const [detail, setDetail] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  //delete model
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  // useEffect
  useEffect(() => {
    getReview();
  }, []);

  useEffect(() => {
    if (window.io) {
      window.io.socket.on("serviceprovider", async (msg) => {
        if (msg.action == "new_review_from_user") {
          getReview();
        }
      });
    }
  }, [window.io]);

  //Apis
  const getReview = async () => {
    try {

      let param = {
      slug: slug?.slug,
    };
      const res = await axiosApiCall.post(API_ROUTER?.GET_HOME_REVIEW,param);
      if (!res?.status) {
        return toaster(res?.data?.message, TOAST_TYPES.ERROR);
      } else {

        // Merge the arrays
        const mergedReviews = [...res.data.data, ...res.data.googleReviewList];

        // Sort the merged array by createdAt
        const combinedSortedReviews = mergedReviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        // Update the state with the combined sorted array
        setDetail(combinedSortedReviews);

      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  };


  const deleteReview = async (data) => {
    try {
      const dltData = {
        id: data.id,
      };
      const res = await axiosApiCall.post(API_ROUTER?.DELETE_REVIEW, dltData);
      if (!res?.status) {
        return toaster(res?.data?.message, TOAST_TYPES.ERROR);
      } else {
        toaster(res?.data?.message, TOAST_TYPES.SUCCESS);
        getReview();
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setDeleteTarget(null);
  };

  const handleConfirmDelete = async () => {
    if (deleteTarget) {
      await deleteReview(deleteTarget);
      handleCloseDeleteModal();
    }
  };

  const showBookingModel = () => {
    let link = `${window?.location?.origin}${PATH_QUICKBOOKING?.quickbooking}/${slug?.slug}`;
    window.location.href = link;
  }

  console.log("detail",detail);

  return (
    <div className="spa-details-main-content-div">
      <Container fluid>
            {detail && detail.length > 0 ? (
              <ClientReviewsBlock className="sitback-review-updated-div">
                {detail.map((review, key) => (
                  <div className="sitback-review-block" key={key}>
                    <div className="sitback-review-inner-div">
                      <div className="sitback-review-msg-block">
                        <p>{review.message}</p>
                        <span>{review.createdAt ? moment(review.createdAt).fromNow() : ""}</span>
                      </div>
                      <h5>{review.username}</h5>
                      <div className="review-start">
                        <ReactStars
                          isHalf={true}
                          value={review.ratings % 0.5 === 0 ? parseFloat(review.ratings) : Math.round(parseFloat(review.ratings))}
                          count={5}
                          size={15}
                          halfIcon={<i className={Stat_icon}></i>}
                          fullIcon={<i className={Stat_icon}></i>}
                          activeColor="#ffd700"
                          edit={false}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </ClientReviewsBlock>
            ) : (
              <div className="no-data gallery-no-data-div">
                <p>{t('noreview')}</p>
              </div>
            )}

          <div className="spa-detail-mobile-btn-div">
              <Button className="request-btn" onClick={() => { showBookingModel()}}>Request An Appointment</Button>
            </div>
          <DeleteModal
            disabled={loading}
            show={showDeleteModal}
            handleClose={handleCloseDeleteModal}
            handleConfirmDelete={handleConfirmDelete}
          />
      </Container>
    </div>
  );
};

export default SpaReview;
