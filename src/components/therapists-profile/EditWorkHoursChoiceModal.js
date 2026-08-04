"use client";

import { useMemo } from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import CustomModal from "@/components/shared/modal";
import {
  WorkHoursEditDialogClass,
  WorkHoursEditModalWrapper,
} from "@/styles/pages/work-hours-edit-modal.style";
import { formatChoiceDate, getWeekdayPluralName } from "./workHoursEditUtils";

export default function EditWorkHoursChoiceModal({
  show,
  selectedDate,
  onHide,
  onSelectRepeating,
  onSelectDayOnly,
}) {
  const { t } = useTranslation();

  const weekdayPlural = useMemo(
    () => (selectedDate ? getWeekdayPluralName(selectedDate) : ""),
    [selectedDate]
  );
  const formattedDate = useMemo(
    () => (selectedDate ? formatChoiceDate(selectedDate) : ""),
    [selectedDate]
  );

  if (!selectedDate) return null;

  return (
    <CustomModal
      show={show}
      onHide={onHide}
      centered
      className="sitback-modal-wrapper sitback-therapist-modal-wrapper"
      dialogClassName={WorkHoursEditDialogClass}
    >
      <Modal.Header closeButton className="red-close-icon pb-2" />
      <Modal.Body>
        <WorkHoursEditModalWrapper className="sitback-work-hours-edit-modal">
          <div className="work-hours-edit-header">
            <h3>{t("whatWouldYouLikeToEdit")}</h3>
          </div>

          <div className="work-hours-choice-list">
            <button type="button" className="work-hours-choice-btn" onClick={onSelectRepeating}>
              <span className="choice-title">{t("repeatingShifts")}</span>
              <span className="choice-subtitle">
                {t("repeatingShiftsDescription", {
                  weekday: weekdayPlural,
                  date: formattedDate,
                })}
              </span>
            </button>

            <button type="button" className="work-hours-choice-btn" onClick={onSelectDayOnly}>
              <span className="choice-title">{t("thisDayOnly")}</span>
              <span className="choice-subtitle">
                {t("thisDayOnlyDescription", { date: formattedDate })}
              </span>
            </button>
          </div>
        </WorkHoursEditModalWrapper>
      </Modal.Body>
    </CustomModal>
  );
}
