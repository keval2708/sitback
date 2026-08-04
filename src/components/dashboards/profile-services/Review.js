"use client";

import moment from "moment";
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import StarRatings from "react-star-ratings";
import styled from "styled-components";
import DeleteModal from "@/components/shared/modal/DeleteModal";
import { useToaster } from "@/hooks";
import { API_ROUTER } from "@/services/apiRouter";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";

// SVGs / Icons
const CloseModalIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: "#E32C1F" }}>
    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const MessageIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const EyeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const getInitials = (name = "") => {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return parts[0]?.substring(0, 2).toUpperCase() || "";
};

const Review = () => {
  // hooks
  const { toaster } = useToaster();
  const { t } = useTranslation();

  // states
  const [detail, setDetail] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  // delete reply modal states
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  // respond review modal states
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [activeReview, setActiveReview] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [replyId, setReplyId] = useState(null);

  // useEffect
  useEffect(() => {
    getReview();
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && window.io) {
      window.io.socket.on("serviceprovider", async (msg) => {
        if (msg.action === "new_review_from_user") {
          getReview();
        }
      });
    }
  }, []);

  // APIs
  const getReview = async () => {
    try {
      setLoading(true);
      const res = await axiosApiCall.get(API_ROUTER?.GET_REVIEW);
      if (!res?.status) {
        return toaster(res?.data?.message, TOAST_TYPES.ERROR);
      } else {
        const sortedReviews = res.data.data.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
        setDetail(sortedReviews);
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setLoading(false);
    }
  };

  const createReview = async (data, e) => {
    if (e && e.preventDefault) e.preventDefault();
    const params = {
      review_id: data.id,
      message: data?.messageReplay?.trim(),
    };
    try {
      setActionLoading(true);
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
      setActionLoading(false);
    }
  };

  const editReview = async (data, e) => {
    if (e && e.preventDefault) e.preventDefault();
    const params = {
      id: data.id,
      message: data?.messageReplay?.trim(),
    };
    try {
      setActionLoading(true);
      const res = await axiosApiCall.post(API_ROUTER?.EDIT_REVIEW, params);
      if (!res?.status) {
        return toaster(res?.data?.message, TOAST_TYPES.ERROR);
      } else {
        toaster(res?.data?.message, TOAST_TYPES.SUCCESS);
        getReview();
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setActionLoading(false);
    }
  };

  const deleteReview = async (data) => {
    try {
      setActionLoading(true);
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
    } finally {
      setActionLoading(false);
    }
  };

  // Reply handlers
  const handleOpenResponseModal = (review) => {
    setActiveReview(review);
    const hasReply = review?.reviewreply && review.reviewreply.length > 0;
    if (hasReply) {
      const existingReply = review.reviewreply[0];
      setReplyText(existingReply.message || "");
      setIsEditing(true);
      setReplyId(existingReply.id);
    } else {
      setReplyText("");
      setIsEditing(false);
      setReplyId(null);
    }
    setShowResponseModal(true);
  };

  const handleCloseResponseModal = () => {
    setShowResponseModal(false);
    setActiveReview(null);
    setReplyText("");
    setIsEditing(false);
    setReplyId(null);
  };

  const handleSaveResponse = async (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    if (isEditing) {
      await editReview({ id: replyId, messageReplay: replyText }, e);
    } else {
      await createReview({ id: activeReview.id, messageReplay: replyText }, e);
    }
    handleCloseResponseModal();
  };

  // Delete handlers
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

  const handleDeleteResponse = () => {
    if (replyId) {
      handleShowDeleteModal({ id: replyId });
      setShowResponseModal(false);
    }
  };

  // Dynamic calculations for Overview block
  const totalReviews = detail.length;
  const averageRating = totalReviews > 0
    ? (detail.reduce((sum, r) => sum + parseFloat(r.ratings || 0), 0) / totalReviews).toFixed(1)
    : "0.0";

  const starCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  detail.forEach((r) => {
    const rounded = Math.round(parseFloat(r.ratings || 0));
    if (rounded >= 1 && rounded <= 5) {
      starCounts[rounded]++;
    }
  });

  const getPercentage = (count) => {
    if (totalReviews === 0) return 0;
    return Math.round((count / totalReviews) * 100);
  };

  return (
    <>
      <ReviewPageWrapper>
        <h3 className="reviews-title">{t("Reviews")}</h3>

        {/* Overview Block */}
        <SummaryCard>
          <RatingOverview>
            <div className="avg-rating">{averageRating}</div>
            <div className="stars-row">
              <StarRatings
                rating={parseFloat(averageRating) || 0}
                starRatedColor="#ffb811"
                numberOfStars={5}
                name="rating-avg"
                starDimension="20px"
                starSpacing="3px"
              />
            </div>
            <div className="reviews-count-text">
              Based on {totalReviews} verified {totalReviews === 1 ? "review" : "reviews"}
            </div>
          </RatingOverview>
          <RatingBreakdown>
            {[5, 4, 3, 2, 1].map((star) => {
              const count = starCounts[star];
              const pct = getPercentage(count);
              return (
                <div className="breakdown-row" key={star}>
                  <span className="star-label">{star} star</span>
                  <div className="progress-bar-track">
                    <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="percentage-label">{pct}%</span>
                </div>
              );
            })}
          </RatingBreakdown>
        </SummaryCard>

        {loading ? (
          <div className="reviews-list-container" style={{ cursor: 'default', pointerEvents: 'none' }}>
            {[1, 2].map((item) => (
              <ReviewCard key={item}>
                <div className="card-header-row" style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Skeleton width={150} height={20} borderRadius={20} />
                  <Skeleton width={40} height={20} />
                </div>
                <div className="profile-row" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Skeleton circle width={44} height={44} />
                  <div style={{ flex: 1 }}>
                    <Skeleton width={100} height={16} style={{ marginBottom: '4px' }} />
                    <Skeleton width={80} height={12} />
                  </div>
                </div>
                <Skeleton count={2} height={14} />
              </ReviewCard>
            ))}
          </div>
        ) : detail && detail.length > 0 ? (
          <div className="reviews-list-container">
            {detail.map((review, key) => {
              const serviceName = review.service_name || review.serviceName || review.service?.name || "DEEP TISSUE MASSAGE";
              const initials = getInitials(review.username);
              const formattedDate = review.createdAt || review.updatedAt
                ? moment(review.createdAt || review.updatedAt).format("MMM D, YYYY")
                : "";

              return (
                <ReviewCard key={key}>
                  <div className="card-header-row">
                    <span className="service-pill">{serviceName}</span>
                    <div className="action-icons">
                      <button
                        type="button"
                        onClick={() => handleOpenResponseModal(review)}
                        title={review.reviewreply && review.reviewreply.length > 0 ? "Edit Response" : "Respond to Review"}
                      >
                        <MessageIcon />
                      </button>
                      <button type="button" title="View details">
                        <EyeIcon />
                      </button>
                    </div>
                  </div>

                  <div className="profile-row">
                    <div className="avatar-circle">{initials}</div>
                    <div className="profile-info">
                      <div className="name-date">
                        <span className="username">{review.username}</span>
                        {formattedDate && <span className="date-str">{formattedDate}</span>}
                      </div>
                      <StarRatings
                        rating={parseFloat(review.ratings) || 0}
                        starRatedColor="#ffb811"
                        numberOfStars={5}
                        name={`rating-${review.id || key}`}
                        starDimension="14px"
                        starSpacing="2px"
                      />
                    </div>
                  </div>

                  <p className="review-text">{review.message}</p>

                  {review.reviewreply && review.reviewreply.length > 0 && (
                    <div className="spa-response-block">
                      <span className="response-label">SPA RESPONSE</span>
                      <p className="response-text">{review.reviewreply[0].message}</p>
                    </div>
                  )}
                </ReviewCard>
              );
            })}
          </div>
        ) : (
          <div className="no-data text-center py-5">
            <p className="text-muted">{t("noreview")}</p>
          </div>
        )}
      </ReviewPageWrapper>

      {/* Respond to Review Modal */}
      <Modal
        show={showResponseModal}
        onHide={handleCloseResponseModal}
        centered
        className="sitback-modal-wrapper"
      >
        <Modal.Header className="border-0 pb-0 justify-content-end">
          <button
            type="button"
            className="btn-close-custom"
            onClick={handleCloseResponseModal}
            style={{
              background: "none",
              border: "none",
              padding: "8px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CloseModalIcon />
          </button>
        </Modal.Header>
        <Modal.Body className="pt-0">
          <ModalContentWrapper>
            <h3 className="modal-title-text">{t("Respond To Review")}</h3>

            {activeReview && (
              <div className="review-quote-box">
                &quot;{activeReview.message}&quot;
                <span className="author">— {activeReview.username}</span>
              </div>
            )}

            <form onSubmit={handleSaveResponse}>
              <textarea
                placeholder="Write your response here..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                maxLength={1000}
                required
              />

              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={handleCloseResponseModal}
                  disabled={actionLoading}
                >
                  {t("Cancel")}
                </button>

                {isEditing && (
                  <button
                    type="button"
                    className="delete-btn"
                    onClick={handleDeleteResponse}
                    disabled={actionLoading}
                  >
                    {t("Delete")}
                  </button>
                )}

                <button
                  type="submit"
                  className="save-btn"
                  disabled={actionLoading || !replyText.trim()}
                >
                  {actionLoading ? t("Saving...") : t("Save Response")}
                </button>
              </div>
            </form>
          </ModalContentWrapper>
        </Modal.Body>
      </Modal>

      {/* Reply Delete Confirmation Modal */}
      <DeleteModal
        disabled={actionLoading}
        show={showDeleteModal}
        handleClose={handleCloseDeleteModal}
        handleConfirmDelete={handleConfirmDelete}
      />
    </>
  );
};

// Styled Components
const ReviewPageWrapper = styled.div`
  width: 100%;
  font-family: "Outfit", "Inter", sans-serif;
  color: #295086;

  .reviews-title {
    font-size: 20px;
    font-weight: 700;
    color: #295086;
    margin-bottom: 20px;
  }
`;

const SummaryCard = styled.div`
  background: #f2f7ff;
  border: 1px solid #cce0ff;
  border-radius: 12px;
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 40px;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
    align-items: stretch;
  }
`;

const RatingOverview = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 180px;
  text-align: center;
  border-right: 1px solid #cce0ff;
  padding-right: 40px;

  @media (max-width: 768px) {
    border-right: none;
    padding-right: 0;
    border-bottom: 1px solid #cce0ff;
    padding-bottom: 20px;
  }

  .avg-rating {
    font-size: 64px;
    font-weight: 700;
    color: #295086;
    line-height: 1;
    margin-bottom: 8px;
  }

  .stars-row {
    margin-bottom: 8px;
    display: flex;
    justify-content: center;
  }

  .reviews-count-text {
    font-size: 11px;
    font-weight: 500;
    color: #4d6b93;
  }
`;

const RatingBreakdown = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;

  .breakdown-row {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 12px;
    color: #4d6b93;
    font-weight: 500;
  }

  .star-label {
    min-width: 45px;
    text-align: right;
  }

  .progress-bar-track {
    flex: 1;
    height: 6px;
    background: #eaebec;
    border-radius: 3px;
    overflow: hidden;
    position: relative;
  }

  .progress-bar-fill {
    height: 100%;
    background: #295086;
    border-radius: 3px;
    transition: width 0.3s ease;
  }

  .percentage-label {
    min-width: 35px;
    text-align: left;
  }
`;

const ReviewCard = styled.div`
  background: #fff;
  border: 1px solid #eaebec;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 20px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.02);
  display: flex;
  flex-direction: column;
  gap: 16px;

  .card-header-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .service-pill {
    background: #f1f4f7;
    color: #4d6b93;
    font-size: 10px;
    font-weight: 700;
    padding: 6px 12px;
    border-radius: 20px;
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }

  .action-icons {
    display: flex;
    align-items: center;
    gap: 12px;
    color: #758eab;

    button {
      background: none;
      border: none;
      padding: 4px;
      color: #758eab;
      cursor: pointer;
      transition: color 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover {
        color: #295086;
      }
    }
  }

  .profile-row {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .avatar-circle {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: #295086;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 14px;
    letter-spacing: 0.5px;
  }

  .profile-info {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  .name-date {
    display: flex;
    align-items: center;
    gap: 8px;

    .username {
      font-size: 14px;
      font-weight: 700;
      color: #295086;
    }

    .date-str {
      font-size: 11px;
      color: #898a8d;
      font-weight: 500;
    }
  }

  .review-text {
    font-size: 14px;
    color: #4d6b93;
    line-height: 1.6;
    font-weight: 400;
    margin: 0;
  }

  .spa-response-block {
    border-left: 3px solid #295086;
    padding-left: 16px;
    margin-top: 4px;
    display: flex;
    flex-direction: column;
    gap: 4px;

    .response-label {
      font-size: 11px;
      font-weight: 700;
      color: #295086;
      letter-spacing: 0.5px;
      text-transform: uppercase;
    }

    .response-text {
      font-size: 14px;
      color: #4d6b93;
      line-height: 1.6;
      margin: 0;
    }
  }
`;

const ModalContentWrapper = styled.div`
  font-family: "Outfit", "Inter", sans-serif;
  color: #295086;
  padding: 10px;

  .modal-title-text {
    font-size: 18px;
    font-weight: 700;
    color: #295086;
    text-align: center;
    margin-bottom: 24px;
  }

  .review-quote-box {
    font-size: 14px;
    color: #758eab;
    font-style: italic;
    line-height: 1.6;
    text-align: center;
    margin-bottom: 24px;
    padding: 0 10px;

    .author {
      font-style: normal;
      font-weight: 600;
      color: #4d6b93;
      margin-left: 6px;
    }
  }

  textarea {
    width: 100%;
    height: 120px;
    border: 1px solid #cce0ff;
    border-radius: 8px;
    padding: 14px;
    font-size: 14px;
    color: #4d6b93;
    resize: none;
    outline: none;
    margin-bottom: 24px;
    transition: border-color 0.2s ease;

    &:focus {
      border-color: #295086;
    }

    &::placeholder {
      color: #758eab;
      opacity: 0.6;
    }
  }

  .modal-actions {
    display: flex;
    justify-content: center;
    gap: 16px;

    button {
      padding: 10px 24px;
      border-radius: 50px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .cancel-btn {
      background: none;
      border: 1.5px solid #295086;
      color: #295086;

      &:hover {
        background: #f2f7ff;
      }
    }

    .save-btn {
      background: #295086;
      border: 1.5px solid #295086;
      color: #fff;

      &:hover {
        background: #1d3c66;
        border-color: #1d3c66;
      }

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
    }

    .delete-btn {
      background: none;
      border: 1.5px solid #e32c1f;
      color: #e32c1f;

      &:hover {
        background: #fdf2f2;
      }
    }
  }
`;

export default Review;
