import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useMemo, useState } from "react";
import { Form } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { default as ReactSelect, components } from "react-select";
import * as yup from "yup";
import LoadingButton from "@/components/shared/button/LoadingButton";
import { useToaster } from "@/hooks";
import { API_ROUTER } from "@/services/apiRouter";
import {
  Button,
  FormGroup,
  Input,
  Label,
} from "@/styles/global/main.style";
import {
  AddServiceDetailDiv,
} from '@/styles/pages/insights.style';
import axiosApiCall from "@/utils/axios";
import { SUBSCRIPTION_VALUE, TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";
import { generateHourMinute } from "@/utils/helper";

  export const Addservices = () => {
  // state
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

  const onSubmit = async (formData) => {

    if (
      subscriptionData?.totalSpaServiceCount <
      SUBSCRIPTION_VALUE[subscriptionData?.planData?.planDetails?.plan_name]
    ) {
      let data = {
        servicesid: formData?.service?.value,
        price: formData?.price,
        hour: formData?.hour?.value,
        minutes: formData?.minute?.value,
      };
      try {
        setLoading(true);
        const res = await axiosApiCall.post(API_ROUTER?.CREATE_SERVICE, data);
        if (!res?.status) {
          return toaster(res?.message, TOAST_TYPES.ERROR);
        } else {
          toaster(res?.data?.message, TOAST_TYPES.SUCCESS);
          cancel();
          // onConfirm();
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

  const cancel = async () => {
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
  };

  return (
    <AddServiceDetailDiv>
      <Form onSubmit={handleSubmit(onSubmitForm)}>
        <FormGroup controlId="formBasicEmail" isNewDashboardInsightsSitbackFormGroup={true} className="add-serice-form-group-wrapper">
          <Label isNewDashboardInsightsSitbackLabel={true}>{t("selectServices")}</Label>
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
                // onChange={handleChange}
                // allowSelectAll={true}
                // value={optionSelected}
              />
            )}
          />
          <p className="text-danger mt-1">{errors?.service?.value?.message}</p>
        </FormGroup>

        <FormGroup controlId="formBasicEmail" isNewDashboardInsightsSitbackFormGroup={true}>
          <Label isNewDashboardInsightsSitbackLabel={true}>{t("price")}</Label>
          <Input className="input-service-wrapper" type="text" {...register("price")} placeholder="$" />
          <p className="text-danger mt-1">{errors?.price?.message}</p>
          <div className="addpricemessage">
            <img src="/images/DangerCircle.svg" alt="icon" />
            <span>{t('serviceChargesText')}</span>
          </div>
        </FormGroup>
        {/* <FormGroup isNewDashboardInsightsSitbackFormGroup={true} className="add-service-text-area-wrapper">
            <Label isNewDashboardInsightsSitbackLabel={true}>Description</Label>
            <Form.Control as="textarea" rows={3} placeholder="Write here..." />
        </FormGroup> */}
        <FormGroup controlId="formBasicEmail" isNewDashboardInsightsSitbackFormGroup={true}>
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
                    // placeholder="Hour"
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
            <p>to</p>
            <div className="time-minute-div">
              <p className="time-content-text">{t("minute")}</p>
              <Controller
                name="minute"
                control={control}
                render={({ field }) => (
                  <ReactSelect
                    className="sitback-select2-container input-with-icon"
                    classNamePrefix="sitback-select-option"
                    // placeholder="Minute"
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
            label={t("saveCaps")}
            loadinglabel="Saving..."
            isLoading={loading}
            className="add-appointment-btn"
          />
          <Button className="cancel-btn-wrapper" variant="primary" type="reset" isBorderBtn={true} onClick={() => cancel()}>
            {t("cancelCaps")}
          </Button>
        </div>
      </Form>
    </AddServiceDetailDiv>
  );
};
