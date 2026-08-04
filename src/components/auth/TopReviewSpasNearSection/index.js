"use client";
import moment from "moment";
import { useRouter } from "next/navigation";
import { Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import ReactStars from "react-rating-stars-component";
import { Swiper, SwiperSlide } from "swiper/react";

// Styles
import { PATH_AUTH } from "@/routes/paths";
import { Button } from "@/styles/global/main.style";
import {
  TopReviewSpasNearSection,
} from "@/styles/pages/comingsoon.style";

// Icons
import { Stat_icon } from "@/styles/svgs";

// Routes

// Import Swiper styles
import 'swiper/css';

export default function TopReviewSpasNearComponent({
  reviews = [],
  loading = false,
  onSeeAllReviews,
}) {

  const { push } = useRouter();
  const { t } = useTranslation();

  const handleSeeAllReviews = () => {
    if (onSeeAllReviews) {
      onSeeAllReviews();
    } else {
      push(PATH_AUTH?.reviews);
    }
  };

  const handleSpaClick = (spaSlug) => {
    if (spaSlug) {
      push(PATH_AUTH?.spas + "/" + spaSlug);
    }
  };

  // Render loading state
  if (loading) {
    return (
      <TopReviewSpasNearSection className="top-review-inner-div">
        <div className="top-review-inner-div">
          <div className="top-review-header-div">
            <h3>{t("ReviewSectionTitleText")}</h3>
            <p>{t("ReviewSectionSubtitleText")}</p>
          </div>
          <div className="text-center py-5">
            <div className="spinner-border text-info" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </TopReviewSpasNearSection>
    );
  }

  // Render no reviews state
  if (!reviews || reviews.length === 0) {
    return (
      <TopReviewSpasNearSection className="top-review-inner-div">
        <div className="top-review-inner-div">
          <div className="top-review-header-div">
              <h3>{t("ReviewSectionTitleText")}</h3>
              <p>{t("ReviewSectionSubtitleText")}</p>
          </div>
          <div className="no-reviews-container text-center py-5">
            <div className="no-reviews-icon mb-3">
              <img
                src="/images/no-reviews-icon.svg"
                alt="No reviews"
                style={{ width: "80px", height: "80px", opacity: 0.5 }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.style.display = "none";
                }}
              />
            </div>
            <h4 className="mb-3">No Reviews Yet</h4>
            <p className="text-muted mb-4">
              There are no reviews available in your area at the moment.
            </p>
          </div>
        </div>
      </TopReviewSpasNearSection>
    );
  }

  // Render reviews
  return (
    <TopReviewSpasNearSection className="top-review-inner-div">
      <div className="top-review-inner-div">
        {/* Header Section */}
        <div className="top-review-header-div">
          <h3>{t("ReviewSectionTitleText")}</h3>
          <p>{t("ReviewSectionSubtitleText")}</p>
        </div>

        {/* Desktop View - Grid layout */}
        <div className="top-review-desktop-view-div">
          <Row>
            {reviews.slice(0, 3).map((review, index) => (
              <Col md={6} lg={4} key={index}>
                <ReviewCard review={review} onSpaClick={handleSpaClick} />
              </Col>
            ))}
          </Row>
        </div>

        {/* Mobile View - Swiper layout */}
        <div className="top-review-mobile-view-div">
          <Swiper slidesPerView={1} spaceBetween={18} navigation={false} autoHeight={true} className="mySwiper">
            {reviews.slice(0, 3).map((review, index) => (
              <SwiperSlide key={index}>
                <ReviewCard review={review} onSpaClick={handleSpaClick} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* See all reviews button */}
        {reviews.length > 3 && (
          <div className="see-all-btn-div">
            <Button className="see-all-review-btn" onClick={handleSeeAllReviews}>
              See all reviews
            </Button>
          </div>
        )}
      </div>
    </TopReviewSpasNearSection>
  );
}

// Internal Review Card Component
const ReviewCard = ({ review, onSpaClick }) => {
  return (
    <div className="review-box-wrapper">
      <div className="review-box-inner-top-div">
        <div className="star-img-div">
          <ReactStars
            isHalf={true}
            value={
              review?.review?.rating % 0.5 === 0
                ? parseFloat(review?.review?.rating)
                : Math.round(parseFloat(review?.review?.rating))
            }
            count={5}
            size={15}
            halfIcon={<i className={Stat_icon}></i>}
            fullIcon={<i className={Stat_icon}></i>}
            activeColor="#00B67A"
            edit={false}
          />
        </div>
        <p className="user-review-para-text">{review.review?.review_text || ""}</p>
      </div>

      <div className="user-content-bottom-wrapper">
        {/* User Info */}
        <div className="user-display-div">
          <div className="clearfix">
            <div className="user-img-div">
              {review.review?.profile_image ? (
                <img src={review.review.profile_image} alt={review.review.reviewer_name} />
              ) : (
                <div className="default-avatar"></div>
              )}
            </div>
          </div>
          <div className="user-detail-div">
            <h6>{review.review?.reviewer_name || ""}</h6>
            <p>
              {review.review?.time ? moment(review.review.time).format("DD MMM YYYY") : "Recent"}
            </p>
          </div>
        </div>

        {/* Spa Info */}
        <div
          className="user-display-box-wrapper"
          onClick={() => onSpaClick(review?.spa_slug)}
          style={{ cursor: "pointer" }}
        >
          <div className="user-left-box">
            <h6>{review.spa_name || ""}</h6>
            <p className="review-text">
              {review.rating || review.review?.rating || ""}
              <span className="star-icon">
                <img src="/images/star-green-icon.svg" alt="Star" />
              </span>
              <span className="total-reviews-text">
                ({review.total_reviews || 0} reviews)
              </span>
            </p>
            <p className="place-text">{review.location || ""}</p>
          </div>
          <div className="user-right-box">
            <div className="clearfix">
              <div className="spa-profile-img">
                {review.image ? (
                  <img src={review.image} alt={review.spa_name} />
                ) : (
                  <div className="default-spa-avatar"></div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
