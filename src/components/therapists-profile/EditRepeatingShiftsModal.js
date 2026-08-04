"use client";

import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import DateTime from "react-datetime";
import { useTranslation } from "react-i18next";

import {
  checkInvalidDuration,
  checkShiftsOverlap,
  createDefaultShift,
  formatChoiceDate,
  formatEditDayTitle,
  getWeekdayPluralName,
} from "./workHoursEditUtils";

import LoadingButton from "@/components/shared/button/LoadingButton";
import CustomModal from "@/components/shared/modal";
import { useToaster } from "@/hooks";
import {
  WorkHoursEditDialogClass,
  WorkHoursEditModalWrapper,
} from "@/styles/pages/work-hours-edit-modal.style";
import { TOAST_TYPES } from "@/utils/constants";

function ShiftRows({ shifts, setShifts, disabled, t }) {
  const updateShift = (id, field, value) => {
    setShifts((prev) =>
      prev.map((shift) => (shift.id === id ? { ...shift, [field]: value } : shift))
    );
  };

  const removeShift = (id) => {
    setShifts((prev) => prev.filter((shift) => shift.id !== id));
  };

  const addShift = () => {
    setShifts((prev) => {
      if (prev.length >= 3) return prev;
      return [...prev, createDefaultShift()];
    });
  };

  return (
    <>
      <div className="shift-rows">
        {shifts.map((shift) => (
          <div key={shift.id} className="shift-row">
            <div className="shift-field">
              <label>{t("startTime")}</label>
              <DateTime
                dateFormat={false}
                timeFormat="hh:mm A"
                closeOnSelect={true}
                value={shift.startTime ? moment(shift.startTime, ["hh:mm A", "h:mm A"]) : ""}
                onChange={(time) => {
                  const timeStr = !time ? "" : (typeof time === "string" ? time : moment(time).format("hh:mm A"));
                  updateShift(shift.id, "startTime", timeStr);
                }}
                inputProps={{
                  disabled: disabled,
                }}
              />
            </div>

            <div className="shift-field">
              <label>{t("endTime")}</label>
              <DateTime
                dateFormat={false}
                timeFormat="hh:mm A"
                closeOnSelect={true}
                value={shift.endTime ? moment(shift.endTime, ["hh:mm A", "h:mm A"]) : ""}
                onChange={(time) => {
                  const timeStr = !time ? "" : (typeof time === "string" ? time : moment(time).format("hh:mm A"));
                  updateShift(shift.id, "endTime", timeStr);
                }}
                inputProps={{
                  disabled: disabled,
                }}
              />
            </div>

            <button
              type="button"
              className="shift-delete-btn"
              disabled={disabled || shifts.length === 1}
              onClick={() => removeShift(shift.id)}
              aria-label={t("deleteShift")}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.8025 3.9225C14.595 3.8025 13.3875 3.7125 12.1725 3.645V3.6375L12.0075 2.6625C11.895 1.9725 11.73 0.9375 9.975 0.9375H8.01C6.2625 0.9375 6.0975 1.9275 5.9775 2.655L5.82 3.615C5.1225 3.66 4.425 3.705 3.7275 3.7725L2.1975 3.9225C1.8825 3.9525 1.6575 4.23 1.6875 4.5375C1.7175 4.845 1.9875 5.07 2.3025 5.04L3.8325 4.89C7.7625 4.5 11.7225 4.65 15.6975 5.0475C15.72 5.0475 15.735 5.0475 15.7575 5.0475C16.0425 5.0475 16.29 4.83 16.32 4.5375C16.3425 4.23 16.1175 3.9525 15.8025 3.9225Z" fill="currentColor"/>
                <path d="M14.4225 6.105C14.2425 5.9175 13.995 5.8125 13.74 5.8125H4.26C4.005 5.8125 3.75 5.9175 3.5775 6.105C3.405 6.2925 3.3075 6.5475 3.3225 6.81L3.7875 14.505C3.87 15.645 3.975 17.07 6.59249 17.07H11.4075C14.025 17.07 14.13 15.6525 14.2125 14.505L14.6775 6.8175C14.6925 6.5475 14.595 6.2925 14.4225 6.105ZM10.245 13.3125H7.7475C7.43999 13.3125 7.18499 13.0575 7.18499 12.75C7.18499 12.4425 7.43999 12.1875 7.7475 12.1875H10.245C10.5525 12.1875 10.8075 12.4425 10.8075 12.75C10.8075 13.0575 10.5525 13.3125 10.245 13.3125ZM10.875 10.3125H7.12499C6.8175 10.3125 6.56249 10.0575 6.56249 9.75C6.56249 9.4425 6.8175 9.1875 7.12499 9.1875H10.875C11.1825 9.1875 11.4375 9.4425 11.4375 9.75C11.4375 10.0575 11.1825 10.3125 10.875 10.3125Z" fill="currentColor"/>
              </svg>
            </button>
          </div>
        ))}
      </div>
      <div className="text-center">
        <button
          type="button"
          className="add-shift-btn"
          disabled={disabled || shifts.length >= 3}
          onClick={addShift}
        >
          <span className="plus-icon">+</span>
          <span>{t("addShift")}</span>
        </button>
      </div>
    </>
  );
}

