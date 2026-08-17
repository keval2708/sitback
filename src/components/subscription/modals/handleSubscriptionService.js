import { yupResolver } from "@hookform/resolvers/yup";
// import _ from "lodash";
import { useRouter } from "next/navigation";
import { memo, useEffect, useMemo, useState } from "react";
import { Col, Form, Modal, Row } from "react-bootstrap";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import ReactSelect from "react-select";
import * as yup from "yup";
import LoadingButton from "@/components/shared/button/LoadingButton";
import CustomModal from "@/components/shared/modal";
import Loader from "@/components/shared/spinner/loader";
import { useToaster } from "@/hooks";
import { PATH_DASHBOARD } from "@/routes/paths";
import { API_ROUTER } from "@/services/apiRouter";
import {
  Button,
  FormGroup,
  Input,
  Label,
  SitBackModalBodyWrapper,
} from "@/styles/global/main.style";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";
import { generateHourMinute } from "@/utils/helper";


const HandleSubscriptionService = ({ show, handleClose = () => { }, subscriptionData, selectPrice }) => {
  // state
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  // const [serviceData, setServiceData] = useState([]);

  // constant
  const { r_hour } = generateHourMinute();
  const hourOptions = r_hour.map((hour) => ({ value: hour, label: hour }));
  const minute_options = [
    {
      value: 0,
      label: 0,
    },
    {
      value: 30,
      label: 30,
    },
  ];


  // hooks
  const { toaster } = useToaster();
  const { t } = useTranslation();
  const { push } = useRouter();

  const defaultValues = useMemo(
    () => ({
      service_list: [],
    }),
    []
  );

  const formSchema = yup.object().shape({
    service_list: yup.array().of(
      yup.object().shape({
        is_checked: yup.bool().required(t("serviceModalValidation8")),
        price: yup.number().when("is_checked", {
          is: (val) => val == true,
          then: (schema) =>
            schema
              .required(t("serviceModalValidation9"))
              .typeError(t("serviceModalValidation1"))
              .integer(t("serviceModalValidation2"))
              .min(10, t("serviceModalValidation3"))
              .max(2000, t("serviceModalValidation4")),
          otherwise: (schema) => schema.nullable(),
          // then: yup.number().required(t("serviceModalValidation9")),
        }),
        hour: yup.object().shape({
          value: yup.number().when("is_checked", {
            is: (val) => val == true,
            then: (schema) =>
              schema
                .required(t("serviceModalValidation9"))
                .typeError(t("serviceModalValidation10"))
                .transform((value) => (isNaN(value) ? 0 : value))
                .min(0, t("serviceModalValidation11"))
                .max(23, t("serviceModalValidation12")),
            otherwise: (schema) => schema.nullable(),
          }),
        }),
        minute: yup.object().when("is_checked", {
          is: (val) => val == true,
          then: (schema) =>
            schema.shape({
              value: yup.number().required("is required"),
            }).test('valid-time', 'Please Select Valid Time', function () {
              const { hour, minute } = this.parent;
              const totalMinutes = parseInt(hour.value || 0) * 60 + parseInt(minute.value || 0);
              if (totalMinutes < 30) {
                return this.createError({
                  message: "Minute Shouldn't be less than 30 min",
                });
              } else if (hour?.value == 0 && minute?.value == 0) {
                return this.createError({
                  message: "Hour and Minute should not be zero",
                });
              } else {
                return true;
              }
            }),
          otherwise: (schema) => schema.nullable(),
        }),
      }),
    ),
  });

  // Hooks
  const methods = useForm({
    resolver: yupResolver(formSchema),
    defaultValues,
  });

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    trigger,
    watch,
    control,
    setError,
    clearErrors,
    formState: { errors },
  } = methods;

  const { fields, append, insert } = useFieldArray({
    control,
    name: "service_list",
  });

  const duplicateService = (index) => {
    const currentService = getValues(`service_list.${index}`);
    if (!currentService) return;

    insert(index + 1, {
      key: currentService.key,
      value: currentService.value,
      label: currentService.label,
      image: currentService.image,
      is_checked: true,
      price: currentService.price || 0,
      servicetype: currentService.servicetype,
      serviceslistid: currentService.serviceslistid,
      isDisable: false,
      hour: {
        label: currentService?.hour?.label ?? 0,
        value: currentService?.hour?.value ?? 0,
      },
      minute: {
        label: currentService?.minute?.label ?? 0,
        value: currentService?.minute?.value ?? 0,
      },
    });
  };

  const onSubmitForm = async (formData) => {

    try {
      setBtnLoading(true)
      let selectedData = formData?.service_list?.filter((item) => item.is_checked == true);
      if (selectedData?.length > selectPrice?.planServiceLength) {
        setError("service_list", { message: `You can't select more than ${selectPrice?.planServiceLength} services in the ${selectPrice?.planName} plan.` })
        return
      }
      let newServiceData = selectedData?.filter((item) => item.isDisable == false);
      let oldServiceData = selectedData?.filter((item) => item.isDisable == true);
      let newData = [];
      let oldData = [];
      newServiceData?.map((item) => {
        newData.push({
          servicesid: item?.key,
          price: item?.price,
          hour: item?.hour.value,
          minutes: item?.minute.value,
        })
      });
      oldServiceData?.map((item) => {
        oldData.push({
          servicesid: item?.key,
          id: item?.serviceslistid,
          price: item?.price,
          hour: item?.hour.value,
          minutes: item?.minute.value,
        })
      });

      let oldServiceId = oldServiceData.map((data) => data.serviceslistid);
      let param = {
        selectedServiceIds: oldServiceId?.join(","),
        newServiceData: newData,
        oldServiceData: oldData,
      }
      const res = await axiosApiCall.post(API_ROUTER?.DISABLE_SERVICE, param);
      if (!res?.data?.status) {
        return toaster(res?.message, TOAST_TYPES.ERROR);
        } else {

        let updatePlanData = {
          item_id: subscriptionData?.planData?.item_id,
          new_price_id: selectPrice?.stripeProductId,
          subscription_id: subscriptionData?.planData?.subscription_id,
        };
        const updatePlan = await axiosApiCall.post(API_ROUTER?.UPDATE_CUSTOMER_PLAN, updatePlanData);
        if (!updatePlan?.status) {
          return toaster(updatePlan?.message, TOAST_TYPES.ERROR);
        } else {
          toaster(updatePlan?.data?.message, TOAST_TYPES.SUCCESS);
          handleClose();
          setBtnLoading(false);
          push(PATH_DASHBOARD?.serviceProvider);
        }
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setBtnLoading(false);
    }

  };

  const cancel = async () => {
    // resetState();
    reset(defaultValues);
    clearErrors("service_list");
    handleClose();
  };

  useEffect(() => {
    if (show) {
      services();
    }
  }, [show]);

  const services = async () => {
    try {
      setLoading(true);
      const res = await axiosApiCall.get(API_ROUTER?.GET_SERVICE_LIST_SUBSCRIPTION);
      if (!res?.status) {
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        res?.data?.data &&
          res?.data?.data?.map((s) => {
            append({
              key: s.id,
              value: s.id,
              label: s.name,
              image: s.thumb_image,
              is_checked: s?.servicetype == "selected" ? true : false,
              price: s?.price || 0,
              servicetype: s?.servicetype,
              serviceslistid: s?.serviceslistid,
              isDisable: s?.servicetype == "selected" ? true : false,
              hour: { label: s?.hour || 0, value: s?.hour || 0 },
              minute: { label: s?.minutes || 0, value: s?.minutes || 0 },
            });
          });
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CustomModal
      show={show}
      aria-labelledby="example-modal-sizes-title-sm"
      centered
      className="sitback-modal-wrapper subscriptions-model"
    >
      <Modal.Body>
        <SitBackModalBodyWrapper>
          <Loader loading={loading} className="sitback-loader" />
          <Form onSubmit={handleSubmit(onSubmitForm)}>
            {fields?.map((day, index) => {
              const current_obj = watch(`service_list.${index}`);

              return (
                <div key={day.id}>
                  <FormGroup controlId={`service-check-${day.id}`} className="formgropcustom">
                    <Controller
                      name={`service_list.${index}.is_checked`}
                      control={control}
                      render={({ field: { value, onChange, onBlur, name, ref } }) => (
                        <Form.Check
                          label={day.label}
                          type="checkbox"
                          id={`inline-checkbox-${day.id}`}
                          className="checkbox-wrapper-div"
                          name={name}
                          ref={ref}
                          onBlur={onBlur}
                          checked={!!value}
                          onChange={(e) => onChange(e.target.checked)}
                        />
                      )}
                    />
                    {current_obj?.is_checked &&
                      <span className="btn-wrapper" onClick={() => duplicateService(index)}>
                        Add Duplicate
                      </span>
                    }
                  </FormGroup>
                  {current_obj?.is_checked ? (
                    <>
                      <Row className="subscription-model">
                        <Col md={6}>
                          <FormGroup controlId={`service-price-${day.id}`} className="formgrop">
                            <Label>{t("price")}</Label>
                            <Input type="text" {...register(`service_list.${index}.price`)} placeholder="$" className="subscription-price-input" />
                            <p className="text-danger">{errors?.service_list ? errors?.service_list[index]?.price?.message : ""}</p>
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup controlId={`service-duration-${day.id}`} className="formgrop">
                            <div className="length-detail-div">
                              <div className="input-wrapper">
                                <Label>{t("Hour")}</Label>
                                <Controller
                                  name={`service_list.${index}.hour`}
                                  control={control}
                                  render={({ field }) => (
                                    <ReactSelect
                                      className="sitback-select2-container input-with-icon coming-soon-select"
                                      classNamePrefix="sitback-select-option"
                                      options={hourOptions}
                                      menuPlacement="auto"
                                      maxMenuHeight={200}
                                      closeMenuOnSelect={true}
                                      hideSelectedOptions={false}
                                      {...field}
                                      onBlur={() => trigger("duration")}
                                      isSearchable={true}
                                      onChange={(e) => {
                                        field.onChange(e);
                                        if (e?.value > 0) {
                                          clearErrors(`service_list.${index}.minute`)
                                        }
                                      }}
                                    />
                                  )}
                                />
                              </div>
                              <div className="input-wrapper">
                                <Label>{t("minute")}</Label>
                                <Controller
                                  name={`service_list.${index}.minute`}
                                  control={control}
                                  render={({ field }) => (
                                    <ReactSelect
                                      className="sitback-select2-container input-with-icon coming-soon-select"
                                      classNamePrefix="sitback-select-option"
                                      menuPlacement="auto"
                                      maxMenuHeight={200}
                                      options={minute_options}
                                      closeMenuOnSelect={true}
                                      hideSelectedOptions={false}
                                      {...field}
                                      onBlur={() => trigger("duration")}
                                      isSearchable={false}
                                      onChange={(e) => {
                                        field.onChange(e);
                                        if (e?.value > 0) {
                                          clearErrors(`service_list.${index}.minute`)
                                        }
                                      }}
                                    />
                                  )}
                                />
                              </div>
                            </div>
                            <p className="text-danger">{errors?.service_list ? errors?.service_list[index]?.minute?.message : ""}</p>
                          </FormGroup>
                        </Col>
                      </Row>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              );
            })}
            <p className="text-danger">{errors?.service_list ? errors?.service_list?.message : ""}</p>
            <div className="modal-footer-div mt-2">
              <LoadingButton
                type="submit"
                disabled={btnLoading}
                label="Save"
                loadinglabel="Saving..."
                isLoading={btnLoading}
                className="loading-btn-wrapper"
              />
              <Button variant="primary" type="reset" isBorderBtn={true} onClick={() => cancel()}>
                {t("cancel")}
              </Button>
            </div>
          </Form>
        </SitBackModalBodyWrapper>
      </Modal.Body>
    </CustomModal>
  );
};

export default memo(HandleSubscriptionService);
