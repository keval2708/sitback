"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Container, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import InlineSVG from "svg-inline-react";
import { PATH_POS } from "@/routes/paths";
import { API_ROUTER } from "@/services/apiRouter";
import { MainLayoutWrapper } from "@/styles/global/main.style";
import { PosLayoutWrapper } from "@/styles/pages/pos.style";
import { ProductInventoryIcon, ProductSalesIcon } from "@/styles/svgs";
import axiosApiCall from "@/utils/axios";

const extractProductCount = (payload) => {
  if (typeof payload === "number") return payload;
  if (payload == null) return 0;
  return Number(
    payload?.count ??
      payload?.productCount ??
      payload?.total ??
      payload?.totalRecords ??
      0
  );
};

export default function Pos() {
  const { push } = useRouter();
  const { t } = useTranslation();
  const [hasProducts, setHasProducts] = useState(false);
  const [showNoProductsModal, setShowNoProductsModal] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchProductCount = async () => {
      try {
        const res = await axiosApiCall.get(API_ROUTER?.POS_PRODUCT_COUNT);
        if (!isMounted) return;

        if (!res?.data?.status) {
          setHasProducts(false);
          return;
        }

        const count = extractProductCount(res?.data?.data ?? res?.data);
        setHasProducts(count > 0);
      } catch (error) {
        if (isMounted) setHasProducts(false);
      }
    };

    fetchProductCount();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleViewSales = () => {
    if (!hasProducts) {
      setShowNoProductsModal(true);
      return;
    }
    push(PATH_POS.list);
  };

  const handleContinueToInventory = () => {
    setShowNoProductsModal(false);
    push(PATH_POS.inventory);
  };

  return (
    <MainLayoutWrapper>
      <PosLayoutWrapper className="sitback-updated-pos-wrapper">
        <Container>
          <div className="pos-landing-content">
            <div className="pos-landing-header">
              <h1>{t("posLandingTitle")}</h1>
              <p>{t("posLandingSubtitle")}</p>
            </div>

            <div className="pos-landing-cards">
              <div className="pos-landing-card">
                <div className="pos-landing-card-icon">
                  <InlineSVG src={ProductSalesIcon} />
                </div>
                <h2>{t("productSalesTitle")}</h2>
                <p>{t("productSalesDescription")}</p>
                <button
                  type="button"
                  className="pos-landing-card-btn"
                  onClick={handleViewSales}
                >
                  {t("viewSales")}
                </button>
              </div>

              <div className="pos-landing-card">
                <div className="pos-landing-card-icon">
                  <InlineSVG src={ProductInventoryIcon} />
                </div>
                <h2>{t("productInventoryTitle")}</h2>
                <p>{t("productInventoryDescription")}</p>
                <button
                  type="button"
                  className="pos-landing-card-btn"
                  onClick={() => push(PATH_POS.inventory)}
                >
                  {t("viewInventory")}
                </button>
              </div>
            </div>
          </div>
        </Container>
      </PosLayoutWrapper>

      <Modal
        show={showNoProductsModal}
        onHide={() => setShowNoProductsModal(false)}
        centered
        dialogClassName="modal-dialog-centered"
        contentClassName="border-0 rounded-4"
        style={{ zIndex: 1050 }}
      >
        <Modal.Body className="p-5 text-center">
          <div className="mb-4">
            <svg
              width="60"
              height="60"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ color: "#E32C1F" }}
            >
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
              <path
                d="M12 8V13M12 16H12.01"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <h3 className="mb-3" style={{ color: "#295086", fontWeight: 600 }}>
            {t("noProductsAvailableTitle")}
          </h3>
          <p className="text-muted mb-4" style={{ fontSize: "15px", lineHeight: "1.6" }}>
            {t("noProductsAvailableMessage")}
          </p>
          <div className="d-flex justify-content-center gap-3">
            <button
              type="button"
              className="btn btn-outline-secondary px-4 py-2"
              style={{ borderRadius: "100px", fontWeight: 500 }}
              onClick={() => setShowNoProductsModal(false)}
            >
              {t("cancel")}
            </button>
            <button
              type="button"
              className="btn px-4 py-2"
              style={{
                borderRadius: "100px",
                fontWeight: 500,
                backgroundColor: "#295086",
                color: "#fff",
                border: "none",
              }}
              onClick={handleContinueToInventory}
            >
              {t("continue")}
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </MainLayoutWrapper>
  );
}
