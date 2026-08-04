
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useMemo, useState } from 'react';
import { Form, Modal } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import ReactSelect, { components } from 'react-select';
import * as yup from 'yup';
import LoadingButton from '../shared/button/LoadingButton';
import CustomModal from '@/components/shared/modal';
import { useToaster } from '@/hooks';
import { API_ROUTER } from '@/services/apiRouter';
import { Button, FormGroup, Input, Label, SitBackModalBodyWrapper } from '@/styles/global/main.style';
import axiosApiCall from '@/utils/axios';
import { SUBSCRIPTION_VALUE, TOAST_ALERTS, TOAST_TYPES } from '@/utils/constants';
import { generateHourMinute, getSocketId } from '@/utils/helper';

const ServiceSelectModal = ({ show, onSelect, onClose, UpgradeData, fetchInitialData }) => {

  // State for manual service modal
  const [showManualModal, setShowManualModal] = useState(false);

const [serviceData, setServiceData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [subscriptionData, setSubscriptionData] = useState(null);

  // constant
  const { SingleValue, Option } = components;
  const { r_hour } = generateHourMinute();

  // const [hourSelected, setHourSelected] = useState(null);
  const hourOptions = r_hour.map((hour) => ({ value: hour, label: hour }));

  // hooks
  const { toaster } = useToaster();
  const { t } = useTranslation();

 const minute_options = [
    {
      value: 0,
      label: 0,
    },
    {
      value: 5,
      label: 5,
    },
    {
      value: 10,
      label: 10,
    },
     {
      value: 15,
      label: 15,
    },
     {
      value: 20,
      label: 20,
    },
    {
      value: 25,
      label: 25,
    },
    {
      value: 30,
      label: 30,
    },
    {
      value: 35,
      label: 35,
    },
    {
      value: 40,
      label: 40,
    },
     {
      value: 45,
      label: 45,
    },
    {
      value: 50,
      label: 50,
    },
    {
      value: 55,
      label: 55,
    },
  ];

  // useEffect
  useEffect(() => {
    services();
    checkBookableService();
  }, []);

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
      service: {},
      price: null,
      hour: { value: 0, label: 0 },
      minute: { value: 0, label: 0 },
    }),
    []
  );

  // Manual modal form config
  const manualDefaultValues = useMemo(
    () => ({
      serviceName: '',
      price: null,
      hour: { value: 0, label: 0 },
      minute: { value: 0, label: 0 },
    }),
    []
  );

  // validation
  const formSchema = yup.object().shape({
    service: yup.object().shape({
      value: yup.string().required("Service is required"),
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

  // Manual modal validation
  const manualFormSchema = yup.object().shape({
    serviceName: yup.string().required("Service name is required"),
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

  // Manual modal form hook
  const manualMethods = useForm({
    mode: "onChange",
    resolver: yupResolver(manualFormSchema),
    defaultValues: manualDefaultValues,
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

  const IconSingleValue = (props) => {
    return <SingleValue {...props}>{props?.data?.label}</SingleValue>;
  };

  const IconOption = (props) => (
    <Option {...props}>
      <img src={props?.data?.image} style={{ height: "30px", width: "30px" }} alt="img-tag" />
      {props?.data?.label}
    </Option>
  );

  const onSubmitForm = (formData) => {
    try {
      onSubmit(formData);
    } catch (error) {}
  };

  // Manual modal submit
  const onManualSubmitForm = (formData) => {
    try {
      onManualSubmit(formData);
    } catch (error) {}
  };

  const onSubmit = async (formData) => {
    const socketId = getSocketId();
    if (
      subscriptionData?.totalSpaServiceCount <
      SUBSCRIPTION_VALUE[subscriptionData?.planData?.planDetails?.plan_name]
    ) {
      let data = {
        servicelist_id: formData?.service?.value,
        price: formData?.price,
        hour: formData?.hour?.value,
        minutes: formData?.minute?.value,
        socketId: socketId,
      };
      try {
        setLoading(true);
        const res = await axiosApiCall.post(API_ROUTER?.SPOTLIGHT_ADD_SERVICE, data);
        if (!res?.status) {
          return toaster(res?.message, TOAST_TYPES.ERROR);
        } else {
          fetchInitialData();
          toaster(res?.data?.message, TOAST_TYPES.SUCCESS);
          cancel();
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

  // Manual modal submit logic
  const onManualSubmit = async (formData) => {
    const socketId = getSocketId();
    if (
      subscriptionData?.totalSpaServiceCount <
      SUBSCRIPTION_VALUE[subscriptionData?.planData?.planDetails?.plan_name]
    ) {
      let data = {
        name: formData?.serviceName,
        price: formData?.price,
        hour: formData?.hour?.value,
        minutes: formData?.minute?.value,
        socketId: socketId,
      };
      try {
        setLoading(true);
        const res = await axiosApiCall.post(API_ROUTER?.SPOTLIGHT_ADD_SERVICE, data);
        if (!res?.status) {
          return toaster(res?.message, TOAST_TYPES.ERROR);
        } else {
           fetchInitialData();
          toaster(res?.data?.message, TOAST_TYPES.SUCCESS);
          cancelManual();
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

  const cancelManual = async () => {
    manualResetState();
    manualMethods.reset(manualDefaultValues);
    setShowManualModal(false);
    onClose();
  };

  const manualResetState = () => {
    manualMethods.setValue("price", null);
    manualMethods.setValue("serviceName", "");
    manualMethods.setValue("hour", 0);
    manualMethods.setValue("minute", 5);
  };

  const cancel = async () => {
    onClose();
    resetState();
    reset(defaultValues);

    // onHide();
  };

  const resetState = () => {
    // setOptionSelected([]);
    setValue("price", null);
    setValue("service", {});
    setValue("hour", 0);
    setValue("minute", 5);
    setValue("serviceName", "");
  };

  return (
    <>
      <CustomModal
        show={show}
        onHide={onClose}
        centered
        aria-labelledby="example-modal-sizes-title-sm"
        className="sitback-modal-wrapper sitback-edit-service-modal-wrapper sitback-availability-modal-wrapper sitback-select-service-dashboard-modal-wrapper sitback-video-spotlight-detail-modal"
      >
        <Modal.Body>
          <SitBackModalBodyWrapper className="sitback-edit-modal-body">
            <h3 className="video-spotlight-title-text">{t('addVideoSpotlightDetail')}</h3>
             <Form onSubmit={handleSubmit(onSubmitForm)}>
          <FormGroup controlId="formBasicEmail" isNewDashboardInsightsSitbackFormGroup={true} className="add-serice-form-group-wrapper">
            <Label isNewDashboardInsightsSitbackLabel={true}>{t('nameOfService')}</Label>
            <div className="name-service-select-div">
              <Controller
                name="service"
                control={control}
                render={({ field }) => (
                  <ReactSelect
                    className="sitback-select2-container input-with-icon"
                    classNamePrefix="sitback-select-option"
                    placeholder="Select Service"
                    options={serviceData}
                    closeMenuOnSelect={true}
                    hideSelectedOptions={false}
                    components={{
                      SingleValue: IconSingleValue,
                      Option: IconOption,
                    }}
                    {...field}
                    isSearchable={false}
                  />
                )}
              />
              <a
                href="#"
                className="add-service-link"
                onClick={e => {
                  e.preventDefault();
                  onClose();
                  setShowManualModal(true);
                }}
              >
                + {t('addNewService')}
              </a>
            </div>
            <p className="text-danger mt-1">{errors?.service?.value?.message}</p>
          </FormGroup>

          <FormGroup controlId="formBasicEmail" isNewDashboardInsightsSitbackFormGroup={true} className="video-spotlight-form-group service-price-form-group">
            <Label isNewDashboardInsightsSitbackLabel={true}>{t('servicePrice')}</Label>
            <Input className="input-service-wrapper" type="text" {...register("price")} placeholder="$" />
            <p className="text-danger mt-1">{errors?.price?.message}</p>
          </FormGroup>
          <FormGroup controlId="formBasicEmail" isNewDashboardInsightsSitbackFormGroup={true} className="video-spotlight-form-group length-service-form-group">
            <Label isNewDashboardInsightsSitbackLabel={true}>{t("lenghtofservice")}</Label>
            <div className="time-appointment-display-div add-service-time-display-div">
              <div className="time-left-div">
                <p className="time-content-text">{t("Hour")}</p>
                <Controller
                  name="hour"
                  control={control}
                  render={({ field }) => (
                    <ReactSelect
                      className="sitback-select2-container input-with-icon"
                      classNamePrefix="sitback-select-option"
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
              </div>
              <p>{t('to')}</p>
              <div className="time-minute-div">
                <p className="time-content-text">{t("minute")}</p>
                <Controller
                  name="minute"
                  control={control}
                  render={({ field }) => (
                    <ReactSelect
                      className="sitback-select2-container input-with-icon"
                      classNamePrefix="sitback-select-option"
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
              </div>
            </div>
            <p className="text-danger mt-1">{errors?.duration?.message}</p>
          </FormGroup>

          <div className="showcase-btn-div">
            <LoadingButton
              type="submit"
              disabled={loading}
              label={t('confirmChanges')}
              loadinglabel="Saving..."
              isLoading={loading}
              className="add-appointment-btn"
            />
            <Button className="cancel-btn-wrapper" variant="primary" type="reset" isBorderBtn={true} onClick={() => cancel()}>
              {t("cancelCaps")}
            </Button>
          </div>
        </Form>
          </SitBackModalBodyWrapper>
        </Modal.Body>
      </CustomModal>

      {/* Manual Service Modal */}
      <CustomModal
        show={showManualModal}
        onHide={() => {
          setShowManualModal(false);
          onClose();
        }}
        centered
        aria-labelledby="example-modal-sizes-title-sm"
        className="sitback-modal-wrapper sitback-edit-service-modal-wrapper sitback-availability-modal-wrapper sitback-select-service-dashboard-modal-wrapper sitback-video-spotlight-detail-modal"
      >
        <Modal.Body>
          <SitBackModalBodyWrapper className="sitback-edit-modal-body">
            <h3 className="video-spotlight-title-text">{t('addVideoSpotlightDetail')}</h3>
            <Form onSubmit={manualMethods.handleSubmit(onManualSubmitForm)}>
              <FormGroup controlId="formBasicEmail" isNewDashboardInsightsSitbackFormGroup={true} className="video-spotlight-form-group service-price-form-group">
                <Label isNewDashboardInsightsSitbackLabel={true}>{t('nameOfService')}</Label>
                <Input
                  className="input-service-wrapper"
                  type="text"
                  placeholder={t('enterServiceName')}
                  {...manualMethods.register("serviceName")}
                />
                <p className="text-danger mt-1">{manualMethods.formState.errors?.serviceName?.message}</p>
              </FormGroup>

              <FormGroup controlId="formBasicEmail" isNewDashboardInsightsSitbackFormGroup={true} className="video-spotlight-form-group service-price-form-group">
                <Label isNewDashboardInsightsSitbackLabel={true}>{t('servicePrice')}</Label>
                <Input className="input-service-wrapper" type="text" {...manualMethods.register("price")} placeholder="$" />
                <p className="text-danger mt-1">{manualMethods.formState.errors?.price?.message}</p>
              </FormGroup>

              <FormGroup controlId="formBasicEmail" isNewDashboardInsightsSitbackFormGroup={true} className="video-spotlight-form-group length-service-form-group">
                <Label isNewDashboardInsightsSitbackLabel={true}>{t("lenghtofservice")}</Label>
                <div className="time-appointment-display-div add-service-time-display-div">
                  <div className="time-left-div">
                    <p className="time-content-text">{t("Hour")}</p>
                    <Controller
                      name="hour"
                      control={manualMethods.control}
                      render={({ field }) => (
                        <ReactSelect
                          className="sitback-select2-container input-with-icon"
                          classNamePrefix="sitback-select-option"
                          options={hourOptions}
                          menuPlacement="top"
                          minMenuHeight={250}
                          maxMenuHeight={250}
                          closeMenuOnSelect={true}
                          hideSelectedOptions={false}
                          {...field}
                          onBlur={() => manualMethods.trigger("duration")}
                          isSearchable={true}
                        />
                      )}
                    />
                  </div>
                  <p>{t('to')}</p>
                  <div className="time-minute-div">
                    <p className="time-content-text">{t("minute")}</p>
                    <Controller
                      name="minute"
                      control={manualMethods.control}
                      render={({ field }) => (
                        <ReactSelect
                          className="sitback-select2-container input-with-icon"
                          classNamePrefix="sitback-select-option"
                          menuPlacement="top"
                          minMenuHeight={250}
                          maxMenuHeight={250}
                          options={minute_options}
                          closeMenuOnSelect={true}
                          hideSelectedOptions={false}
                          {...field}
                          onBlur={() => manualMethods.trigger("duration")}
                          isSearchable={false}
                        />
                      )}
                    />
                  </div>
                </div>
                <p className="text-danger mt-1">{manualMethods.formState.errors?.duration?.message}</p>
              </FormGroup>

              <div className="showcase-btn-div">
                <LoadingButton
                  type="submit"
                  disabled={loading}
                  label={t('confirmChanges')}
                  loadinglabel="Saving..."
                  isLoading={loading}
                  className="add-appointment-btn"
                />
                <Button className="cancel-btn-wrapper" variant="primary" type="reset" isBorderBtn={true} onClick={() => {
                  setShowManualModal(false);
                  cancelManual()
                }}>
                  {t("cancelCaps")}
                </Button>
              </div>
            </Form>
          </SitBackModalBodyWrapper>
        </Modal.Body>
      </CustomModal>
    </>
  )
};

export default ServiceSelectModal;
