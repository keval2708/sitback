import { yupResolver } from "@hookform/resolvers/yup";
import { memo, useEffect, useMemo, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { useToaster } from "@/hooks";
import { API_ROUTER } from "@/services/apiRouter";
import { ServiceModalWrapper, StyledServiceModal } from "@/styles/pages/profile.style";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";
import { setImageUpload } from "@/utils/helper";
import { getInitials } from "@/components/therapists-profile/utils";

const CloseModalIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: '#E32C1F' }}>
    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);


const EditProviderModal = ({ show, onHide = () => { }, onConfirm = () => { }, provider }) => {
  console.log("provider", provider);
  // state
  const [loading, setLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState("/images/upload-gallery-icon.svg");

  // hooks
  const { toaster } = useToaster();
  const { t } = useTranslation();

  // Form Config
  const defaultValues = useMemo(
    () => ({
      firstName: "",
      lastName: "",
      // email: "",
    }),
    []
  );

  // validation
  const formSchema = yup.object().shape({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    // email: yup.string().email("Invalid email format").required("Email is required"),
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
      return error;
    }
  };

  const onSubmit = async (data) => {
    try {
      const fData = new FormData();
      fData.append("id", provider?.id);

      const firstName = data?.firstName?.trim() || "";
      const lastName = data?.lastName?.trim() || "";
      const fullName = `${firstName} ${lastName}`.trim();

      fData.append("name", fullName);
      fData.append("firstName", firstName);
      fData.append("lastName", lastName);

      if (uploadedImage?.fileObj) {
        fData.append("image", uploadedImage?.fileObj);
      }
      setLoading(true);
      const res = await axiosApiCall.post(API_ROUTER?.UPDATE_EMPLOYEE, fData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (!res?.status) {
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        toaster(res?.data?.message, TOAST_TYPES.SUCCESS);
        resetState();
        reset(defaultValues);
        onConfirm();
        setUploadedImage()
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (provider) {
      let firstName = provider?.firstName || provider?.first_name || "";
      let lastName = provider?.lastName || provider?.last_name || "";

      if (!firstName && !lastName && provider?.name) {
        const fullName = provider.name.trim();
        const spaceIndex = fullName.indexOf(" ");
        if (spaceIndex !== -1) {
          firstName = fullName.substring(0, spaceIndex).trim();
          lastName = fullName.substring(spaceIndex + 1).trim();
        } else {
          firstName = fullName;
        }
      }

      setValue("firstName", firstName);
      setValue("lastName", lastName);
      // setValue("email", provider?.email);
    }
  }, [show, provider]);

  const cancel = async () => {
    resetState();
    reset(defaultValues);
    onHide();
    setUploadedImage()
  };

  const resetState = () => {
    setValue("firstName", "");
    setValue("lastName", "");
    // setValue("email", "");
  };


  const DEFAULT_IMAGE = provider?.image;

  const handleImageUpload = (event) => {
    let res = setImageUpload(event);
    setUploadedImage({ file: res.file, fileObj: res?.fileObj });
  };

  const initialName = provider?.name || `${provider?.firstName || provider?.first_name || ""} ${provider?.lastName || provider?.last_name || ""}`.trim();

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
          <h3 className="modal-title-text">{t('editSpecialist')}</h3>

          <Form onSubmit={handleSubmit(onSubmitForm)}>
            <div className="form-group-custom">
              <div className="upload-gallery-img-section">
                <div className="upload-gallery">
                  <input
                    type="file"
                    name="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e)}
                  />
                  {uploadedImage?.file || DEFAULT_IMAGE ? (
                    <img
                      alt="sitback"
                      src={uploadedImage?.file || DEFAULT_IMAGE}
                      onChange={(e) => handleImageUpload(e)}
                      onError={(e) => {
                        e.target.src = DEFAULT_IMAGE;
                      }}
                    />
                  ) : (
                    <span className="sidebar-initials" style={{ fontSize: "36px", fontWeight: "700", color: "#295086" }}>{getInitials(initialName)}</span>
                  )}
                </div>
                <p>{t("uploadgallery")}</p>
              </div>

            </div>

            <div className="form-row-two">
              <div className="form-group-custom">
                <input
                  type="text"
                  {...register("firstName")}
                  placeholder={t('firstNameLabel')}
                  maxLength={15}
                />
                {errors?.firstName && (
                  <p className="text-danger mt-1">{errors.firstName.message}</p>
                )}
              </div>
              <div className="form-group-custom">
                <input
                  type="text"
                  {...register("lastName")}
                  placeholder={t('lastNameLabel')}
                  maxLength={15}
                />
                {errors?.lastName && (
                  <p className="text-danger mt-1">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            <div className="modal-buttons-row">
              <button
                type="button"
                className="cancel-btn"
                disabled={loading}
                onClick={() => cancel()}
              >
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

export default memo(EditProviderModal);
