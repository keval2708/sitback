import { yupResolver } from "@hookform/resolvers/yup";
import moment from "moment";
import TimePicker from 'rc-time-picker';
import { memo, useEffect, useMemo, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { default as ReactSelect, components } from "react-select";
import * as yup from "yup";
import LoadingButton from "@/components/shared/button/LoadingButton";
import CustomModal from "@/components/shared/modal";
import { useToaster } from "@/hooks";
import { API_ROUTER } from "@/services/apiRouter";

import {
  Button,
  FormGroup,
  Input,
  Label,
  SitBackModalBodyWrapper,
} from '@/styles/global/main.style';
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";

const AddAppointmentsModal = ({
  serviceData,
  show,
  date,
  onHide = () => { },
  onConfirm = () => { },
  selectedService
}) => {

  // constant
  const { SingleValue, Option } = components;
  const format = 'h:mm a';
  const now = moment().hour(0).minute(0);

  // state
  const [optionSelected, setOptionSelected] = useState(selectedService);
  const [timeSelection, setTimeSelection] = useState("pm")
  const [time, setTime] = useState(now.format(format).split(" ")[0]);
  // const [error, setError] = useState({ ServiceValidate: null, StaffValidate: null, TimeValidate: null });
  const [loading, setLoading] = useState(false);
  // hooks
  const { toaster } = useToaster();
  const { t } = useTranslation();

  // useEffect
  useEffect(() => {
    // services();
    onConfirm();
  }, []);

  useEffect(() => {
    if (selectedService) {
      setOptionSelected(selectedService)
    }
  }, [selectedService])

  // methods
  const cancel = async () => {
    resetState();
    onHide();
  }

  const resetState = () => {
    setOptionSelected(optionSelected);
    reset(defaultValues);
    setValue('staff', 0);
  };
  const handleChange = (selected) => {
    setOptionSelected(selected);
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

  // Form Config
  const defaultValues = useMemo(
    () => ({
      staff: 0,
    }),
    []
  );

  // validation
  const formSchema = yup
    .object()
    .shape({
      staff: yup
        .number()
        .typeError(t('appointmentModalValidation'))
        .integer(t('appointmentModalValidation1'))
        .min(1, t('appointmentModalValidation2'))
        .max(15, t('appointmentModalValidation3'))
        .required(t('appointmentModalValidation4')),
    }).transform((originalValue) => {
      // Transform null to 0
      return originalValue === null ? 0 : originalValue;
    });

  // Hooks
  const methods = useForm({
    resolver: yupResolver(formSchema),
    defaultValues,
  });

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = methods;

  const onSubmitForm = (formData) => {

    try {
      onSubmit(formData);
    } catch (error) {
    }
  };

  const onSubmit = async (formData) => {
    if (formData.staff === null) {
      formData.staff = 0;
    }
    let addSlotData = {
      servicelist_id: optionSelected?.value,
      date: date,
      staff_count: formData.staff,
      slot_time: time,
      time_type: timeSelection
    }

    try {
      setLoading(true);
      const res = await axiosApiCall.post(API_ROUTER?.ADD_SLOT, addSlotData);
      if (!res?.status) {
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        toaster(res?.data?.message, TOAST_TYPES.SUCCESS);
        cancel();
        reset(defaultValues);
        resetState();

        // onConfirm();
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setLoading(false);
    }
  };

  function onChange(value) {
    setTime(value?.format(format)?.split(" ")[0])
    setTimeSelection(value?.format(format)?.split(" ")[1])
  }

  return (
    <CustomModal
      show={show}
      onHide={() => onHide}
      aria-labelledby="example-modal-sizes-title-sm"
      centered
      className="sitback-modal-wrapper"
    >
      <Modal.Body>
        <SitBackModalBodyWrapper>
          <h3 className="modal-title-text">{t('addappointmenttimeslots')}</h3>
          <Form onSubmit={handleSubmit(onSubmitForm)}>
            <FormGroup controlId="formBasicEmail">
              <Label>{t('selectservice')}</Label>
              <ReactSelect
                className="sitback-select2-container input-with-icon"
                classNamePrefix="sitback-select-option"
                placeholder={t('selectservice')}
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
            </FormGroup>
            <FormGroup controlId="formBasicEmail">
              <Label>{t('availablestaffforselectedservice')}</Label>
              <Input type="number" placeholder="staff"  {...register("staff")} />
              <p className="text-danger">{errors?.staff?.message}</p>
            </FormGroup>
            <div className="sitback-selecttitme-wrapper">
              <h5>{t('selecttime')}</h5>
              <TimePicker
                showSecond={false}
                defaultValue={now}
                className="time-addinput-wrapper"
                onChange={onChange}
                format={format}
                use12Hours
                inputReadOnly
                disabledHours={() => {
                  const currentHour = moment().hour();
                  if (date == moment().format("yyyy-MM-DD")) {
                    return Array.from({ length: currentHour }, (_, i) => i);
                  }
                }}
                disabledMinutes={(selectedHour) => {
                  const currentHour = moment().hour();
                  const currentMinute = moment().minute();
                  if (selectedHour === currentHour) {
                    if (date == moment().format("yyyy-MM-DD")) {
                      return Array.from({ length: currentMinute }, (_, i) => i);
                    }
                  }
                  return [];
                }}
              />
            </div>
            <div className="modal-footer-div">
              {/* <Button variant="primary" type="submit" onClick={onConfirm}> */}
              <LoadingButton
                type="submit"
                disabled={loading}
                label={t('save')}
                loadinglabel={t('saving')}
                isLoading={loading}
                className="loading-btn-wrapper"
              />
              {/* <Button variant="primary" type="submit" onClick={(e) => onSubmit(e)}>
                Save
              </Button> */}
              <Button variant="primary" type="reset" isBorderBtn={true} onClick={() => cancel()}>
                {t('cancel')}
              </Button>
            </div>
          </Form>
        </SitBackModalBodyWrapper>
      </Modal.Body>
    </CustomModal>
  );
}

export default memo(AddAppointmentsModal);
