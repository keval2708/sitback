import moment from "moment";
import { useEffect, useState } from "react";
// import { Spinner } from "react-bootstrap";
import ReactDatePicker from "react-datepicker";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { default as ReactSelect, components } from "react-select";
import InlineSVG from "svg-inline-react";
import AddAppointmentsModal from "../models/AddAppointmentsModal";
import DeleteModal from "@/components/shared/modal/DeleteModal";
import Loader from "@/components/shared/spinner/loader";
import { useToaster } from "@/hooks";
import { serviceSliceSelector } from "@/redux/service";
import { API_ROUTER } from "@/services/apiRouter";
import { FormGroup, Label } from "@/styles/global/main.style";
import { addmore_icon, delete_icon } from "@/styles/svgs";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";

export const Appointments = () => {
  // state
  const [smShow, setSmShow] = useState(false);
  const [optionSelected, setOptionSelected] = useState(null);
  const [serviceData, setServiceData] = useState([]);
  const [date, setDate] = useState(new Date());
  const [error, setError] = useState({ dateValidate: null, serviceValidate: null });
  const [timeSlot, setTimeSlot] = useState([]);
  const [loading, setLoading] = useState(false);

  //delete model
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  //delete modal
  const handleShowDeleteModal = (target) => {
    setDeleteTarget(target);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setDeleteTarget(null);
  };

  const handleConfirmDelete = async () => {
    if (deleteTarget) {
      await deleteTimeSlot(deleteTarget);
      handleCloseDeleteModal();
    }
  };
  // constant
  const { SingleValue, Option } = components;
  const { serviceList } = useSelector(serviceSliceSelector);

  // hooks
  const { toaster } = useToaster();
  const { t } = useTranslation();

  // useEffect
  useEffect(() => {
    // services();
    formatServiceData();
  }, [serviceList]);

  useEffect(() => {
    if (date && optionSelected) {
      getTimeSlot();
    }
  }, [date, optionSelected, smShow]);

  // methods
  const formatServiceData = async () => {
    let options = [];
    serviceList.length &&
      serviceList?.map((s) => {
        options.push({
          value: s?.id,
          label: s?.name,
          image: s?.image,
        });
      });
    setServiceData(options);
  };

  const handleChange = (selected) => {
    setOptionSelected(selected);
    setError(prevError => ({ ...prevError, serviceValidate: null }));

  };

  const IconSingleValue = (props) => (
    <SingleValue {...props}>
      <img src={props.data.image} style={{ height: "30px", width: "30px" }} alt="img-tag" />
      {props.data.label}
    </SingleValue>
  );

  const IconOption = (props) => (
    <Option {...props}>
      <img src={props.data.image} style={{ height: "30px", width: "30px" }} alt="img-tag" />
      {props.data.label}
    </Option>
  );

  const getTimeSlot = async () => {
    try {
      const slotData = {
        date: moment(date).format("yyyy-MM-DD"),
        serviceid: optionSelected?.value,
      };
      const res = await axiosApiCall.post(API_ROUTER?.SLOT_LIST, slotData);
      if (!res?.status) {
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        setTimeSlot(res.data.data);
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  };

  const deleteTimeSlot = async (timeslotId) => {
    try {
      setLoading(true);

      const dltData = {
        slotid: timeslotId.id,
      };
      const res = await axiosApiCall.post(API_ROUTER?.DELETE_SLOT, dltData);
      if (!res?.status) {
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        toaster(res?.data?.message, TOAST_TYPES.SUCCESS);
        getTimeSlot();
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setLoading(false);
    }
  };

  const openModel = () => {
    let hasError = false;
    const clonedError = { ...error };

    if (!date) {
      clonedError.dateValidate = t('selectdate');
      hasError = true;
    } else {
      clonedError.dateValidate = null;
    }

    if (!optionSelected) {
      clonedError.serviceValidate = t('pleseselectservice')

      hasError = true;
    } else {
      clonedError.serviceValidate = null;
    }
    setError(clonedError);

    if (!hasError) {
      setSmShow(true);
    }
  };

  return (
    <div className="appointments-detail-wrapper">
      <Loader loading={loading} />

      <FormGroup controlId="formBasicEmail">
        <Label htmlFor="dob">{t('picktdate')}</Label>
        <ReactDatePicker
          className="datepicker-input"
          dateFormat="MMMM,dd,yyyy"
          selected={date}
          minDate={new Date()}
          onChange={(date) => setDate(date)}
        />
        <p className="text-danger">{error.dateValidate}</p>
      </FormGroup>

      <FormGroup controlId="formBasicEmail">
        <Label>{t('selectservice')}</Label>
        <ReactSelect
          className="sitback-select2-container input-with-icon"
          classNamePrefix="sitback-select-option"
          placeholder="Select service"
          options={serviceData}
          closeMenuOnSelect={true}
          hideSelectedOptions={false}
          components={{
            SingleValue: IconSingleValue,
            Option: IconOption,
          }}
          isSearchable={true}
          onChange={handleChange}
          allowSelectAll={true}
          value={optionSelected}
        />
        <p className="text-danger">{error.serviceValidate}</p>
      </FormGroup>

      <div className="timelist-wrapper">
        <ul className="time-booked-list timelist-btn">
          {timeSlot.length > 0 &&
            timeSlot?.map((time) => (
              <li key={time?.id}>
                <p>
                  {moment(time.slot_time, "HH:mm:ss").format("HH:mm")}{" "}
                  {time?.time_type.toUpperCase()}{" "}
                </p>
                <div>
                  <span className="slot-count"> {time?.slotcount} </span>
                </div>
                <InlineSVG
                  src={delete_icon}
                  className="global_laguage_icon"
                  onClick={() => handleShowDeleteModal(time)}
                />
              </li>
            ))}
        </ul>
        <ul className="time-booked-list added-more">
          <li className="add-time-btn" onClick={() => openModel()}>
            <InlineSVG src={addmore_icon} className="global_laguage_icon" />
            <p>{t('addopenslot')}</p>
          </li>
        </ul>
      </div>
      <DeleteModal
        show={showDeleteModal}
        disabled={loading}
        messageBody={
          <>
            {t('deleteAppointment')}
          </>
        }
        handleClose={handleCloseDeleteModal}
        handleConfirmDelete={handleConfirmDelete}
      />
      {/* Add appointments model */}

      <AddAppointmentsModal
        show={smShow}
        date={moment(date).format("yyyy-MM-DD")}
        serviceData={serviceData}
        onHide={() => setSmShow(false)}
        onConfirm={() => setSmShow(false)}
        selectedService={optionSelected}
      />
    </div>
  );
};
