import { memo, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import LoadingButton from "@/components/shared/button/LoadingButton";
import CustomModal from "@/components/shared/modal";
import { formatServicePriceWithOutDesimalPoint } from "@/components/therapists-profile/utils";
import { useToaster } from "@/hooks";
import { API_ROUTER } from "@/services/apiRouter";
import {
  AssignServicesDialogClass,
  AssignServicesModalWrapper,
} from "@/styles/pages/assign-services-modal.style";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";

const formatServiceDuration = (service) => {
  const minutes = (service?.hour || 0) * 60 + (service?.minutes || 0);
  return `${minutes}min`;
};

const formatServicePrice = (price) => {
  const amount = Number(price || 0);
  return `$${amount.toFixed(2)}`;
};

const AssignServicesModal = ({
  show,
  onHide = () => { },
  onConfirm = () => { },
  employeeData,
}) => {
  const { toaster } = useToaster();
  const { t } = useTranslation();

  const [services, setServices] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const therapistName = employeeData?.name || t("therapist");

  const loadServices = async () => {
    if (!employeeData?.id) return;

    try {
      setLoading(true);
      const employeeId = employeeData.id;

      const [allServicesRes, assignedServicesRes] = await Promise.all([
        axiosApiCall.get(API_ROUTER?.GET_EMPLOYEE_SERVICES, {
          params: { employeeId, status: "all" },
        }),
        axiosApiCall.get(API_ROUTER?.GET_EMPLOYEE_SERVICES, {
          params: { employeeId, status: "onlyAdded" },
        }),
      ]);

      const allServices = allServicesRes?.data?.data || [];
      const assignedServices = assignedServicesRes?.data?.data || [];

      setServices(allServices);
      setSelectedIds(
        assignedServices.map((service) => String(service.id ?? service.id))
      );
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (show) {
      loadServices();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show, employeeData?.id]);

  const toggleService = (serviceId) => {
    const id = String(serviceId);
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleCancel = () => {
    onHide();
  };

  const handleSave = async () => {
    if (selectedIds.length === 0) {
      toaster(t("assignServicesValidation"), TOAST_TYPES.ERROR);
      return;
    }

    try {
      setSaving(true);


      let params = {
        employeeId: employeeData?.id,
        services: selectedIds.map(id => Number(id))
      };

      const res = await axiosApiCall.post(API_ROUTER?.ASSIGN_EMPLOYEE_SERVICES, params);
      if (!res?.status) {
        return toaster(res?.message, TOAST_TYPES.ERROR);
      }
      console.log("response", res);
      toaster(res?.data?.message, TOAST_TYPES.SUCCESS);
      onConfirm(selectedIds);
      onHide();
    } catch (error) {

      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setSaving(false);
    }
  };

  return (
    <CustomModal
      show={show}
      onHide={handleCancel}
      aria-labelledby="assign-services-modal"
      centered
      className="sitback-modal-wrapper sitback-therapist-modal-wrapper"
      dialogClassName={AssignServicesDialogClass}
    >
      <Modal.Header closeButton className="red-close-icon pb-2" />
      <Modal.Body>
        <AssignServicesModalWrapper className="sitback-assign-services-modal">
          <div className="assign-services-header">
            <h3>{t("assignServicesTo", { name: therapistName })}</h3>
            <p>{t("assignServicesSubtitle")}</p>
          </div>

          <div className="assign-services-grid">
            {loading && (
              <p className="assign-services-empty">{t("loading")}</p>
            )}

            {!loading && services.length === 0 && (
              <p className="assign-services-empty">{t("noServicesAvailable")}</p>
            )}

            {!loading &&
              services.map((service) => {
                const isSelected = selectedIds.includes(String(service.id));

                return (
                  <button
                    key={service.id}
                    type="button"
                    className={`assign-service-card ${isSelected ? "selected" : ""}`}
                    onClick={() => toggleService(service.id)}
                  >
                    <div className="card-top">
                      <span className="service-name">{service?.name}</span>
                      <div className="image-and-checkbox-wrapper">
                        <div className="card-illustration">
                          <img
                            alt={service?.name}
                            src={service?.image || "/images/right-top-img-1.svg"}
                          />
                        </div>
                        <span className="select-indicator">
                          {isSelected && (
                            <img alt="selected" src="/images/checkmark-white.svg" />
                          )}
                        </span>
                      </div>
                    </div>
                    <div className="card-info-row">
                      <div className="info-block">
                        <span className="info-icon">
                          <img alt="time" src="/images/clock-icon.svg" />
                        </span>
                        <div className="info-text">
                          <span className="info-label">{t("time")}</span>
                          <span className="info-value">
                            {formatServiceDuration(service)}
                          </span>
                        </div>
                      </div>
                      <div className="info-block" style={{ justifyContent: "flex-end" }}>
                        <span className="info-icon price-icon">$</span>
                        <div className="info-text">
                          <span className="info-label">{t("price")}</span>
                          <span className="info-value">
                            {formatServicePriceWithOutDesimalPoint(service?.price)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
          </div>

          <div className="assign-services-footer">
            <button
              type="button"
              className="assign-services-cancel-btn"
              onClick={handleCancel}
            >
              {t("cancel")}
            </button>
            <LoadingButton
              type="button"
              className="assign-services-save-btn"
              onClick={handleSave}
              disabled={saving || loading}
              label={t("saveAssignment")}
              loadinglabel={t("saving")}
              isLoading={saving}
            />
          </div>
        </AssignServicesModalWrapper>
      </Modal.Body>
    </CustomModal>
  );
};

export default memo(AssignServicesModal);
