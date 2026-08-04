import { useRouter } from "next/navigation";
import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import EditableHours from './EditableHours';
import { useToaster } from '@/hooks';
import { PATH_DASHBOARD } from '@/routes/paths';
import { API_ROUTER } from '@/services/apiRouter';
import axiosApiCall from '@/utils/axios';
import { TOAST_ALERTS, TOAST_TYPES } from '@/utils/constants';
import { getSocketId } from "@/utils/helper";

export const Hours = () => {

   // hooks
  const { toaster } = useToaster();
  const { t } = useTranslation();
  const { push } = useRouter();

  const [loading, setLoading] = useState(false);
  const [spaWorkingHours, setSpaWorkingHours] = useState([]);
  const [checkBankDetailModal, setCheckBankDetailModal] = useState(false);


  const checkUserSubscription = async () => {
      try {
        const res = await axiosApiCall.get(API_ROUTER?.CHECK_SUBSCRIPTION);
        if (res) {
          return res?.data?.status;
        }
      } catch (error) {
        toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
      }
  };

  const listSpaHours = async () => {
    try {
      setLoading(true); // Set loading to true when API request starts
      const res = await axiosApiCall.get(API_ROUTER?.LIST_SPAHOURS);
      if (!res?.status) {
        toaster(res?.message, TOAST_TYPES.ERROR);
        setLoading(false); // Set loading to false if API call fails
      } else {
        let isBankDetailsAdded  = await checkUserSubscription();
        if (isBankDetailsAdded) {
          setCheckBankDetailModal(false);
        } else {
          setCheckBankDetailModal(true);
        }
        setSpaWorkingHours(res?.data?.data);
        setLoading(false); // Set loading to false once data is fetched

      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
      setLoading(false); // Set loading to false if there's an error
    }
  };

  const handleSave = async (day, times) => {
    const socketId = getSocketId();
    let param = {
      day: day,
      start_time: times?.startTime,
      end_time: times?.endTime,
      socketId: socketId,
    };

    try {
      setLoading(true);
      const res = await axiosApiCall.post(API_ROUTER?.ADD_EDIT_SPAHOURS, param);
      if (!res?.status) {
        setLoading(false);
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        listSpaHours();
      }
    } catch (error) {
      setLoading(false);
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  };

  useEffect(() => {
    listSpaHours();
  }, []);

  useEffect(() => {
    if (window.io) {
      window.io.socket.on("serviceprovider", async (msg) => {
        if(msg?.action == "spaHoursUpdate") {
          listSpaHours();
        }
      });
    }
  }, [window.io]);

   const goToPage = async () => {
    // dispatch(tabHandle("second"));
    // dispatch(handleBank(true));
    push(PATH_DASHBOARD?.subscriptions);
  };

  console.log("spaWorkingHours",spaWorkingHours);

  return (
    <div className="hours-main-display-div">
      {loading ? (
        // <Loader loading={loading} />
        <div className="appointment-submit-main-div">
            <div className="sitback-main-loader-wrapper">
              <div className="spinner-border text-info" role="status">
              </div>
            </div>
        </div>
      ) : (
        spaWorkingHours?.map(({ day, start_time, end_time }) => (
          <div key={day} className="sitback-hours-detail-div">
            <h5 className="hours-day-text">{day}</h5>
            <EditableHours
              day={day}
              defaultStart={start_time}
              defaultEnd={end_time}
              onSave={handleSave}
              listSpaHours={listSpaHours}
              mode={false} // Pass `false` for edit mode to start with non-edit mode
            />
          </div>
        ))
      )}
      <Modal
        show={checkBankDetailModal}
        aria-labelledby="example-modal-sizes-title-lg"
        centered
        className="sitback-modal-wrapper warning-modal-wrapper"
      >
        <Modal.Body>
          <div className="sitback-request-modal-wrapper">
            <h5>{t('warning')}</h5>
            <p>Unlock SPA dashboard features by purchasing a subscription plan.</p>
            <span onClick={() => goToPage()}>Purchase Subscription </span>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};
