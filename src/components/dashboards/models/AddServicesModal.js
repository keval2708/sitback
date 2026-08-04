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
import { SUBSCRIPTION_VALUE, TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";
import { generateHourMinute, getSocketId } from "@/utils/helper";

const CloseModalIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: '#E32C1F' }}>
    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const AddServicesModal = ({ show, onHide = () => { }, onConfirm = () => { }, getServices }) => {
  // state
  const [serviceData, setServiceData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [subscriptionData, setSubscriptionData] = useState(null);

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

  // useEffect
  useEffect(() => {
    services();
    checkBookableService();
  }, [show]);

  // methods
  const services = async () => {
    try {
      let options = [];
      const res = await axiosApiCall.get(API_ROUTER?.GET_SERVICES);
      if (!res?.status) {
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        res?.data?.data &&
          res?.data?.data?.map((s) => {
            options.push({
              value: s.id,
              label: s.name,
              image: s.image,
            });
          });
        setServiceData(options);
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  };

  const checkBookableService = async () => {
    try {

      const res = await axiosApiCall.get(API_ROUTER?.CHECK_BOOKABLE_SERVICE);
      console.log("checkBookableService",res);
      if (!res?.status) {
          return res;
        } else {
        setSubscriptionData(res?.data);
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }
  };

  // Form Config
  const defaultValues = useMemo(
    () => ({
      services: {
        value: "",
        label: "Select service",
      },
      price: null,
      hour: { value: "", label: "Select hours" },
      minute: { value: "", label: "Select minute" },
      description: "",
    }),
    []
  );

  // validation
  const formSchema = yup.object().shape({
    services: yup
          .object()
          .shape({
            value: yup.string().required("Please select service"),
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

    duration: yup.string().test("duration", "Please Select Valid Time", function () {
      const { hour, minute } = this.parent;
      if (hour?.value === "" || minute?.value === "" || hour?.value === undefined || minute?.value === undefined) {
        return true;
      }
      const totalMinutes = parseInt(hour?.value || 0) * 60 + parseInt(minute?.value || 0);

      if (totalMinutes < 5) {
        return this.createError({
          message: "Hour and Minute should not be zero",
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
    reset,
    trigger,
    control,
    formState: { errors },
  } = methods;

  const IconSingleValue = (props) => (
    <SingleValue {...props}>
      {props?.data?.image && (
        <img
          src={props?.data?.image}
          style={{ height: "24px", width: "24px", borderRadius: "50%", objectFit: "cover", marginRight: "8px" }}
          alt="img-tag"
        />
      )}
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

  const onSubmit = async (formData, shouldClose = true) => {
    const socketId = getSocketId();
    console.log("subscriptionData",subscriptionData)
    if (
      subscriptionData?.totalSpaServiceCount <
      SUBSCRIPTION_VALUE[subscriptionData?.planData?.planDetails?.plan_name]
    ) {
      let data = {
        servicesid: formData?.services?.value,
        price: formData?.price,
        description: formData?.description,
        hour: formData?.hour?.value,
        minutes: formData?.minute?.value,
        socketId: socketId,
      };
      try {
        setLoading(true);
        const res = await axiosApiCall.post(API_ROUTER?.CREATE_SERVICE, data);
        if (!res?.status) {
          return toaster(res?.message, TOAST_TYPES.ERROR);
        } else {
          toaster(res?.data?.message, TOAST_TYPES.SUCCESS);
          if (shouldClose) {
            cancel();
            onConfirm();
          } else {
            resetState();
            reset(defaultValues);
            checkBookableService();
          }
          getServices?.();
        }
      } catch (error) {
        toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
      } finally {
        setLoading(false);
      }
    } else {
      return toaster(TOAST_ALERTS.SUBSCRIPTION_ERROR, TOAST_TYPES.ERROR);
    }
  };

  const handleSaveAndAddAnother = handleSubmit((data) => onSubmit(data, false));

  const cancel = async () => {
    resetState();
    reset(defaultValues);
    onHide();
  };

  const resetState = () => {
    setValue("price", null);
    setValue("services", { value: "", label: "Select service" });
    setValue("hour", { value: "", label: "Select hours" });
    setValue("minute", { value: "", label: "Select minute" });
    setValue("description", "");
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
          <h3 className="modal-title-text">{t("addservice")}</h3>
          <Form onSubmit={handleSubmit(onSubmitForm)}>
            <div className="form-group-custom">

            <Controller
                          name="services"
                          control={control}
                          render={({ field }) => (
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


                              {...field}
                              // isMulti
                              // isSearchable={true}
                              // allowSelectAll={true}
                            />
                          )}
                        />
              <p className="text-danger mt-1">{errors?.services?.value?.message}</p>

            </div>

            <div className="form-group-custom">
              <input
                type="text"
                {...register("price")}
                placeholder="Price ($)"
              />
              <p className="text-danger mt-1">{errors?.price?.message}</p>
            </div>

            <div className="addpricemessage">
              <img src="/images/DangerCircle.svg" alt="icon" />
              <span>{t('serviceChargesText')}</span>
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
                      placeholder="Select hours"
                      options={hourOptions}
                      menuPlacement="top"
                      minMenuHeight={250}
                      maxMenuHeight={250}
                      closeMenuOnSelect={true}
                      hideSelectedOptions={false}
                      {...field}
                      onBlur={() => trigger("duration")}
                      isSearchable={true}
                    />
                  )}
                />
                <p className="text-danger mt-1">{errors?.hour?.value?.message}</p>
              </div>
              <div className="form-group-custom">
                <Controller
                  name="minute"
                  control={control}
                  render={({ field }) => (
                    <ReactSelect
                      className="sitback-select2-container"
                      classNamePrefix="sitback-select-option"
                      placeholder="Select minute"
                      menuPlacement="top"
                      minMenuHeight={250}
                      maxMenuHeight={250}
                      options={minute_options}
                      closeMenuOnSelect={true}
                      hideSelectedOptions={false}
                      {...field}
                      onBlur={() => trigger("duration")}
                      isSearchable={false}
                    />
                  )}
                />
                <p className="text-danger mt-1">{errors?.minute?.value?.message}</p>
                <p className="text-danger mt-1">{errors?.duration?.message}</p>
              </div>
            </div>


            <div className="modal-buttons-row">
              <button
                type="button"
                className="cancel-btn"
                disabled={loading}
                onClick={handleSaveAndAddAnother}
              >
                Save and Add Another
              </button>
              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? "Saving..." : t("save")}
              </button>
            </div>
          </Form>
        </ServiceModalWrapper>
      </Modal.Body>
    </StyledServiceModal>
  );
};

export default memo(AddServicesModal);
