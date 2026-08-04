import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useMemo, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import CustomModal from "@/components/shared/modal";
import { useToaster } from "@/hooks";
import { API_ROUTER } from "@/services/apiRouter";
import { FormGroup, Input, Label, SitBackModalBodyWrapper } from "@/styles/global/main.style";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";
import { getSocketId } from "@/utils/helper";

const EditUserModal = ({ show, handleClose, data, listAvailableEmployees }) => {

  const permissionsArray = typeof data?.permissions === "string"
  ? data?.permissions.split(", ").map(permission => permission.trim())
  : [];


  const { t } = useTranslation();
  const { toaster } = useToaster();

  const [isUpdating, setIsUpdating] = useState(false);

  // Form Config
  const defaultValues = useMemo(
    () => ({
      username: data?.username || "",
      phone: data?.phone || "",
      email: data?.email || "",
      permissions: permissionsArray || [],
      password: null,
      confirmPassword: null,
    }),
    [data]
  );

  // Validation Schema
  const CustomformSchema = yup.object().shape({
    username: yup
      .string()
      .required("Employee Name is required")
      .min(3, "Employee Name must be at least 3 characters"),
    phone: yup
      .string()
      .required("Phone Number is required")
      .matches(/^\d{10}$/, "Phone Number must be 10 digits"),
    email: yup
      .string()
      .required("Email is required")
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, "Invalid email format."),
    permissions: yup
      .array()
      .min(1, "Please select at least one permission")
      .required("Permissions are required"),
    password: yup
      .string()
      .notRequired() // Password is optional
      .nullable() // Allow null values
      .transform((value) => (value === "" ? null : value))
      .test("is-valid-password", t('errPassword'), (value) => {
        if (value === "" || value === null || value === undefined) {
          return true; // If password is empty, it's valid (since it's optional)
        } else if (/^[0-9]+$/.test(value)) {
          return false; // If password is entirely numeric, it’s invalid
        } else if (/^[a-zA-Z0-9@$!%*?&]+$/.test(value)) {
          return true; // If password contains letters, numbers, and special chars, it's valid
        } else {
          return false; // If password contains invalid characters, it’s invalid
        }
      })
      .min(8, t('errMinPassword')) // Minimum length of 8 (this will only apply if a value is present)
      .max(12, t('errMaxPassword')) // Maximum length of 12 (this will only apply if a value is present)
      .trim(t('validPassword')), // Trim any leading/trailing spaces
    confirmPassword: yup
    .string()
    .notRequired() // Confirm Password is optional
    .nullable() // Allow null values
    .transform((value) => (value === "" ? null : value)) // Transforms empty string to null
    .when('password', { // Use .when to conditionally apply validation based on 'password'
      is: (password) => password && password.length > 0, // If password has a value (not null/empty string)
      then: (schema) => schema
        .required(t('reqCfmPassword')) // Then confirmPassword is required
        .oneOf([yup.ref('password')], t('errCfmPassword')), // And must match password
      otherwise: (schema) => schema.test({ // If password is empty/null, confirmPassword should also be empty/null
        name: 'confirmPasswordEmpty',
        message: t('errConfirmPasswordShouldBeEmpty'),
        test: (value) => value === null || value === undefined,
      }),
    }),


  });

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

  // Pre-fill form when modal is shown
  useEffect(() => {
    if (data) {
      setValue("username", data.username);
      setValue("phone", data.phone);
      setValue("email", data.email);
      setValue("permissions", permissionsArray);
      setValue("password", null);
      setValue("confirmPassword", null);

    }
  }, [data, setValue]);

  const onSubmitForm = async (formData) => {
    const socketId = getSocketId();
    let userData = {
      id: data?.id,
      username: formData?.username,
      email: formData?.email,
      phone: formData?.phone,
      countrycode: '+1',
      permissions: formData?.permissions,
      socketId: socketId
    };

    // Conditionally add password only if it's not null or undefined
    if (formData?.password) {
      userData.password = formData?.password;
    }

    try {
      setIsUpdating(true);
      const res = await axiosApiCall.post(API_ROUTER?.DASHBOARD_UPDATE_SPAEMPLOYEE, userData);
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

    if (checked) {
      setValue("permissions", [...currentPermissions, value]);
      setError("permissions", { message: "" });
    } else {
      setValue("permissions", currentPermissions.filter((item) => item !== value));
      if (currentPermissions.length === 1) {
        setError("permissions", { message: "Please select at least one permission" });
      }
    }
  };

  const handleCloseModal = () => {
    handleClose(); // Close the modal
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
            <h3 className="add-employee-title-text">{t('editEmployees')}</h3>
            <Row className="add-remove-employee-row">
              <Col md={6}>
                <FormGroup controlId="formEmployeeName" isNewDashboardInsightsSitbackFormGroup={true}>
                  <Label isNewDashboardInsightsSitbackLabel={true}>{t('employeeName')}</Label>
                  <Input
                    {...methods.register("username")}
                    placeholder={t('Name')}
                    isInvalid={!!errors.username}
                    className="input-add-employee-wrapper"
                  />
                  {errors.username && <p className="error-msg-text">{errors.username.message}</p>}
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
                      />
                    </div>
                    <div className="mobile-number-input">
                      <Input
                        {...methods.register("phone")}
                        placeholder={t('phonenumber')}
                        isInvalid={!!errors.phone}
                        className="input-add-employee-wrapper"
                      />
                    </div>
                  </div>
                  {errors.phone && <p className="error-msg-text">{errors.phone.message}</p>}
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
                readOnly
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
                      checked={watch("permissions")?.includes("Add Availability") || false}
                      onChange={handlePermissionChange}
                      className="custom-checkbox"
                    />
                    <Form.Check
                      type="checkbox"
                      label={t('createNewService')}
                      value="Create New Service"
                      checked={watch("permissions")?.includes("Create New Service") || false}
                      onChange={handlePermissionChange}
                      className="custom-checkbox"
                    />
                    <Form.Check
                      type="checkbox"
                      label={t('approveDenyRequests')}
                      value="Approve/Deny Requests"
                      checked={watch("permissions")?.includes("Approve/Deny Requests") || false}
                      onChange={handlePermissionChange}
                      className="custom-checkbox"
                    />
                    <Form.Check
                      type="checkbox"
                      label={t('updateAvailability')}
                      value="Update Availability"
                      checked={watch("permissions")?.includes("Update Availability") || false}
                      className="custom-checkbox"
                      onChange={handlePermissionChange}
                    />
                    <Form.Check
                      type="checkbox"
                      label={t('leadAndBookingTracking')}
                      value="Lead & Booking Tracking"
                      checked={watch("permissions")?.includes("Lead & Booking Tracking") || false}
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
                  <Label isNewDashboardInsightsSitbackLabel={true}>Password</Label>
                  <Input
                    {...methods.register("password")}
                    type='password'
                    placeholder={t('password')}
                    className="input-add-employee-wrapper"
                  />
                  {errors.password && <p className="error-msg-text">{errors.password.message}</p>}
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup controlId="formConfirmPassword" isNewDashboardInsightsSitbackFormGroup={true}>
                  <Label isNewDashboardInsightsSitbackLabel={true}>Confirm Password</Label>
                  <Input
                    {...methods.register("confirmPassword")}
                    type="password"
                    placeholder={t('confirmPassword')}
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
                disabled={isUpdating}
              >
                {isUpdating ? "Updating..." : t('updateUser')}
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

export default EditUserModal;
