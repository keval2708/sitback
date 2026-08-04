import { yupResolver } from "@hookform/resolvers/yup";
import { memo, useEffect, useMemo, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { default as ReactSelect, components } from "react-select";
import * as yup from "yup";
import { useToaster } from "@/hooks";
import { API_ROUTER } from "@/services/apiRouter";
import { ServiceModalWrapper, StyledServiceModal } from "@/styles/pages/profile.style";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";
import { generateHourMinute, getSocketId } from "@/utils/helper";

const CloseModalIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: '#E32C1F' }}>
    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const EditServicesModal = ({ show, onHide = () => { }, onConfirm = () => { }, serviceData, getServices }) => {
  // state
  const [optionSelected, setOptionSelected] = useState(null);
  const [loading, setLoading] = useState(false);

  // constant
  const { SingleValue, Option } = components;
  const { r_hour } = generateHourMinute();

  const hourOptions = r_hour.map((hour) => ({ value: hour, label: hour }));

  // hooks
  const { toaster } = useToaster();
  const { t } = useTranslation();

  const minute_options = [
    { value: 0, label: 0 },
    { value: 5, label: 5 },
    { value: 10, label: 10 },
    { value: 15, label: 15 },
    { value: 20, label: 20 },
    { value: 25, label: 25 },
    { value: 30, label: 30 },
    { value: 35, label: 35 },
    { value: 40, label: 40 },
    { value: 45, label: 45 },
    { value: 50, label: 50 },
    { value: 55, label: 55 },
  ];

  // Form Config
  const defaultValues = useMemo(
    () => ({
      service: {
        value: 5,
      },
      price: 0,
      hour: { value: 0, label: 0 },
      minute: { value: 0, label: 0 },
      description: "",
    }),
    []
  );

  // validation
  const formSchema = yup.object().shape({
    service: yup
      .object()
      .shape({
        value: yup.string().required(t("serviceModalValidation")),
      })
      .test("is-selected", t("serviceModalValidation"), (value) => {
        return value && value.value !== undefined;
      }),
    price: yup
      .number()
      .typeError(t("serviceModalValidation1"))
      .integer(t("serviceModalValidation2"))
      .min(10, t("serviceModalValidation3"))
      .max(2000, t("serviceModalValidation4"))
      .required(t("serviceModalValidation5")),
    hour: yup.object().shape({
      value: yup.string().required(t("serviceModalValidation6")),
    }),
    minute: yup.object().shape({
      value: yup.string().required(t("serviceModalValidation7")),
    }),
    duration: yup.string().test("notBothZero", t("serviceModalValidation8"), function () {
      const { hour, minute } = this.parent;
      const totalMinutes = parseInt(hour?.value || 0) * 60 + parseInt(minute?.value || 0);

      if (totalMinutes < 5) {
        return this.createError({
          message: "Minute Shouldn't be less than 5 min",
        });
      } else if (hour?.value == 0 && minute?.value == 0) {
        return this.createError({
          message: "Hour and Minute should not be zero",
        });
      } else {
        return true;
      }
    }),
  });

  // Hooks
  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(formSchema),
    defaultValues,
  });

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    control,
    formState: { errors },
  } = methods;

  const handleChange = (selected) => {
    setOptionSelected(selected);
    setValue("service", selected || null);
    methods.clearErrors("service");
  };

  const IconSingleValue = (props) => (
    <SingleValue {...props}>
      <img
        src={props?.data?.image}
        style={{ height: "24px", width: "24px", borderRadius: "50%", objectFit: "cover", marginRight: "8px" }}
        alt="img-tag"
      />
      {props?.data?.label}
    </SingleValue>
  );

  const IconOption = (props) => (
    <Option {...props}>
      <img
        src={props?.data?.image}
        style={{ height: "24px", width: "24px", borderRadius: "50%", objectFit: "cover", marginRight: "8px" }}
        alt="img-tag"
      />
      {props?.data?.label}
    </Option>
  );

  const onSubmitForm = (formData) => {
    try {
      onSubmit(formData);
    } catch (error) { }
  };

  useEffect(() => {
    if (serviceData) {
      setOptionSelected({
        value: serviceData.id,
        label: serviceData.name,
        image: serviceData.image,
      });
      setValue("service", { value: serviceData.id, label: serviceData.name });
      setValue("price", serviceData.price);
      setValue("description", serviceData.description);
      setValue("hour", { value: serviceData.hour, label: serviceData.hour });
      setValue("minute", { value: serviceData.minutes, label: serviceData.minutes });
    }
  }, [show]);

  const onSubmit = async (formData) => {
    const socketId = getSocketId();
    let param = {
      id: serviceData?.id,
      servicesid: serviceData?.servicesid,
      price: formData?.price,
      description: formData?.description,
      hour: formData?.hour?.value,
      minutes: formData?.minute?.value,
      socketId: socketId,
    };
    try {
      setLoading(true);
      const res = await axiosApiCall.post(API_ROUTER?.EDIT_SERVICE, param);
      if (!res?.status) {
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        toaster(res?.data?.message, TOAST_TYPES.SUCCESS);
        getServices();
        onConfirm();
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setLoading(false);
    }
  };

  const cancel = async () => {
    onHide();
  };

  return (
    <StyledServiceModal
      show={show}
      onHide={() => cancel()}
      centered
      className="sitback-modal-wrapper service-modal-custom"
    >
      <Modal.Body>
        <ServiceModalWrapper>
          <button
            type="button"
            className="close-modal-btn"
            onClick={() => cancel()}
            aria-label="close"
          >
            <CloseModalIcon />
          </button>
          <h3 className="modal-title-text">{t("eService")}</h3>
          <Form onSubmit={handleSubmit(onSubmitForm)}>
            <div className="form-group-custom">
              <ReactSelect
                className="sitback-select2-container"
                classNamePrefix="sitback-select-option"
                placeholder="Service Name"
                {...register("service")}
                closeMenuOnSelect={true}
                hideSelectedOptions={false}
                components={{
                  SingleValue: IconSingleValue,
                  Option: IconOption,
                }}
                isDisabled={true}
                isSearchable={false}
                onChange={handleChange}
                allowSelectAll={true}
                value={optionSelected}
              />
              <p className="text-danger mt-1">{errors?.service?.message}</p>
            </div>

            <div className="form-group-custom">
              <input
                type="text"
                {...register("price")}
                placeholder="Price ($)"
              />
              <p className="text-danger mt-1">{errors?.price?.message}</p>
            </div>

            <div className="form-group-custom">
              <textarea
                className={errors?.description ? "error" : ""}
                rows={5}
                {...register("description")}
                placeholder="Description"
              />
              <p className="text-danger">{errors?.description?.message}</p>
            </div>

            <div className="form-row-two">
              <div className="form-group-custom">
                <Controller
                  name="hour"
                  control={control}
                  render={({ field }) => (
                    <ReactSelect
                      className="sitback-select2-container"
                      classNamePrefix="sitback-select-option"
                      placeholder="Duration (hr)"
                      options={hourOptions}
                      menuPlacement="top"
                      minMenuHeight={250}
                      maxMenuHeight={250}
                      closeMenuOnSelect={true}
                      hideSelectedOptions={false}
                      {...field}
                      onBlur={() => trigger("duration")}
                      isSearchable={false}
                    />
                  )}
                />
              </div>
              <div className="form-group-custom">
                <Controller
                  name="minute"
                  control={control}
                  render={({ field }) => (
                    <ReactSelect
                      className="sitback-select2-container"
                      classNamePrefix="sitback-select-option"
                      placeholder="Duration (min)"
                      menuPlacement="top"
                      minMenuHeight={250}
                      maxMenuHeight={250}
                      options={minute_options}
                      closeMenuOnSelect={true}
                      hideSelectedOptions={false}
                      {...field}
                      isSearchable={false}
                      onBlur={() => trigger("duration")}
                    />
                  )}
                />
              </div>
            </div>
            <p className="text-danger mt-1">{errors?.duration?.message}</p>

            <div className="modal-buttons-row">
              <button type="button" className="cancel-btn" onClick={() => cancel()}>
                {t("cancelCaps")}
              </button>
              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? "Saving..." : t("saveCaps")}
              </button>
            </div>
          </Form>
        </ServiceModalWrapper>
      </Modal.Body>
    </StyledServiceModal>
  );
};

export default memo(EditServicesModal);
