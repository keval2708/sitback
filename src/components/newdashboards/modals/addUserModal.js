import { yupResolver } from "@hookform/resolvers/yup";
import React, { useMemo, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import CustomModal from "@/components/shared/modal";
import { useToaster } from "@/hooks";
import { API_ROUTER } from "@/services/apiRouter";
import { FormGroup, Input, Label, SitBackModalBodyWrapper, } from "@/styles/global/main.style";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";
import { getSocketId } from "@/utils/helper";

const AddUserModal = ({ show, handleClose, listAvailableEmployees }) => {
  //hooks
  const { t } = useTranslation();
  const { toaster } = useToaster();

  //states
  const [isUpdating, setIsUpdating] = useState(false);

  // Form Config
  const defaultValues = useMemo(
    () => ({

    }),
    []
  );

  // validation
  const CustomformSchema = yup
    .object()
    .shape({
      employeeName: yup
        .string()
        .required("Employee Name is required")
        .min(3, "Employee Name must be at least 3 characters"),
      phoneNumber: yup
        .string()
        .required("Phone Number is required")
        .matches(/^\d{10}$/, "Phone Number must be 10 digits"),
      email: yup
      .string()
      .required("Email is required")
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i, "Invalid email format."),
      permissions: yup
        .array()
        .min(1, "Please select at least one permission") // At least one permission must be selected
        .required("Permissions are required"),
        password: yup
        .string()
        .required(t('reqPassword'))
        .min(8, t('errMinPassword'))
        .max(12, t('errMaxPassword'))
        .trim(t('validPassword'))
        .matches(
          /^(?=.*[A-Za-z0-9])(?=.*[@$!%*?&])[A-Za-z0-9@$!%*?&]+$/,
          t('errPassword')
        ),
      confirmPassword: yup
        .string()
        .required(t('reqCfmPassword'))
        .oneOf(
          [yup.ref("password"), null],
          t('errCfmPassword')
        ),
    })
    .strict(true)

  // Form Hooks
  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(CustomformSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    setValue,
    watch,
    setError,
    reset,
    formState: { errors },
  } = methods;

  const onSubmitForm = async (formData) => {

    const socketId = getSocketId();
     let userData = {
      username:formData?.employeeName,
      email: formData?.email,
      phone:  formData?.phoneNumber,
      countrycode: '+1',
      password: formData?.password,
      permissions: formData?.permissions,
      socketId: socketId
    };

    try {
      setIsUpdating(true);
      const res = await axiosApiCall.post(API_ROUTER?.DASHBOARD_ADD_SPAEMPLOYEE, userData);
        if (!res?.status) {
          setIsUpdating(false);
          return toaster(res?.message, TOAST_TYPES.ERROR);
        } else {
          reset()
          listAvailableEmployees()
          handleClose();
          setIsUpdating(false);
          toaster(res?.data?.message, TOAST_TYPES.SUCCESS);
        }
    } catch (error) {
      setIsUpdating(false);
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    }


  };

  const handlePermissionChange = (event) => {
    const { value, checked } = event.target;
    const currentPermissions = watch("permissions") || [];

    // If checkbox is checked, add permission to array
    if (checked) {
      setValue("permissions", [...currentPermissions, value]);
      // Clear error when permission is selected
      setError("permissions", { message: "" });
    } else {
      // If checkbox is unchecked, remove the permission from array
      setValue("permissions", currentPermissions.filter((item) => item !== value));
      // If no permission is selected, set error
      if (currentPermissions.length === 1) {
        setError("permissions", { message: "Please select at least one permission" });
      }
    }
  };

    const handleCloseModal = () => {
    handleClose(); // Call handleClose prop to close the modal
    reset(); // Reset form values and errors when modal is closed
  };

  return (
    <CustomModal
          show={show}
          onHide={handleCloseModal}
          centered
          aria-labelledby="example-modal-sizes-title-sm"
          className="sitback-modal-wrapper sitback-edit-service-modal-wrapper sitback-availability-modal-wrapper"
        >
          <Modal.Body>
            <SitBackModalBodyWrapper className="sitback-edit-modal-body">
              <Form onSubmit={handleSubmit(onSubmitForm)} className="add-remove-modal-form-div">
              <h3 className="add-employee-title-text">{t('addEmployees')}</h3>
                <Row className="add-remove-employee-row">
                  <Col md={6}>
                    <FormGroup controlId="formEmployeeName" isNewDashboardInsightsSitbackFormGroup={true}>
                      <Label isNewDashboardInsightsSitbackLabel={true}>{t('employeeName')}</Label>
                      <Input
                        {...methods.register("employeeName")}
                        placeholder={t('Name')}
                        isInvalid={!!errors.employeeName}
                        className="input-add-employee-wrapper"
                      />
                      {errors.employeeName && <p className="error-msg-text">{errors.employeeName.message}</p>}
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup controlId="formPhoneNumber" isNewDashboardInsightsSitbackFormGroup={true}>
                      <Label isNewDashboardInsightsSitbackLabel={true}>{t('phonenumber')}</Label>
                      <div className="phone-number-input-div">
                        <div className="country-code-input">
                          <Input
                            placeholder="+1"
                            isInvalid={!!errors.phoneNumber}
                            className="input-add-employee-wrapper"
                            readOnly
                          />
                        </div>
                        <div className="mobile-number-input">
                          <Input
                            {...methods.register("phoneNumber")}
                            placeholder={t('phonenumber')}
                            isInvalid={!!errors.phoneNumber}
                            className="input-add-employee-wrapper"
                          />
                        </div>
                      </div>
                      {errors.phoneNumber && <p className="error-msg-text">{errors.phoneNumber.message}</p>}
                    </FormGroup>
                  </Col>
                </Row>
                <FormGroup controlId="formEmail" isNewDashboardInsightsSitbackFormGroup={true} className="email-input-div">
                  <Label isNewDashboardInsightsSitbackLabel={true}>{t('email')}</Label>
                  <Input
                    {...methods.register("email")}
                    placeholder={t('email')}
                    isInvalid={!!errors.email}
                    autoComplete="off"
                    className="input-add-employee-wrapper"
                  />
                  {errors.email && <p className="error-msg-text">{errors.email.message}</p>}
                </FormGroup>
                <FormGroup controlId="formPermissions" isNewDashboardInsightsSitbackFormGroup={true}>
                  <Label isNewDashboardInsightsSitbackLabel={true}>{t('permissions')}</Label>
                  <div className="add-employee-check-box-main-div">
                    <div className="add-employee-checkbox-wrapper">
                      <Form.Check
                        type="checkbox"
                        label={t('addAvailability')}
                        value="Add Availability"
                        className="custom-checkbox"
                        onChange={handlePermissionChange}
                      />
                      <Form.Check
                        type="checkbox"
                        label={t('createNewService')}
                        value="Create New Service"
                        onChange={handlePermissionChange}
                        className="custom-checkbox"
                      />
                      <Form.Check
                        type="checkbox"
                        label={t('approveDenyRequests')}
                        value="Approve/Deny Requests"
                        onChange={handlePermissionChange}
                        className="custom-checkbox"
                      />
                      <Form.Check
                        type="checkbox"
                        label={t('updateAvailability')}
                        value="Update Availability"
                        className="custom-checkbox"
                        onChange={handlePermissionChange}
                      />
                      <Form.Check
                        type="checkbox"
                        label={t('leadAndBookingTracking')}
                        value="Lead & Booking Tracking"
                        className="custom-checkbox"
                        onChange={handlePermissionChange}
                      />
                    </div>
                    {errors.permissions && <p className="error-msg-text">{errors.permissions.message}</p>}
                  </div>
                </FormGroup>
                <Row className="add-remove-employee-row">
                  <Col md={6}>
                    <FormGroup controlId="formPassword" isNewDashboardInsightsSitbackFormGroup={true}>
                      <Label isNewDashboardInsightsSitbackLabel={true}>{t('password')}</Label>
                      <Input
                        {...methods.register("password")}
                        type='password'
                        placeholder={t('password')}
                        isInvalid={!!errors.password}
                        className="input-add-employee-wrapper"
                      />
                      {errors.password && <p className="error-msg-text">{errors.password.message}</p>}
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup controlId="formConfirmPassword" isNewDashboardInsightsSitbackFormGroup={true}>
                      <Label isNewDashboardInsightsSitbackLabel={true}>{t('confirmPassword')}</Label>
                      <Input
                        {...methods.register("confirmPassword")}
                        type="password"
                        placeholder={t('confirmPassword')}
                        isInvalid={!!errors.confirmPassword}
                        className="input-add-employee-wrapper"
                      />
                      {errors.confirmPassword && <p className="error-msg-text">{errors.confirmPassword.message}</p>}
                    </FormGroup>
                  </Col>
                </Row>
                <div className="showcase-btn-div availability-showcase-btn-wrapper">
                  <Button
                    type="submit"
                    className="add-appointment-btn"
                    disabled={isUpdating} // Disable the button when updating
                  >
                    {isUpdating ? "Adding..." : t('addUser')}
                  </Button>
                  <Button
                    className="cancel-btn-wrapper"
                    onClick={handleCloseModal}
                  >
                    {t('cancel')}
                  </Button>
                </div>
              </Form>
            </SitBackModalBodyWrapper>
          </Modal.Body>
      </CustomModal>
  );
};

export default AddUserModal;
