"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Switch from "react-switch";
import { toast } from "react-toastify";
import * as yup from "yup";
import LoadingButton from "@/components/shared/button/LoadingButton";
import { PATH_POS } from "@/routes/paths";
import { API_ROUTER } from "@/services/apiRouter";
import { Button } from "@/styles/global/main.style";
import { AddProductLayoutWrapper } from "@/styles/pages/pos.style";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS } from "@/utils/constants";

export default function Add() {
  // hooks
  const { push } = useRouter();
  const { t } = useTranslation();
  const fData = new FormData();

  //states
  const [loading, setLoading] = useState(false);

  const defaultValues = {
    image: null,
    name: "",
    price: null,
    stock: "",
    low_stock: null,
    description: "",
    trackStockStatus: true,
  };

  const DEFAULT_IMAGE = "/images/uploadicon.svg";
  const FormSchema = yup.object().shape({
    image: yup
      .mixed()
      .required("Image is required")
      .test("file-present", "Image is required", (value) => {
        return value;
      })
      .test("fileSize", "Profile image size is too large", (value) =>
        value ? (typeof value !== "string" ? (value.size <= 5 ? 1024 : 1024) : true) : true
      )
      .test("fileType", "Invalid Product Image.", (value) =>
        value
          ? typeof value !== "string"
            ? ["image/jpeg", "image/png", "image/jpg"].includes(value?.type)
            : true
          : true
      ),
    name: yup
      .string()
      .required("Name is required")
      .max(50, "Name should be Less than 50 characters"),

    price: yup
      .number()
      .integer("price should be integer.")
      .min(1, "Price must be greater than 0")
      .typeError("price should be number")
      .required("Price is required"),
    description: yup.string().required("Description is required"),
    trackStockStatus: yup.bool().required("Please select TrackStockStatus "),
    stock: yup.string().when("trackStockStatus", {
      is: (val) => val == true,
      then: (schema) => schema.required("Stock is required"),
      otherwise: (schema) => schema.notRequired(),
    }),

    low_stock: yup
      .number()
      .integer("please enter integer number")
      .when("trackStockStatus", {
        is: (val) => val == true,
        then: (schema) =>
          schema
            .required("LowStock is required")
            .typeError("Low stock should be number")
            .min(3, "Low stock should be more than 3")
            .test(
              "is-valid-stock",
              "Low stock can't be more than or equal to the available stock",
              function (value) {
                const { stock } = this.parent;
                if (value >= stock) {
                  return false;
                }
                return true;
              }
            ),
        otherwise: (schema) => schema.notRequired(),
      }),
  });
  // .strict(true);

  const methods = useForm({
    resolver: yupResolver(FormSchema),
    defaultValues,
  });

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    watch,
    register,
    formState: { errors },
  } = methods;

  const UploadedImage = watch("image");

  const Track_Stock_Status = watch("trackStockStatus");

  const cancel = async () => {
    resetState();
    reset();
    push(PATH_POS?.list);
  };

  const onSubmitForm = (formData) => {
    try {
      addProduct(formData);
    } catch (error) {}
  };

  const addProduct = async (data) => {
    try {
      setLoading(true);

      fData.append("description", data?.description?.trim());
      fData.append("name", data?.name?.trim());
      fData.append("price", data?.price);
      fData.append("stock", data?.stock ? data?.stock : 0);
      fData.append("low_stock", data?.low_stock ? data?.low_stock : 0);
      fData.append("trackStockStatus", data?.trackStockStatus == false ? 0 : 1);
      fData.append("image", data?.image);

      const res = await axiosApiCall.post(API_ROUTER?.ADD_PRODUCT, fData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (!res?.status) {
        return toast.error(res?.message, { autoClose: 2000 });
      } else {
        cancel();
        push(PATH_POS?.list);
        // toaster(res?.data?.message, TOAST_TYPES.SUCCESS);
        toast.success(res?.data?.message, { autoClose: 2000 });
      }
    } catch (error) {
      // toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
      toast.error(TOAST_ALERTS.GENERAL_ERROR, { autoClose: 2000 });
    } finally {
      setLoading(false);
    }
  };

  const handleDrop = useCallback(
    (event) => {
      const file = event?.target.files[0];

      if (file) {
        // Revoke previous preview URL if it exists
        if (UploadedImage?.preview) {
          URL.revokeObjectURL(UploadedImage.preview);
        }

        const newFile = Object.assign(file, {
          preview: URL.createObjectURL(file),
        });

        setValue("image", newFile, { shouldValidate: true });
      }
    },
    [setValue, UploadedImage]
  );

  const handleRemoveImage = () => {
    // Revoke the URL and reset the field
    if (UploadedImage?.preview) {
      URL.revokeObjectURL(UploadedImage.preview);
    }
    setValue("image", null);
  };

  // Revoke URL on unmount
  useEffect(() => {
    return () => {
      if (UploadedImage?.preview) {
        URL.revokeObjectURL(UploadedImage.preview);
      }
    };
  }, [UploadedImage]);

  const resetState = () => {
    setValue("image", null);
    setValue("name", "");
    setValue("price", 0);
    setValue("stock", 0);
    setValue("low_stock", 0);
    setValue("description", "");
    setValue("trackStockStatus", false);
  };

  return (
    <AddProductLayoutWrapper>
      <Container>
        <div className="add_product_layout">
          <Form onSubmit={handleSubmit(onSubmitForm)}>
            <Row>
              <Col md={12} lg={4}>
                <div className="upload_product_wrapper">
                  <div className="file_title">
                    <span>{t("uploadFile")}</span>
                  </div>
                  <div className="upload_product">
                    <div className="upload-file-input-wrapper">
                      <div className="upload-file-input">
                        <input
                          type="file"
                          name="file"
                          accept="image/*"
                          key={UploadedImage?.preview || DEFAULT_IMAGE} // Key-based workaround for input re-selection
                          onChange={(e) => handleDrop(e)}
                        />
                        <img src="/images/uploadicon.svg" alt="upload" />
                        <span>{t("dragFile")}</span>
                      </div>
                    </div>
                    <div className="upload_product_img">
                      <div className="product_img">
                        <img
                          className={UploadedImage?.preview ? "provider-image" : ""}
                          src={UploadedImage?.preview || DEFAULT_IMAGE}
                          alt="product"
                        />
                      </div>
                      {UploadedImage?.preview && (
                        <div className="cancel_icon">
                          <img
                            src="/images/closeicon.svg"
                            alt="close icon"
                            onClick={handleRemoveImage}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="text-danger">{errors?.image?.message}</p>
                </div>
              </Col>
              <Col md={12} lg={8}>
                <div className="product_detail_wrapper">
                  <div className="file_title">
                    <span>{t("productDetail")}</span>
                  </div>
                  <div className="product_decription">
                    <div className="product_title">
                      <input type="text" placeholder="Product name" {...register("name")} />
                      <p className="text-danger">{errors?.name?.message}</p>
                    </div>
                    <div className="product_short_dec">
                      <textarea
                        type="text"
                        placeholder="Description"
                        {...register("description")}
                      />
                      <p className="text-danger">{errors?.description?.message}</p>
                    </div>

                    <div className="product_price">
                      <label>{t("price")}</label>
                      <input type="number" placeholder="$ 1000" {...register("price")} />
                      <span>{t("addTheProductPrice")}</span>
                      <p className="text-danger">{errors?.price?.message}</p>
                    </div>
                  </div>
                  <div className="file_title">
                    <span>{t("inventoryDetail")}</span>
                  </div>
                  <div className="inventory_detail">
                    <div className="track_stock">
                      <div>
                        <span> {t("trackStock")}</span>
                      </div>
                      <div>
                        <Controller
                          name="trackStockStatus"
                          control={control}
                          render={({ field }) => (
                            <Switch
                              {...field}
                              onChange={(e) => field.onChange(e)}
                              checked={field.value}
                            />
                          )}
                        />
                        <p className="text-danger">{errors?.trackStockStatus?.message}</p>
                      </div>
                    </div>

                    <Row>
                      <Col md={6}>
                        <div className="in_stock">
                          <label>{t("inStock")}</label>
                          <input
                            type="number"
                            placeholder="0"
                            {...register("stock")}
                            disabled={!Track_Stock_Status}
                          />
                          <p className="text-danger">{errors?.stock?.message}</p>
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="low_stock">
                          <label>{t("lowStock")}</label>
                          <input
                            type="number"
                            placeholder="0"
                            {...register("low_stock")}
                            disabled={!Track_Stock_Status}
                          />
                          <span>{t("notifiedText")}</span>
                          <p className="text-danger">{errors?.low_stock?.message}</p>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Col>
            </Row>
            <Row className="mt-2">
              <Col md={12} className="modal-footer-div">
                <Button
                  variant="primary"
                  className="btn-cancel"
                  type="reset"
                  isBorderBtn={true}
                  onClick={() => cancel()}
                >
                  {t("cancel")}
                </Button>
                <LoadingButton
                  type="submit"
                  disabled={loading}
                  label={t("save")}
                  loadinglabel={t("saving")}
                  isLoading={loading}
                  className="loading-btn-wrapper csvmodal btn-save"
                />
              </Col>
            </Row>
          </Form>
        </div>
      </Container>
    </AddProductLayoutWrapper>
  );
}
