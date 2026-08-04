"use client";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ReactStars from "react-rating-stars-component";
import DeleteModal from "@/components/shared/modal/DeleteModal";
import { useToaster } from "@/hooks";
import { API_ROUTER } from "@/services/apiRouter";
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

        // Sort the merged array by updatedAt
        const combinedSortedReviews = mergedReviews.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

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
  return (
    <>
      <ClientReviewsBlock>

        {detail && detail.length > 0 ? (
          detail?.map((review, key) => (
            <div className="sitback-review-block" key={key}>
              <h5>{review.username}</h5>
              <div className="review-start">
                <ReactStars
                  isHalf={true}
                  value={review.ratings % 0.5 == 0 ? parseFloat(review.ratings) : Math.round(parseFloat(review.ratings))}
                  count={5}
                  size={15}
                  halfIcon={<i className={Stat_icon}></i>}
                  fullIcon={<i className={Stat_icon}></i>}
                  activeColor="#ffd700"
                  edit={false}
                />
              </div>
              <div className="sitback-review-msg-block">
                <p>{review.message}</p>
                <span>{review.updatedAt ? moment(review.updatedAt).fromNow() : ""}</span>
              </div>
              <div>

              </div>
            </div>
          ))
        ) : (
         <></>
        )}

      </ClientReviewsBlock>
      <DeleteModal
        disabled={loading}
        show={showDeleteModal}
        handleClose={handleCloseDeleteModal}
        handleConfirmDelete={handleConfirmDelete}
      />
    </>
  );
};

export default SpaReview;
