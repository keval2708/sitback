"use client";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ReactStars from "react-rating-stars-component";
import InlineSVG from "svg-inline-react";
import ReviewReplyForm from "@/components/shared/form/ReviewReplyForm";
import DeleteModal from "@/components/shared/modal/DeleteModal";
import { useToaster } from "@/hooks";
import { API_ROUTER } from "@/services/apiRouter";
import { ClientReviewsBlock } from "@/styles/pages/profile.style";
import {
  DeleteV2_icon, Down_icon, EditV2_icon, Stat_icon,
  message_icon,
} from "@/styles/svgs";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";
import { getSocketId } from "@/utils/helper";


const Review = () => {
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
        if (msg.action == "new_review_from_user" || msg.action == "new_review_reply_from_spa") {
          getReview();
        }
      });
    }
  }, [window.io]);

  //Apis
  const getReview = async () => {
    try {
      setLoading(true);
      const res = await axiosApiCall.get(API_ROUTER?.GET_REVIEW);
      if (!res?.status) {
        return toaster(res?.data?.message, TOAST_TYPES.ERROR);
      } else {
        const sortedReviews = res.data.data.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
        setDetail(sortedReviews);
        // setDetail(res.data.data);
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setLoading(false);
    }
  };

  const createReview = async (data, e) => {
    const socketId = getSocketId();
    e.preventDefault();
    const params = {
      review_id: data.id,
      message: data?.messageReplay?.trim(),
      socketId: socketId,
    };
    try {
      setLoading(true);
      const res = await axiosApiCall.post(API_ROUTER?.CREATE_REVIEW, params);
      if (!res?.status) {
        return toaster(res?.data?.message, TOAST_TYPES.ERROR);
      } else {
        toaster(res?.data?.message, TOAST_TYPES.SUCCESS);
        getReview();
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setLoading(false);
    }
  };

  const editReview = async (data, e) => {
    e.preventDefault();
    const socketId = getSocketId();
    const params = {
      id: data.id,
      message: data?.messageReplay?.trim(),
      socketId: socketId,
    };
    try {
      setLoading(true);
      const res = await axiosApiCall.post(API_ROUTER?.EDIT_REVIEW, params);
      if (!res?.status) {
        return toaster(res?.data?.message, TOAST_TYPES.ERROR);
      } else {
        toaster(res?.data?.message, TOAST_TYPES.SUCCESS);
        setIsEdit(false)
        getReview();
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setLoading(false);
    }
  };

  const deleteReview = async (data) => {
    const socketId = getSocketId();
    try {
      const dltData = {
        id: data.id,
        socketId: socketId,
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

  const onChangeMessage = (reviewId, message) => {
    let clonedReviews = [...detail];
    clonedReviews = clonedReviews?.map((item) =>
      item.id === reviewId ? { ...item, messageReplay: message } : item
    );
    setDetail(clonedReviews);
  };

  const onEditReplayMessage = (reviewId, msgObj) => {
    let clonedReviews = [...detail];
    clonedReviews = clonedReviews?.map((item) =>
      item.id === reviewId ? { ...item, messageReplay: msgObj?.message } : item
    );
    setDetail(clonedReviews);
    setIsEdit(msgObj?.id)
  }

  const [currentExpandedReview, setCurrentExpandedReview] = useState(null);

  const handleShowReplyForm = (reviewId) => {
    if (currentExpandedReview === reviewId) {
      setCurrentExpandedReview(null);
      return;
    }
    setCurrentExpandedReview(reviewId);
  };

  const handleCloseReplyForm = () => {
    setCurrentExpandedReview(null);
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
      await deleteReview(deleteTarget);
      handleCloseDeleteModal();
    }
  };


  return (
    <>
      <ClientReviewsBlock>
        {loading ? (
          <div className="appointment-submit-main-div">
              <div className="sitback-main-loader-wrapper">
                <div className="spinner-border text-info" role="status">
                </div>
              </div>
          </div>
        ) : detail && detail.length > 0 ? (
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
                <div className="replied-msg-block">
                  <h4>
                    <InlineSVG src={message_icon} className="global_laguage_icon" />
                    <p>{review?.reviewreply && review?.reviewreply?.length > 0 ? `${t('replied')}` : `${t('reply')}`}</p>
                    <InlineSVG
                      src={Down_icon}
                      className={`down-icon ${currentExpandedReview === review.id ? "expanded" : ""}`}
                      onClick={() =>
                        handleShowReplyForm(review.id)
                        // setExpandedReview((prev) => (prev === review.id ? null : review.id))
                      }
                    />
                  </h4>
                  {currentExpandedReview === review.id ? (
                    review?.reviewreply && review?.reviewreply?.length > 0 ? (
                      review?.reviewreply?.map((dt) =>
                        (isEdit && isEdit === dt.id) ? (
                          <ReviewReplyForm
                            key={dt.id}
                            isEdit={true}
                            onChangeMessage={onChangeMessage}
                            onSubmit={(e) => editReview({ ...dt, messageReplay: review?.messageReplay }, e)}
                            data={review}
                            loading={loading}
                            onClose={handleCloseReplyForm}
                          />
                        ) : (
                          <div key={dt.id} className="edit-message-wrapper">
                            <div className="edit-msg-row">
                              <h6>
                                <p>{dt.message}</p>
                                <span>{dt?.updatedAt ? moment(dt?.updatedAt).fromNow() : ""}</span>
                              </h6>
                              <div className="edit-and-delete-icon">
                                <button onClick={() => onEditReplayMessage(review?.id, dt)}>
                                  <InlineSVG
                                    src={EditV2_icon}
                                    className="global_laguage_icon"
                                  />
                                </button>
                                <button onClick={() => handleShowDeleteModal(dt)}>
                                  <InlineSVG src={DeleteV2_icon} className="deletericon" />
                                </button>
                              </div>
                            </div>
                          </div>
                        )
                      )
                    ) : (
                      <ReviewReplyForm
                        isEdit={false}
                        onChangeMessage={onChangeMessage}
                        onSubmit={(e) => createReview(review, e)}
                        data={review}
                        loading={loading}
                        onClose={handleCloseReplyForm}
                      />
                    )
                  ) : null}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-data" style={{ margin: "110px auto 0", textAlign: "center" }}>
            <p>No reviews have been added on the Sitback platform from customers.</p>
          </div>
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

export default Review;
