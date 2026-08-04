"use client";

import moment from "moment";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import ReactDatePicker from "react-datepicker";
import DateTime from "react-datetime";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import {
  validateEndTimeGreaterThanStartTime,
  validateTimeFormat,
} from "@/components/dashboards/profile-services/EditableHours";
import DeleteModal from "@/components/shared/modal/DeleteModal";
import { useToaster } from "@/hooks";
import { API_ROUTER } from "@/services/apiRouter";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";

import "react-datetime/css/react-datetime.css";

const WEEK_DAYS = [
  { label: "Mon", value: "Monday" },
  { label: "Tue", value: "Tuesday" },
  { label: "Wed", value: "Wednesday" },
  { label: "Thu", value: "Thursday" },
  { label: "Fri", value: "Friday" },
  { label: "Sat", value: "Saturday" },
  { label: "Sun", value: "Sunday" },
];

export default function LunchBlockTab({
  therapist,
  fetchWorkHours,
  onLunchBlocksCountChange,
}) {
  const { t } = useTranslation();
  const { toaster } = useToaster();

  // Add Form State
  const [isRepeating, setIsRepeating] = useState(true);
  const [selectedDays, setSelectedDays] = useState(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]);
  const [newLunchDate, setNewLunchDate] = useState("");
  const [newLunchStart, setNewLunchStart] = useState("12:00 PM");
  const [newLunchEnd, setNewLunchEnd] = useState("01:00 PM");
  const [addingLunch, setAddingLunch] = useState(false);

  // Edit Modal State
  const [editingLunchBlock, setEditingLunchBlock] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editDate, setEditDate] = useState("");
  const [editStart, setEditStart] = useState("12:00 PM");
  const [editEnd, setEditEnd] = useState("01:00 PM");
  const [editSelectedDays, setEditSelectedDays] = useState([]);
  const [editIsRepeating, setEditIsRepeating] = useState(false);

  // Delete Modal State
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deletingLunch, setDeletingLunch] = useState(false);

  const [lunchBlocksList, setLunchBlocksList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchLunchBlocks = async (showLoading = true) => {
    if (!therapist?.id) return;
    try {
      if (showLoading) setLoading(true);
      const res = await axiosApiCall.get(`${API_ROUTER?.GET_LUNCH_BREAKS}?employeeId=${therapist.id}`);
      console.log(res);
      if (res?.status) {
        const responseData = res?.data?.data?.lunchList
        console.log("responseData", responseData);

        const mapped = responseData.map((item) => {
          let itemDays = [];
          if (Array.isArray(item.days)) {
            itemDays = item.days;
          } else if (typeof item.days === 'string') {
            if (item.days.startsWith('[') && item.days.endsWith(']')) {
              try {
                itemDays = JSON.parse(item.days);
              } catch (e) {
                itemDays = item.days.split(',').map(d => d.trim()).filter(Boolean);
              }
            } else {
              itemDays = item.days.split(',').map(d => d.trim()).filter(Boolean);
            }
          }

          return {
            id: item.id || item.lunchBreakId,
            lunchBreakId: item.lunchBreakId || item.id,
            employeeId: item.employeeId,
            mode: item.mode,
            isRepeating: item.mode === "Ongoing",
            startTime: item.startTime || item.start_time || "",
            endTime: item.endTime || item.end_time || "",
            startDate: item.startDate || item.date || "",
            days: itemDays,
          };
        });

        setLunchBlocksList(mapped);
        if (onLunchBlocksCountChange) {
          onLunchBlocksCountChange(mapped.length);
        }
      } else {
        toaster(res?.message || "Failed to fetch lunch breaks", TOAST_TYPES.ERROR);
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLunchBlocks();
  }, [therapist?.id]);

  useEffect(() => {
    if (editingLunchBlock) {
      setEditDate(editingLunchBlock.startDate || editingLunchBlock.effectiveDate || editingLunchBlock.date || "");
      setEditStart(editingLunchBlock.startTime || "12:00 PM");
      setEditEnd(editingLunchBlock.endTime || "01:00 PM");
      setEditIsRepeating(editingLunchBlock.mode === "ongoing" || editingLunchBlock.mode === "Ongoing" || editingLunchBlock.isRepeating);

      const normalizedDays = (editingLunchBlock.days || []).map((d) => {
        const found = WEEK_DAYS.find(
          (w) => w.label.toLowerCase() === d.toLowerCase() || w.value.toLowerCase() === d.toLowerCase()
        );
        return found ? found.value : d;
      });
      setEditSelectedDays(normalizedDays);
    }
  }, [editingLunchBlock]);

  const handleAddLunchBlock = async (e) => {
    e.preventDefault();
    if (!newLunchDate) {
      return toaster("Lunch date is required", TOAST_TYPES.ERROR);
    }
    if (isRepeating && selectedDays.length === 0) {
      return toaster("Please select at least one day to repeat", TOAST_TYPES.ERROR);
    }

    if (!newLunchStart || !validateTimeFormat(newLunchStart)) {
      return toaster("Start time required", TOAST_TYPES.ERROR);
    }
    if (!newLunchEnd || !validateTimeFormat(newLunchEnd)) {
      return toaster("End time required", TOAST_TYPES.ERROR);
    }
    if (!validateEndTimeGreaterThanStartTime(newLunchStart, newLunchEnd)) {
      return toaster("End time must be later than start time", TOAST_TYPES.ERROR);
    }

    const payload = {
      employeeId: therapist?.id,
      mode: isRepeating ? "Ongoing" : "Custom",
      startTime: newLunchStart,
      endTime: newLunchEnd,
      effectiveDate: moment(newLunchDate).format("YYYY-MM-DD"),
      days: isRepeating ? selectedDays : [],
    };

    try {
      setAddingLunch(true);
      const res = await axiosApiCall.post(API_ROUTER?.ADD_LUNCH_BREAK, payload);
      if (res?.status) {
        toaster("Lunch block added successfully", TOAST_TYPES.SUCCESS);
        setNewLunchDate("");
        setNewLunchStart("12:00 PM");
        setNewLunchEnd("01:00 PM");
        await Promise.all([fetchLunchBlocks()]);
      } else {
        setNewLunchDate(null);
        toaster(res?.message || "Failed to add lunch block", TOAST_TYPES.ERROR);
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setAddingLunch(false);
    }
  };

  const handleUpdateLunchBlock = async (e) => {
    e.preventDefault();
    if (!editDate) {
      return toaster("Date is required", TOAST_TYPES.ERROR);
    }
    if (editIsRepeating && editSelectedDays.length === 0) {
      return toaster("Please select at least one day to repeat", TOAST_TYPES.ERROR);
    }

    if (!editStart || !validateTimeFormat(editStart)) {
      return toaster("Start time required", TOAST_TYPES.ERROR);
    }
    if (!editEnd || !validateTimeFormat(editEnd)) {
      return toaster("End time required", TOAST_TYPES.ERROR);
    }
    if (!validateEndTimeGreaterThanStartTime(editStart, editEnd)) {
      return toaster("End time must be later than start time", TOAST_TYPES.ERROR);
    }

    const payload = {
      employeeId: therapist?.id,
      mode: editIsRepeating ? "Ongoing" : "Custom",
      startTime: editStart,
      endTime: editEnd,
      effectiveDate: moment(editDate).format("YYYY-MM-DD"),
      lunchBreakId: editingLunchBlock.id || editingLunchBlock.lunchBreakId,
      days: editIsRepeating ? editSelectedDays : [],
    };

    try {
      setAddingLunch(true);
      const res = await axiosApiCall.post(API_ROUTER?.EDIT_LUNCH_BREAK, payload);
      if (res?.status) {
        toaster("Lunch block updated successfully", TOAST_TYPES.SUCCESS);
        setShowEditModal(false);
        setEditingLunchBlock(null);
        await Promise.all([fetchLunchBlocks()]);
      } else {
        toaster(res?.message || "Failed to update lunch block", TOAST_TYPES.ERROR);
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setAddingLunch(false);
    }
  };

  const handleDeleteLunchBlock = async (id) => {
    try {
      setDeletingLunch(true);
      const res = await axiosApiCall.delete(
        `${API_ROUTER?.DELETE_LUNCH_BREAK}?employeeId=${therapist?.id}&lunchBreakId=${id}`
      );
      if (res?.status) {
        toaster("Lunch block deleted successfully", TOAST_TYPES.SUCCESS);
        setShowDeleteModal(false);
        setDeleteTarget(null);
        await Promise.all([fetchLunchBlocks(false), fetchWorkHours(false)]);
      } else {
        toaster(res?.message || "Failed to delete lunch block", TOAST_TYPES.ERROR);
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setDeletingLunch(false);
    }
  };

  console.log('lunchBlocksList', lunchBlocksList)

  return (
    <>
      {/* Add Form Card */}
      <form onSubmit={handleAddLunchBlock} className="holiday-add-form-card">
        <div className="lunch-type-radio-group">
          <label className="radio-label">
            <input
              type="radio"
              name="lunchType"
              checked={isRepeating}
              onChange={() => setIsRepeating(true)}
            />
            <span>Repeating day</span>
          </label>
          <label className="radio-label">
            <input
              type="radio"
              name="lunchType"
              checked={!isRepeating}
              onChange={() => setIsRepeating(false)}
            />
            <span>Single day</span>
          </label>
        </div>

        {isRepeating && (
          <div className="form-group-item w-100 mb-2">
            <label>Repeat On</label>
            <div className="repeat-days-chips">
              {WEEK_DAYS.map((day) => {
                const isSelected = selectedDays.includes(day.value);
                return (
                  <button
                    key={day.value}
                    type="button"
                    className={`repeat-day-chip ${isSelected ? "active" : ""}`}
                    onClick={() => {
                      if (isSelected) {
                        setSelectedDays(selectedDays.filter((d) => d !== day.value));
                      } else {
                        setSelectedDays([...selectedDays, day.value]);
                      }
                    }}
                  >
                    {isSelected && <span className="check-left">✓</span>}
                    <span className="day-text">{day.label}</span>

                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="holiday-form-row">
          <div className="form-group-item date-picker-item">
            <label>{isRepeating ? "Effective From" : "Date"}</label>
            <div className="react-datetime-picker">
              <ReactDatePicker
                key={newLunchDate || "empty"}
                placeholderText="YYYY-MM-DD"
                className="form-control"
                selected={newLunchDate ? moment(newLunchDate).toDate() : null}
                onChange={(date) => {
                  if (date) {
                    setNewLunchDate(moment(date).format("YYYY-MM-DD"));
                  } else {
                    setNewLunchDate("");
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

          <div className="form-group-item date-picker-item">
            <label>Start</label>
            <DateTime
              dateFormat={false}
              timeFormat="hh:mm A"
              closeOnSelect={true}
              value={newLunchStart}
              onChange={(time) => {
                if (time) {
                  setNewLunchStart(moment(time).format("hh:mm A"));
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
              value={newLunchEnd}
              onChange={(time) => {
                if (time) {
                  setNewLunchEnd(moment(time).format("hh:mm A"));
                }
              }}
              inputProps={{
                className: "form-control"
              }}
            />
          </div>

          <div className="submit-group-item">
            <button type="submit" className="add-holiday-btn" disabled={addingLunch}>
              {addingLunch ? "+ ADDING....." : "+ ADD LUNCH BLOCK"}
            </button>
          </div>
        </div>
      </form>

      {/* Lunch Blocks Table List */}
      <div className="lunch-table-container">
        {loading ? (
          <div style={{ cursor: 'default', pointerEvents: 'none', padding: '10px 0' }}>
            <Skeleton count={3} height={35} style={{ marginBottom: '8px' }} />
          </div>
        ) : lunchBlocksList.length === 0 ? (
          <p className="text-center my-3" style={{ color: '#295086' }}>No lunch block configured.</p>
        ) : (
          <table className="lunch-table">
            <thead>
              <tr>
                <th>Days</th>
                <th>Break Time</th>
                <th>Duration</th>
                <th>Type</th>
                <th>Effective From</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {lunchBlocksList.map((item) => {

                const s = moment(item.startTime || item.start_time, "hh:mm A");
                const e = moment(item.endTime || item.end_time, "hh:mm A");
                const diffMinutes = e.diff(s, "minutes");
                const hours = Math.floor(diffMinutes / 60);
                const minutes = diffMinutes % 60;
                const durationStr = `${hours}h ${minutes.toString().padStart(2, '0')}m`;

                const daysDisplay = item.mode === "ongoing"
                  ? (Array.isArray(item.days) ? item.days.join(", ") : (item.days ? item.days.split(",").join(", ") : "None"))
                  : moment(item?.startDate).format("dddd, MMMM DD, YYYY");

                const effectiveFrom = moment(item?.startDate).format("MMM DD, YYYY");
                console.log("effectiveFrom", effectiveFrom);

                return (
                  <tr key={item.id}>
                    <td className="days-col">{daysDisplay}</td>
                    <td>{item.startTime || item.start_time} – {item.endTime || item.end_time}</td>
                    <td>{durationStr}</td>
                    <td>
                      <span>
                        {item.mode === "ongoing" ? "Repeat" : "Single Day"}
                      </span>
                    </td>
                    <td>{effectiveFrom}</td>
                    <td>
                      <div className="d-flex align-items-center gap-3">
                        {item.mode?.toLowerCase() === "ongoing" ? (
                          <button
                            type="button"
                            className="action-btn edit-btn"
                            onClick={() => {
                              setEditingLunchBlock(item);
                              setShowEditModal(true);
                            }}
                            style={{ background: 'transparent', border: 'none', padding: 0 }}
                            title="Edit lunch break"
                          >
                            <img alt="Edit" src="/images/Edit-icon.svg" />
                          </button>
                        ) : (
                          <div style={{ width: "20px", height: "20px" }} />
                        )}
                        <button
                          type="button"
                          className="action-btn delete-btn"
                          onClick={() => {
                            setDeleteTarget(item.id);
                            setShowDeleteModal(true);
                          }}
                          style={{ background: 'transparent', border: 'none', padding: 0 }}
                          title="Delete lunch break"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 16" width="16" height="16">
                            <path fill="#E32C1F" fillRule="evenodd" d="M13.215 2.932c.292 0 .535.242.535.55v.286c0 .3-.243.55-.535.55H.785a.547.547 0 0 1-.535-.55v-.285c0-.309.243-.55.535-.55h2.187c.444 0 .831-.317.93-.762l.115-.512C4.195.963 4.781.5 5.451.5H8.55a1.49 1.49 0 0 1 1.426 1.123l.123.547a.96.96 0 0 0 .93.762h2.187Zm-1.11 10.418c.228-2.127.627-7.182.627-7.233a.559.559 0 0 0-.135-.419.544.544 0 0 0-.393-.175H1.801a.53.53 0 0 0-.392.175.593.593 0 0 0-.143.419l.04.485c.106 1.322.403 5.006.595 6.748.135 1.284.978 2.091 2.198 2.12.942.022 1.912.03 2.904.03.934 0 1.883-.008 2.854-.03 1.263-.021 2.104-.814 2.247-2.12Z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      <DeleteModal
        show={showDeleteModal}
        disabled={deletingLunch}
        messageBody={
          <>
            {t("Are you sure you want to delete this lunch block?") || "Are you sure you want to delete this lunch block?"}
          </>
        }
        handleClose={() => {
          setShowDeleteModal(false);
          setDeleteTarget(null);
        }}
        handleConfirmDelete={() => handleDeleteLunchBlock(deleteTarget)}
      />

      {/* Edit Lunch Block Modal */}
      <Modal
        show={showEditModal}
        onHide={() => {
          setShowEditModal(false);
          setEditingLunchBlock(null);
        }}
        centered
        className="sitback-modal-wrapper edit-lunch-block-modal"
      >
        <Modal.Header closeButton className="red-close-icon" onClick={() => {
          setShowEditModal(false);
          setEditingLunchBlock(null);
        }}>
          <Modal.Title className="modal-title-text">
            Edit Lunch Block
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleUpdateLunchBlock} className="edit-lunch-form">
            <div className="form-group-item">
              <label>Repeat On</label>
              <div className="repeat-days-chips">
                {WEEK_DAYS.map((day) => {
                  const isSelected = editSelectedDays.includes(day.value);
                  console.log("day", day.value);
                  console.log("editSelectedDays", editSelectedDays);
                  return (
                    <button
                      key={day.value}
                      type="button"
                      className={`repeat-day-chip ${isSelected ? "active" : ""}`}
                      onClick={() => {
                        if (isSelected) {
                          setEditSelectedDays(editSelectedDays.filter((d) => d !== day.value));
                        } else {
                          setEditSelectedDays([...editSelectedDays, day.value]);
                        }
                      }}
                    >
                      {isSelected && <span className="check-left">✓</span>}
                      <span className="day-text">{day.label}</span>

                    </button>
                  );
                })}
              </div>
            </div>

            <div className="form-group-item">
              <label>Date</label>
              <div className="react-datetime-picker">
                <ReactDatePicker
                  key={editDate || "empty"}
                  placeholderText="YYYY-MM-DD"
                  className="form-control"
                  selected={editDate ? moment(editDate).toDate() : null}
                  onChange={(date) => {
                    if (date) {
                      setEditDate(moment(date).format("YYYY-MM-DD"));
                    } else {
                      setEditDate("");
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

            <div className="form-grid-2">
              <div className="form-group-item">
                <label>Start</label>
                <DateTime
                  dateFormat={false}
                  timeFormat="hh:mm A"
                  closeOnSelect={true}
                  value={editStart}
                  onChange={(time) => {
                    if (time) {
                      setEditStart(moment(time).format("hh:mm A"));
                    }
                  }}
                  inputProps={{
                    className: "form-control"
                  }}
                />
              </div>

              <div className="form-group-item">
                <label>End</label>
                <DateTime
                  dateFormat={false}
                  timeFormat="hh:mm A"
                  closeOnSelect={true}
                  value={editEnd}
                  onChange={(time) => {
                    if (time) {
                      setEditEnd(moment(time).format("hh:mm A"));
                    }
                  }}
                  inputProps={{
                    className: "form-control"
                  }}
                />
              </div>
            </div>

            <div className="d-flex justify-content-end gap-3 mt-4">
              <button
                type="button"
                className="btn btn-outline-secondary cancel-modal-btn"
                onClick={() => {
                  setShowEditModal(false);
                  setEditingLunchBlock(null);
                }}
                style={{ borderRadius: '100px', minWidth: '120px', height: '48px', fontWeight: '600' }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary submit-modal-btn"
                disabled={addingLunch}
                style={{ background: '#295086', borderColor: '#295086', borderRadius: '100px', minWidth: '140px', height: '48px', fontWeight: '600' }}
              >
                {addingLunch ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
