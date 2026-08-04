import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import DateTime from 'react-datetime';
import { Controller, useForm } from 'react-hook-form';
import 'react-datetime/css/react-datetime.css'; // Import the CSS
import CustomModal from '@/components/shared/modal';
import { useToaster } from '@/hooks';
import { API_ROUTER } from '@/services/apiRouter';
import { SitBackModalBodyWrapper } from '@/styles/global/main.style';
import axiosApiCall from '@/utils/axios';
import { TOAST_ALERTS, TOAST_TYPES } from '@/utils/constants';
import { getSocketId } from '@/utils/helper';

// Custom validation functions
const validateTimeFormat = (time) => {
  const regex = /^(0?[1-9]|1[0-2]):([0-5][0-9]) (AM|PM)$/;
  return regex.test(time);
};

const validateEndTimeGreaterThanStartTime = (startTime, endTime) => {
  const start = moment(startTime, 'hh:mm A');
  const end = moment(endTime, 'hh:mm A');
  return end.isAfter(start);
};

const EditableHours = ({ day, defaultStart, defaultEnd, onSave, listSpaHours }) => {
  const [editMode, setEditMode] = useState(false);  // Initialize editMode as false
  const [errors, setErrors] = useState({});
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const { toaster } = useToaster();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
  } = useForm({
    defaultValues: {
      startTime: defaultStart,
      endTime: defaultEnd,
    },
  });

  const handleSave = (data) => {
    setErrors({});

    const newErrors = {};

    if (!data.startTime || !validateTimeFormat(data.startTime)) {
      newErrors.startTime = 'Start time required';
    }

    if (!data.endTime || !validateTimeFormat(data.endTime)) {
      newErrors.endTime = 'End time required';
    }

    if (
      data.startTime &&
      data.endTime &&
      !validateEndTimeGreaterThanStartTime(data.startTime, data.endTime)
    ) {
      newErrors.endTime = 'End time must be later than start time';
    }

    if (Object.keys(newErrors).length === 0) {
      onSave(day, data);
      setEditMode(false);
    } else {
      setErrors(newErrors);
    }
  };

  const handleCloseSpa = () => {
    setShowDeleteConfirm(true);
  }

  const handleCloseConfirm = async (item) => {
    try {
      setLoading(true);
      const socketId = getSocketId();
      const res = await axiosApiCall.post(API_ROUTER.DASHBOARD_SPA_HOURS_DELETE, {
        day: item, // Use the day
        socketId: socketId,
      });

      if (!res?.status) {
        toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        toaster(res?.data?.message, TOAST_TYPES.SUCCESS);
        listSpaHours(); // Reload the list after deletion
        setShowDeleteConfirm(false);
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setEditMode(false);
    setValue('startTime', defaultStart || '');
    setValue('endTime', defaultEnd || '');
  }, [defaultStart, defaultEnd, setValue]);

  return (
    <>
      <div className="sitback-right-date-time-main-div">
        {!editMode ? (
          <div className="edit-start-end-time-div">
            <p className="start-end-time-text">{defaultStart ? <> {defaultStart} - {defaultEnd} </> : '' }</p>
            <div className="edit-remove-btn-div">
              <div className="edit-btn-div">
                <button onClick={() => setEditMode(true)} className="edit-btn-wrapper">
                  <span><img alt="sitback" src="/images/horizontal-three-dots.svg" /></span>
                </button>
              </div>
              <div className="remove-btn-div">
                {defaultStart && (
                  <button onClick={() => handleCloseSpa()} className="close-btn-wrapper">
                    <span><img alt="sitback" src="/images/closeicon.svg" /></span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit(handleSave)} className="time-select-form">
            <div className="time-select-div">
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
                        const formattedDate = moment(date).format("hh:mm A");
                        setValue("startTime", formattedDate);
                        setErrors((prevErrors) => {
                          const updatedErrors = { ...prevErrors };
                          delete updatedErrors.startTime;
                          return updatedErrors;
                        });
                      } else {
                        setValue("startTime", "");
                      }
                    }}
                  />
                )}
              />
              <span className="separator-text">to</span>
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
                        const formattedDate = moment(date).format("hh:mm A");
                        setValue("endTime", formattedDate);
                        setErrors((prevErrors) => {
                          const updatedErrors = { ...prevErrors };
                          delete updatedErrors.endTime;
                          return updatedErrors;
                        });
                      } else {
                        setValue("endTime", "");
                      }
                    }}
                  />
                )}
              />
            </div>
            <div className="time-btn-div">
              <button type="submit" className="save-btn">Save</button>
              <button
                type="button"
                onClick={() => {
                  setEditMode(false);
                  setErrors({});
                  setValue('startTime', defaultStart || '');
                  setValue('endTime', defaultEnd || '');
                }}
                className="save-btn cancel-btn"
              >
                Cancel
              </button>
            </div>
            {errors.startTime && <p className="error-text">{errors.startTime}</p>}
            {errors.endTime && <p className="error-text">{errors.endTime}</p>}
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
              >
                {loading ? "Confirming..." : "Confirm"}
              </Button>
            </div>
          </SitBackModalBodyWrapper>
        </Modal.Body>
      </CustomModal>
    </>
  );
};



export default EditableHours;
