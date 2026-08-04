"use client";

import moment from "moment";
import { useState } from "react";
import ReactDatePicker from "react-datepicker";
import DateTime from "react-datetime";
import Switch from "react-switch";
import { useTranslation } from "react-i18next";

import DeleteModal from "@/components/shared/modal/DeleteModal";
import { useToaster } from "@/hooks";
import { API_ROUTER } from "@/services/apiRouter";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";
import {
  validateEndTimeGreaterThanStartTime,
  validateTimeFormat,
} from "@/components/dashboards/profile-services/EditableHours";

import "react-datetime/css/react-datetime.css";

export default function LeaveScheduleTab({
  therapist,
  holidays,
  fetchHolidays,
  fetchWorkHours,
}) {
  const { t } = useTranslation();
  const { toaster } = useToaster();

  // Add Form State
  const [newLeaveName, setNewLeaveName] = useState("");
  const [newLeaveDate, setNewLeaveDate] = useState("");
  const [newLeaveIsClosed, setNewLeaveIsClosed] = useState(true);
  const [newLeaveStart, setNewLeaveStart] = useState("10:00 AM");
  const [newLeaveEnd, setNewLeaveEnd] = useState("02:00 PM");
  const [addingLeave, setAddingLeave] = useState(false);

  // Delete State
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deletingLeave, setDeletingLeave] = useState(false);

  // Filter leave entries from all holidays
  const leavesList = holidays.filter((h) => h.name !== "Lunch Block");

  const handleAddLeave = async (e) => {
    e.preventDefault();
    const name = newLeaveName.trim();
    if (!name) {
      return toaster("Time block reason is required", TOAST_TYPES.ERROR);
    }
    if (!newLeaveDate) {
      return toaster("Time block date is required", TOAST_TYPES.ERROR);
    }

    if (!newLeaveIsClosed) {
      if (!newLeaveStart || !validateTimeFormat(newLeaveStart)) {
        return toaster("Start time required", TOAST_TYPES.ERROR);
      }
      if (!newLeaveEnd || !validateTimeFormat(newLeaveEnd)) {
        return toaster("End time required", TOAST_TYPES.ERROR);
      }
      if (!validateEndTimeGreaterThanStartTime(newLeaveStart, newLeaveEnd)) {
        return toaster("End time must be later than start time", TOAST_TYPES.ERROR);
      }
    }

    const payload = {
      reason: name,
      leaveDate: moment(newLeaveDate).format("YYYY-MM-DD"),
      leaveType: newLeaveIsClosed ? "full_day" : "hours",
      employeeId: therapist?.id,
      start_time: newLeaveIsClosed ? "" : newLeaveStart,
      end_time: newLeaveIsClosed ? "" : newLeaveEnd,
      isRepeating: false,
      days: "",
    };

    try {
      setAddingLeave(true);
      const res = await axiosApiCall.post(API_ROUTER?.ADD_EMPLOYEE_LEAVE_SCHEDULE, payload);
      if (res?.status) {
        toaster("Leave added successfully", TOAST_TYPES.SUCCESS);
        setNewLeaveName("");
        setNewLeaveDate("");
        setNewLeaveIsClosed(true);
        await Promise.all([fetchHolidays(), fetchWorkHours()]);
      } else {
        setNewLeaveName("");
        setNewLeaveDate(null);
        setNewLeaveIsClosed(true);
        toaster(res?.message || "Failed to add leave", TOAST_TYPES.ERROR);
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setAddingLeave(false);
    }
  };

  const handleDeleteLeave = async (id) => {
    try {
      setDeletingLeave(true);
      const res = await axiosApiCall.delete(
        `${API_ROUTER?.DELETE_EMPLOYEE_LEAVE_SCHEDULE}?employeeId=${therapist?.id}&leaveScheduleId=${id}`
      );
      if (res?.status) {
        toaster("Leave deleted successfully", TOAST_TYPES.SUCCESS);
        setShowDeleteModal(false);
        setDeleteTarget(null);
        await Promise.all([fetchHolidays(), fetchWorkHours()]);
      } else {
        toaster(res?.message || "Failed to delete leave", TOAST_TYPES.ERROR);
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setDeletingLeave(false);
    }
  };

  return (
    <>
      {/* Add Form Card */}
      <form onSubmit={handleAddLeave} className="holiday-add-form-card">
        <div className="holiday-form-row">
          <div className="form-group-item">
            <label>Time Block Reason:</label>
            <input
              type="text"
              placeholder="e.g. Personal leave"
              className="form-control"
              maxLength={50}
              value={newLeaveName}
              onChange={(e) => setNewLeaveName(e.target.value)}
            />
          </div>

          <div className="form-group-item date-picker-item">
            <label>Date</label>
            <div className="react-datetime-picker">
              <ReactDatePicker
                key={newLeaveDate || "empty"}
                placeholderText="YYYY-MM-DD"
                className="form-control"
                selected={newLeaveDate ? moment(newLeaveDate).toDate() : null}
                onChange={(date) => {
                  if (date) {
                    setNewLeaveDate(moment(date).format("YYYY-MM-DD"));
                  } else {
                    setNewLeaveDate("");
                  }
                }}
                minDate={moment().startOf("day").toDate()}
                dateFormat="yyyy-MM-dd"
                onKeyDown={(e) => {
                  e.preventDefault();
                }}
              />
              <span className="calendar-icon-indicator">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 15" style={{ width: '16px', height: '16px' }}>
                  <path fill="currentColor" d="M12.75 2.377h-2.625v-1A.125.125 0 0 0 10 1.252h-.875A.125.125 0 0 0 9 1.377v1H5v-1a.125.125 0 0 0-.125-.125H4a.125.125 0 0 0-.125.125v1H1.25a.5.5 0 0 0-.5.5v10.375a.5.5 0 0 0 .5.5h11.5a.5.5 0 0 0 .5-.5V2.877a.5.5 0 0 0-.5-.5Zm-.625 10.25H1.875V6.689h10.25v5.938Zm-10.25-7V3.502h2v.75c0 .069.056.125.125.125h.875A.125.125 0 0 0 5 4.252v-.75h4v.75c0 .069.056.125.125.125H10a.125.125 0 0 0 .125-.125v-.75h2v2.125H1.875Z" />
                </svg>
              </span>
            </div>
          </div>

          <div className="toggle-group-item">
            <Switch
              onChange={(checked) => setNewLeaveIsClosed(checked)}
              checked={newLeaveIsClosed}
              offColor="#C5CAD3"
              onColor="#295086"
              uncheckedIcon={false}
              checkedIcon={false}
              height={20}
              width={40}
              handleDiameter={16}
            />
            <span>Full Day</span>
          </div>

          {newLeaveIsClosed && (
            <div className="submit-group-item">
              <button type="submit" className="add-holiday-btn" disabled={addingLeave}>
                {addingLeave ? "+ ADDING....." : "+ ADD TIME BLOCK"}
              </button>
            </div>
          )}
        </div>

        {!newLeaveIsClosed && (
          <div className="holiday-form-row">
            <div className="form-group-item date-picker-item">
              <label>Start</label>
              <DateTime
                dateFormat={false}
                timeFormat="hh:mm A"
                closeOnSelect={true}
                value={newLeaveStart}
                onChange={(time) => {
                  if (time) {
                    setNewLeaveStart(moment(time).format("hh:mm A"));
                  }
                }}
                inputProps={{
                  className: "form-control"
                }}
              />
            </div>
            <div className="form-group-item date-picker-item">
              <label>End</label>
              <DateTime
                dateFormat={false}
                timeFormat="hh:mm A"
                closeOnSelect={true}
                value={newLeaveEnd}
                onChange={(time) => {
                  if (time) {
                    setNewLeaveEnd(moment(time).format("hh:mm A"));
                  }
                }}
                inputProps={{
                  className: "form-control"
                }}
              />
            </div>
            <div className="submit-group-item">
              <button type="submit" className="add-holiday-btn" disabled={addingLeave}>
                {addingLeave ? "+ ADDING....." : "+ ADD TIME BLOCK"}
              </button>
            </div>
          </div>
        )}
      </form>

      {/* Cards List */}
      <div className="holiday-list-container">
        {leavesList.map((holiday) => {
          const hDate = moment(holiday.date);
          const monthStr = hDate.format("MMM");
          const dayStr = hDate.format("D");
          const fullDateStr = hDate.format("dddd, MMMM D, YYYY");

          return (
            <div key={holiday.id} className="holiday-card">
              <div className="holiday-card-left">
                <div className="holiday-date-block">
                  <span className="holiday-month">{monthStr}</span>
                  <span className="holiday-day">{dayStr}</span>
                </div>
                <div className="holiday-info-block">
                  <h4>{holiday.name}</h4>
                  <p>{fullDateStr}</p>
                </div>
              </div>

              <div className="holiday-card-right">
                {holiday.isOpen ? (
                  <span className="holiday-status-badge open">
                    {holiday.start_time} - {holiday.end_time}
                  </span>
                ) : (
                  <span className="holiday-status-badge closed">Closed</span>
                )}

                <button
                  type="button"
                  onClick={() => {
                    setDeleteTarget(holiday.id);
                    setShowDeleteModal(true);
                  }}
                  className="holiday-delete-btn"
                  title="Delete holiday"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 16" width="16" height="16">
                    <path fill="#E32C1F" fillRule="evenodd" d="M13.215 2.932c.292 0 .535.242.535.55v.286c0 .3-.243.55-.535.55H.785a.547.547 0 0 1-.535-.55v-.285c0-.309.243-.55.535-.55h2.187c.444 0 .831-.317.93-.762l.115-.512C4.195.963 4.781.5 5.451.5H8.55a1.49 1.49 0 0 1 1.426 1.123l.123.547a.96.96 0 0 0 .93.762h2.187Zm-1.11 10.418c.228-2.127.627-7.182.627-7.233a.559.559 0 0 0-.135-.419.544.544 0 0 0-.393-.175H1.801a.53.53 0 0 0-.392.175.593.593 0 0 0-.143.419l.04.485c.106 1.322.403 5.006.595 6.748.135 1.284.978 2.091 2.198 2.12.942.022 1.912.03 2.904.03.934 0 1.883-.008 2.854-.03 1.263-.021 2.104-.814 2.247-2.12Z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <DeleteModal
        show={showDeleteModal}
        disabled={deletingLeave}
        messageBody={
          <>
            {t("Are you sure you want to delete this leave?") || "Are you sure you want to delete this leave?"}
          </>
        }
        handleClose={() => {
          setShowDeleteModal(false);
          setDeleteTarget(null);
        }}
        handleConfirmDelete={() => handleDeleteLeave(deleteTarget)}
      />
    </>
  );
}