export default function EditRepeatingShiftsModal({
  show,
  selectedDate,
  initialShifts,
  onHide,
  onSave,
}) {
  const { t } = useTranslation();
  const { toaster } = useToaster();
  const [shifts, setShifts] = useState([]);
  const [saving, setSaving] = useState(false);

  const weekdayPlural = useMemo(
    () => (selectedDate ? getWeekdayPluralName(selectedDate) : ""),
    [selectedDate]
  );
  const formattedDate = useMemo(
    () => (selectedDate ? formatChoiceDate(selectedDate) : ""),
    [selectedDate]
  );

  useEffect(() => {
    if (show) {
      setShifts(initialShifts?.length ? initialShifts : [createDefaultShift()]);
    }
  }, [show, initialShifts]);

  const handleSave = async () => {
    if (checkInvalidDuration(shifts)) {
      toaster(t("invalidShiftDurationError"), TOAST_TYPES.ERROR);
      return;
    }
    if (checkShiftsOverlap(shifts)) {
      toaster(t("shiftsOverlapError"), TOAST_TYPES.ERROR);
      return;
    }

    try {
      setSaving(true);
      await onSave({
        shifts,
        date: selectedDate,
        notWorking: false,
        type: "repeating",
      });
      onHide();
    } finally {
      setSaving(false);
    }
  };

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
            <h3>{t("editShiftsForWeekday", { weekday: weekdayPlural })}</h3>
            <p>
              {t("editRepeatingShiftsSubtitle", {
                weekday: weekdayPlural,
                date: formattedDate,
              })}
            </p>
          </div>

          <ShiftRows
            shifts={shifts}
            setShifts={setShifts}
            disabled={false}
            t={t}
          />

          <div className="work-hours-edit-footer">
            <button type="button" className="edit-cancel-btn" onClick={onHide}>
              {t("cancel")}
            </button>
            <LoadingButton
              type="button"
              className="edit-save-btn"
              onClick={handleSave}
              disabled={saving}
              label={t("saveCaps")}
              loadinglabel={t("saving")}
              isLoading={saving}
            />
          </div>
        </WorkHoursEditModalWrapper>
      </Modal.Body>
    </CustomModal>
  );
}

export function EditDayShiftsModal({
  show,
  selectedDate,
  initialShifts,
  initialNotWorking,
  onHide,
  onSave,
}) {
  const { t } = useTranslation();
  const { toaster } = useToaster();
  const [shifts, setShifts] = useState([]);
  const [notWorking, setNotWorking] = useState(false);
  const [saving, setSaving] = useState(false);

  const dayTitle = useMemo(
    () => (selectedDate ? formatEditDayTitle(selectedDate) : ""),
    [selectedDate]
  );

  useEffect(() => {
    if (show) {
      const isNotWorking = initialNotWorking || false;
      let initial = initialShifts?.length ? initialShifts : [createDefaultShift("10:00 AM", "8:00 PM")];
      if (isNotWorking) {
        initial = initial.slice(0, 1);
      }
      setShifts(initial);
      setNotWorking(isNotWorking);
    }
  }, [show, initialShifts, initialNotWorking]);

  const handleNotWorkingChange = (checked) => {
    setNotWorking(checked);
    if (checked) {
      setShifts((prev) => (prev.length ? [prev[0]] : [createDefaultShift("10:00 AM", "8:00 PM")]));
    }
  };

  const handleSave = async () => {
    const finalShifts = notWorking ? shifts.slice(0, 1) : shifts;

    if (!notWorking) {
      if (checkInvalidDuration(finalShifts)) {
        toaster(t("invalidShiftDurationError"), TOAST_TYPES.ERROR);
        return;
      }
      if (checkShiftsOverlap(finalShifts)) {
        toaster(t("shiftsOverlapError"), TOAST_TYPES.ERROR);
        return;
      }
    }

    try {
      setSaving(true);
      await onSave({
        shifts: finalShifts,
        date: selectedDate,
        notWorking,
        type: "only_this_day",
      });
      onHide();
    } finally {
      setSaving(false);
    }
  };

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
            <h3>{t("editShiftsForDay", { day: dayTitle })}</h3>
            <p>{t("editDayShiftsSubtitle")}</p>
          </div>

          {/* <div className="not-working-toggle-row">
            <span className="not-working-label">{t("notWorking")}</span>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={notWorking}
                onChange={(e) => handleNotWorkingChange(e.target.checked)}
              />
              <span className="slider" />
            </label>
          </div> */}

          <ShiftRows
            shifts={shifts}
            setShifts={setShifts}
            disabled={notWorking}
            t={t}
          />

          <div className="work-hours-edit-footer">
            <button type="button" className="edit-cancel-btn" onClick={onHide}>
              {t("cancel")}
            </button>
            <LoadingButton
              type="button"
              className="edit-save-btn"
              onClick={handleSave}
              disabled={saving}
              label={t("saveCaps")}
              loadinglabel={t("saving")}
              isLoading={saving}
            />
          </div>
        </WorkHoursEditModalWrapper>
      </Modal.Body>
    </CustomModal>
  );
}
