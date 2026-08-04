import { useRouter } from "next/navigation";
import React from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import LoadingButton from "../button/LoadingButton";
import { handleCardModal, tabHandle } from "@/redux/messageTab";
import { PATH_DASHBOARD } from "@/routes/paths";

const SpaCardExpired = ({ show }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { push } = useRouter();

  const goToPage = () => {
    dispatch(tabHandle("second"));
    dispatch(handleCardModal(true));
    push(PATH_DASHBOARD?.insights);
  };

  return (
    <Modal
      show={show}
      backdrop="static"
      keyboard={false}
      aria-labelledby="spa-card-expired-modal"
      centered
      className="sitback-modal-wrapper warning-modal-wrapper"
    >
      <Modal.Body>
        <div className="sitback-request-modal-wrapper card-expired-modal-wrapper">
          <h5>{t("spaCardExpiredTitle")}</h5>
          <p className="mb-0">{t("spaCardExpiredMessage")}</p>
        </div>
        <div className="modal-footer-div mb-2">
          <LoadingButton
            type="button"
            disabled={false}
            label={t("spaCardExpiredCta")}
            loadinglabel={t("spaCardExpiredCta")}
            isLoading={false}
            className="loading-btn-wrapper"
            onClick={goToPage}
            style={{
              background: "#004D87",
              border: "1px solid #004D87",
              borderRadius: "100px",
              color: "#fff",
              fontWeight: "600",
              letterSpacing: "1px",
            }}
          />
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default SpaCardExpired;
