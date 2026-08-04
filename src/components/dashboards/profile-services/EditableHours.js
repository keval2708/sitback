import styled from '@emotion/styled';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import DateTime from 'react-datetime';
import { Controller, useForm } from 'react-hook-form';
import Switch from "react-switch";
import CustomModal from '@/components/shared/modal';
import { useToaster } from '@/hooks';
import { API_ROUTER } from '@/services/apiRouter';
import { SitBackModalBodyWrapper } from '@/styles/global/main.style';
import axiosApiCall from '@/utils/axios';
import { TOAST_ALERTS, TOAST_TYPES } from '@/utils/constants';
import { getSocketId } from '@/utils/helper';

import 'react-datetime/css/react-datetime.css';

// Custom validation functions (exported for bulk "set all days" flow in Hours.js)
export const validateTimeFormat = (time) => {
  const regex = /^(0?[1-9]|1[0-2]):([0-5][0-9]) (AM|PM)$/;
  return regex.test(time);
};

export const validateEndTimeGreaterThanStartTime = (startTime, endTime) => {
  const start = moment(startTime, 'hh:mm A');
  const end = moment(endTime, 'hh:mm A');
  return end.isAfter(start);
};

const EditableHours = ({ day, formattedDate, dayDate, defaultStart, defaultEnd, onSave, listSpaHours, isOpen = false, onStatusChange, source, holiday, isPartialLeave }) => {
  const [editMode, setEditMode] = useState(false);
  const [, setErrors] = useState({});
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(isPartialLeave ? true : isOpen);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const { toaster } = useToaster();
  const [loading, setLoading] = useState(false);

  // States for choice modal
  const [showChoiceModal, setShowChoiceModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState('repeating');
  const [tempSaveData, setTempSaveData] = useState(null);

  const {
    control,
    handleSubmit,
    setValue,
  } = useForm({
    defaultValues: {
      startTime: defaultStart,
      endTime: defaultEnd,
      trackStockStatus: isPartialLeave ? true : isOpen,
    },
  });

  // Update form when props change
  useEffect(() => {
    const status = isPartialLeave ? true : isOpen;
    setIsStatusOpen(status);
    setValue('trackStockStatus', status);
    setValue('startTime', defaultStart || '');
    setValue('endTime', defaultEnd || '');
  }, [isOpen, isPartialLeave, setValue, defaultStart, defaultEnd]);

  const handleSave = (data) => {
    console.log("data", data)
    setErrors({});

    const newErrors = {};

    if (!data.startTime || !validateTimeFormat(data.startTime)) {
      newErrors.startTime = 'Start time required';
    }

    if (!data.endTime || !validateTimeFormat(data.endTime)) {
      newErrors.endTime = 'End time required';
    }

    const isToday = dayDate ? dayDate.isSame(moment(), 'day') : false;
    if (isToday && data.startTime && validateTimeFormat(data.startTime)) {
      const selectedStartMoment = moment(`${dayDate.format('YYYY-MM-DD')} ${data.startTime}`, 'YYYY-MM-DD hh:mm A');
      if (selectedStartMoment.isBefore(moment())) {
        newErrors.startTime = 'Start time cannot be in the past for today';
      }
    }

    if (
      data.startTime &&
      data.endTime &&
      !validateEndTimeGreaterThanStartTime(data.startTime, data.endTime)
    ) {
      newErrors.endTime = 'End time must be later than start time';
    }

    if (Object.keys(newErrors).length === 0) {
      setTempSaveData(data);
      setShowChoiceModal(true);
    } else {
      setErrors(newErrors);
      const firstError = Object.values(newErrors)[0];
      toaster(firstError, TOAST_TYPES.ERROR);
    }
  };

  const handleChoiceSubmit = () => {
    if (tempSaveData) {
      const formattedDateStr = dayDate ? dayDate.format("YYYY-MM-DD") : moment().format("YYYY-MM-DD");
      onSave(day, tempSaveData, selectedOption, formattedDateStr);
      setEditMode(false);
      setShowChoiceModal(false);
      setTempSaveData(null);
    }
  };


  const handleCloseConfirm = async (item) => {
    try {
      setLoading(true);
      const socketId = getSocketId();
      const res = await axiosApiCall.post(API_ROUTER.SPA_HOURS_DELETE_SERVICE_PROVIDER, {
        day: item,
        socketId: socketId,
      });

      if (!res?.status) {
        toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        toaster(res?.data?.message, TOAST_TYPES.SUCCESS);
        listSpaHours();
        setShowDeleteConfirm(false);
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setLoading(false);
    }
  }

  const handleStatusToggle = async (checked) => {
    setIsUpdatingStatus(true);

    try {
      // Update local state immediately for responsive UI
      setIsStatusOpen(checked);
      setValue('trackStockStatus', checked);

      // Call API to update status
      // const socketId = getSocketId();
      const res = await axiosApiCall.post(API_ROUTER?.UPDATE_SPA_SCHEDULE, {
        day: day,
      });

      if (!res?.status) {
        // Revert on error
        setIsStatusOpen(!checked);
        setValue('trackStockStatus', !checked);
        toaster(res?.message || 'Failed to update status', TOAST_TYPES.ERROR);
      } else {
        toaster(res?.data?.message || `Day marked as ${checked ? 'Open' : 'Closed'}`, TOAST_TYPES.SUCCESS);
        // Call parent callback if provided
        if (onStatusChange) {
          onStatusChange(day, checked);
        }
      }
    } catch (error) {
      // Revert on error
      setIsStatusOpen(!checked);
      setValue('trackStockStatus', !checked);
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const isPast = dayDate ? dayDate.isBefore(moment(), 'day') : false;

  return (
    <div className="sitback-hours-detail-div">
      {/* Column 1: Day & Date stacked */}
      <div className="hours-day-date-col">
        <h5 className="hours-day-name">{day}</h5>
        <span className="hours-date-label">{formattedDate}</span>
      </div>

      {/* Column 2: Switch toggle */}
      <div className="hours-toggle-col">
        <Controller
          name="trackStockStatus"
          control={control}
          render={({ field }) => (
            <Switch
              {...field}
              onChange={handleStatusToggle}
              checked={field.value}
              disabled={isUpdatingStatus || source === 'holiday' || isPartialLeave || holiday}
              offColor="#C5CAD3"
              onColor="#295086"
              uncheckedIcon={false}
              checkedIcon={false}
              height={20}
              width={40}
              handleDiameter={16}
            />
          )}
        />
      </div>

      {/* Column 3: The blue-gray bar with times/edit state */}
      <div className="hours-bar-col">
        {!editMode ? (
          <>
            <p className={`hours-time-range-text ${!isStatusOpen ? 'closed' : ''}`}>
              {(source === 'holiday' || isPartialLeave || holiday) ? (
                <>
                  {isPartialLeave ? <span>{holiday?.holidayName || 'Holiday'}: </span> : <span>{holiday?.holidayName || 'Holiday'} </span>}
                  {isStatusOpen ? (defaultStart ? `${defaultStart} - ${defaultEnd}` : 'Open') : ''}
                </>
              ) : (
                isStatusOpen ? (defaultStart ? `${defaultStart} - ${defaultEnd}` : '') : 'closed'
              )}
            </p>
            {source !== 'holiday' && !isPartialLeave && !holiday && !isPast && (
              <button onClick={() => setEditMode(true)} className="hours-edit-icon-btn">
                {/* Render pencil icon SVG */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path fill="#4D6B93" fillRule="evenodd" d="m5.032 13.02 6.59-8.52c.358-.46.486-.992.366-1.533-.103-.492-.406-.96-.86-1.314L10.023.774C9.06.008 7.866.09 7.182.968l-.741.96a.284.284 0 0 0 .048.394l1.91 1.532c.127.121.223.282.247.476a.709.709 0 0 1-.613.782.635.635 0 0 1-.486-.137L5.581 3.41a.235.235 0 0 0-.318.04L.591 9.498a1.6 1.6 0 0 0-.302 1.346l.597 2.588a.3.3 0 0 0 .294.234l2.627-.032a1.578 1.578 0 0 0 1.225-.613Zm3.678-.805h4.282c.418 0 .758.344.758.768 0 .423-.34.767-.758.767H8.71a.763.763 0 0 1-.758-.768c0-.423.34-.767.758-.767Z" clipRule="evenodd" />
                </svg>
              </button>
            )}
          </>
        ) : (
          <form onSubmit={handleSubmit(handleSave)} className="hours-inline-edit-form">
            <div className="hours-time-picker-wrap">
              <Controller
                control={control}
                name="startTime"
                render={({ field }) => (
                  <DateTime
                    {...field}
                    timeFormat="hh:mm A"
                    dateFormat={false}
                    closeOnSelect={true}
                    focusOnOpen={false}
                    inputProps={{ disabled: false }}
                    value={field.value || defaultStart}
                    onChange={(date) => {
                      if (date) {
                        const formatted = moment(date).format("hh:mm A");
                        setValue("startTime", formatted);
                        setErrors((prev) => {
                          const copy = { ...prev };
                          delete copy.startTime;
                          return copy;
                        });
                      } else {
                        setValue("startTime", "");
                      }
                    }}
                  />
                )}
              />
              <span className="hours-to-separator">to</span>
              <Controller
                control={control}
                name="endTime"
                render={({ field }) => (
                  <DateTime
                    {...field}
                    timeFormat="hh:mm A"
                    dateFormat={false}
                    closeOnSelect={true}
                    focusOnOpen={false}
                    inputProps={{ disabled: false }}
                    value={field.value || defaultEnd}
                    onChange={(date) => {
                      if (date) {
                        const formatted = moment(date).format("hh:mm A");
                        setValue("endTime", formatted);
                        setErrors((prev) => {
                          const copy = { ...prev };
                          delete copy.endTime;
                          return copy;
                        });
                      } else {
                        setValue("endTime", "");
                      }
                    }}
                  />
                )}
              />
            </div>

            <div className="hours-edit-actions">
              <button type="submit" className="cancel-btn" title="Save">
                <img alt="sitback" src="/images/list-right-mark.svg" />
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditMode(false);
                  setErrors({});
                  setValue('startTime', defaultStart || '');
                  setValue('endTime', defaultEnd || '');
                }}
                className="cancel-btn"
                title="Cancel"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 9 9" style={{ width: '10px', height: '10px' }}>
                  <path d="M0.478 0.478c.152-.152.359-.238.574-.238c.216 0 .422.086.575.238L4.5 3.351L7.373.478c.153-.148.358-.23.571-.228c.213.002.417.087.568.238c.15.15.236.354.238.567c.002.213-.08.418-.228.571L5.649 4.5l2.873 2.873c.148.153.23.358.228.571c-.002.213-.087.417-.238.568c-.15.15-.354.236-.567.238c-.213.002-.418-.08-.571-.228L4.5 5.649L1.627 8.522c-.153.148-.358.23-.571.228a.8.8 0 0 1-.568-.238a.8.8 0 0 1-.238-.567c-.002-.213.08-.418.228-.571L3.351 4.5L.478 1.627A.8.8 0 0 1 .24.575C.24.36.326.153.478.001v.477Z" fill="currentColor" />
                </svg>
              </button>
            </div>
          </form>
        )}
      </div>

      <CustomModal
        show={showDeleteConfirm}
        onHide={() => setShowDeleteConfirm(false)}
        aria-labelledby="delete-confirmation-modal"
        centered
        className="confirmation-modal-wrapper sitback-delete-modal-wrapper"
      >
        <Modal.Body>
          <SitBackModalBodyWrapper className="sitback-delete-modal-body-wrapper">
            <h5 className="delete-modal-title-wrapper">Are you sure you want to close {day}?</h5>

            <div className="confirmation-buttons delete-confirmation-btn">
              <Button
                variant="secondary"
                onClick={() => setShowDeleteConfirm(false)}
                className="confirm-btn cancel-btn"
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                onClick={() => handleCloseConfirm(day)}
                className="confirm-btn"
                disabled={loading}
                style={{ background: "#29508D" }}
              >
                {loading ? "Confirming..." : "Confirm"}
              </Button>
            </div>
          </SitBackModalBodyWrapper>
        </Modal.Body>
      </CustomModal>

      <CustomModal
        show={showChoiceModal}
        onHide={() => setShowChoiceModal(false)}
        centered
        className="sitback-modal-wrapper"
      >
        <Modal.Body style={{ padding: 0 }}>
          <ChoiceModalWrapper>
            <button
              type="button"
              className="close-modal-btn"
              onClick={() => setShowChoiceModal(false)}
              aria-label="close"
            >
              <CloseModalIcon />
            </button>
            <h3 className="modal-title-text">What Would You Like To Edit?</h3>

            <div className="choice-list">
              <div
                className={`choice-card ${selectedOption === 'repeating' ? 'active' : ''}`}
                onClick={() => setSelectedOption('repeating')}
              >
                <div className="radio-input">
                  <div className="radio-inner" />
                </div>
                <div className="choice-text-wrap">
                  <span className="choice-title">Repeating Shifts</span>
                  <span className="choice-subtitle">
                    All {day}s beginning with {dayDate ? dayDate.format("MMMM D, YYYY") : ''}
                  </span>
                </div>
              </div>

              <div
                className={`choice-card ${selectedOption === 'day_only' ? 'active' : ''}`}
                onClick={() => setSelectedOption('day_only')}
              >
                <div className="radio-input">
                  <div className="radio-inner" />
                </div>
                <div className="choice-text-wrap">
                  <span className="choice-title">This Day Only</span>
                  <span className="choice-subtitle">
                    Only {dayDate ? dayDate.format("MMMM D, YYYY") : ''}
                  </span>
                </div>
              </div>
            </div>

            <div className="modal-buttons-row">
              <button
                type="button"
                className="cancel-btn"
                onClick={() => setShowChoiceModal(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="submit-btn"
                onClick={handleChoiceSubmit}
              >
                Submit
              </button>
            </div>
          </ChoiceModalWrapper>
        </Modal.Body>
      </CustomModal>
    </div>
  );
};

const CloseModalIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: '#E32C1F' }}>
    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChoiceModalWrapper = styled.div`
  padding: 40px;
  background: #fff;
  position: relative;
  border-radius: 24px;

  .close-modal-btn {
    position: absolute;
    top: 24px;
    right: 24px;
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    z-index: 10;
    transition: opacity 0.2s;
    &:hover {
      opacity: 0.8;
    }
  }

  .modal-title-text {
    font-size: 22px;
    font-weight: 700;
    color: #295086;
    text-align: center;
    margin-bottom: 28px;
  }

  .choice-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 24px;
  }

  .choice-card {
    display: flex;
    align-items: center;
    padding: 20px 24px;
    border: 1px solid #dbe7f5;
    border-radius: 16px;
    background: #fff;
    cursor: pointer;
    transition: all 0.2s ease;
    gap: 16px;

    &:hover {
      background: #f7fbff;
      border-color: #295086;
    }

    &.active {
      border-color: #295086;
      background: #f4f8fc;
      box-shadow: 0 4px 12px rgba(41, 80, 134, 0.08);
    }

    /* Custom Radio Styling */
    .radio-input {
      width: 20px;
      height: 20px;
      border: 2px solid #295086;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      transition: all 0.2s;

      .radio-inner {
        width: 10px;
        height: 10px;
        background: transparent;
        border-radius: 50%;
        transition: all 0.2s;
      }
    }

    &.active .radio-input {
      background: #fff;
      border-color: #295086;
      .radio-inner {
        background: #295086;
      }
    }

    .choice-text-wrap {
      display: flex;
      flex-direction: column;
      text-align: left;
    }

    .choice-title {
      font-size: 16px;
      font-weight: 700;
      color: #295086;
      margin-bottom: 4px;
    }

    .choice-subtitle {
      font-size: 13px;
      color: #4d6b93;
      font-weight: 400;
    }
  }

  .modal-buttons-row {
    display: flex;
    justify-content: center;
    gap: 16px;
    margin-top: 24px;

    button {
      flex: 1;
      max-width: 160px;
      padding: 12px 24px;
      border-radius: 100px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s, color 0.2s;
      outline: none;

      &.cancel-btn {
        background: #fff;
        border: 1px solid #295086;
        color: #295086;

        &:hover {
          background: #f1f4f7;
        }
      }

      &.submit-btn {
        background: #004b87;
        border: none;
        color: #fff;

        &:hover {
          background: #003660;
        }

        &:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      }
    }
  }
`;

export default EditableHours;
