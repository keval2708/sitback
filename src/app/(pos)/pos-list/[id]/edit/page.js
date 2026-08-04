"use client";

import { yupResolver } from "@hookform/resolvers/yup";
// import { useParams } from "next/navigation";
import { useParams, useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Switch from "react-switch";
import { toast } from "react-toastify";
import * as yup from "yup";
import LoadingButton from "@/components/shared/button/LoadingButton";
import Loader from "@/components/shared/spinner/loader";
import { PATH_POS } from "@/routes/paths";
import { API_ROUTER } from "@/services/apiRouter";
import { Button } from "@/styles/global/main.style";
import { AddProductLayoutWrapper } from "@/styles/pages/pos.style";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS } from "@/utils/constants";

export default function Edit() {
  // hooks
  const { id } = useParams();
  const { t } = useTranslation();
  const { push } = useRouter();

  //states
  const [productDetail, setProductDetail] = useState("");
  const [loading, setLoading] = useState(false);
  const [productLoading, setproductLoading] = useState(false);

  const defaultValues = {
    image: null,
    name: "",
    price: "",
    stock: "",
    low_stock: 0,
    description: "",
    trackStockStatus: false,
  };

  useEffect(() => {
    // if (productLoading) {
    getProduct();
    // }
  }, [id]);

  // const defaultValues = useMemo(() => ({
  //   image: productDetail?.image || null,
  //   name: productDetail?.name || '',
  //   price: parseInt(productDetail?.price) || null,
  //   stock: productDetail?.stock || '',
  //   low_stock: productDetail?.low_stock || 0,
  //   description: productDetail?.description || '',
  //   trackStockStatus: productDetail?.trackStockStatus == 1 ? true : false,
  // }), [productDetail]);

  useEffect(() => {
    // reset(defaultValues);
  }, [defaultValues]);

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
      .typeError("price should be number")
      .required("Price is required"),
    description: yup.string().required("Description is required"),
    trackStockStatus: yup.bool().required("Please select TrackStockStatus "),
    stock: yup.string().when("trackStockStatus", {
      is: (val) => val == true,
      then: (schema) => schema.required("Stock Number is required"),
      otherwise: (schema) => schema.notRequired(),
    }),

    low_stock: yup
      .number()
      .integer("please enter integer number")
      .when("trackStockStatus", {
        is: (val) => val == true,
        then: (schema) =>
          schema
            .required("LowStock Number is required")
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
    mode: "onChange",
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
  };

  const onSubmitForm = (formData) => {
    try {
      addProduct(formData);
    } catch (error) {}
  };

  const getProduct = async () => {
    try {
      setproductLoading(true);
      const params = {
        id: id,
      };

      const res = await axiosApiCall.post(API_ROUTER?.POS_GET_PRODUCT, params);
      if (!res?.status) {
        return toast.error(res?.message, { autoClose: 2000 });
      } else {
        setProductDetail(res?.data?.data);
        setValue("image", res?.data?.data?.image);
        setValue("name", res?.data?.data?.name);
        setValue("price", parseInt(res?.data?.data?.price));
        setValue("description", res?.data?.data?.description);
        setValue("trackStockStatus", res?.data?.data?.trackStockStatus == 1 ? true : false);
        if (res?.data?.data?.trackStockStatus == 1) {
          setValue("stock", res?.data?.data?.stock.toString());
          setValue("low_stock", parseInt(res?.data?.data?.low_stock));
        }
      }
    } catch (error) {
      toast.error(TOAST_ALERTS.GENERAL_ERROR, { autoClose: 2000 });
    } finally {
      setproductLoading(false);
    }
  };

  const addProduct = async (data) => {
    try {
      setLoading(true);
      const fData = new FormData();
      fData.append("id", id);
      fData.append("description", data?.description?.trim());

      fData.append("name", data?.name?.trim());
      fData.append("price", data?.price);
      fData.append("stock", data?.stock ? data?.stock : 0);
      fData.append("low_stock", data?.low_stock ? data?.low_stock : 0);
      fData.append("trackStockStatus", data?.trackStockStatus == false ? 0 : 1);
      fData.append("image", data?.image);

      // const res = await axiosApiCall.post(API_ROUTER?.POS_EDIT_PRODUCT, fData, {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // });
      const res = await axiosApiCall({
        method: "post",
        url: API_ROUTER?.POS_EDIT_PRODUCT,
        baseURL: process.env.API_URL_V3,
        data: fData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (!res?.status) {
        return toast.error(res?.message, { autoClose: 2000 });
      } else {
        push(PATH_POS?.list);
        toast.success(res?.data?.message, { autoClose: 2000 });

        cancel();
      }
    } catch (error) {
      toast.error(TOAST_ALERTS.GENERAL_ERROR, { autoClose: 2000 });
    } finally {
      setLoading(false);
    }
  };

  const handleDrop = useCallback(
    (event) => {
      const file = event?.target.files[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue("image", newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  const resetState = () => {
    // reset(defaultValues);
    push(PATH_POS?.list);
  };

  return (
    <AddProductLayoutWrapper>
      <Container>
        <div className="add_product_layout">
          {!productLoading ? (
            <Form onSubmit={handleSubmit(onSubmitForm)}>
              <Row>
                <Col md={4} lg={4}>
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
                            src={
                              UploadedImage
                                ? typeof UploadedImage === "string"
                                  ? UploadedImage
                                  : UploadedImage?.preview
                                : DEFAULT_IMAGE
                            }
                            alt="product"
                          />
                        </div>
                        {UploadedImage ? (
                          <div className="cancel_icon">
                            <img
                              src="/images/closeicon.svg"
                              alt="close icon"
                              onClick={() => setValue("image", null)}
                            />
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <p className="text-danger">{errors?.image?.message}</p>
                  </div>
                </Col>
                <Col md={8} lg={8}>
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
                            <span>{t("changeInStockValue")}</span>
                            {productDetail?.remainstockcount != null ? (
                              <span className="text-danger">
                                Only last {productDetail?.remainstockcount} {t("remainingStock")}
                              </span>
                            ) : (
                              <></>
                            )}
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
                            <span>{t("lowStockNotify")}</span>
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
                    className="loading-btn-wrapper btn-save"
                  />
                </Col>
              </Row>
            </Form>
          ) : (
            <Loader loading={productLoading} />
          )}
        </div>
      </Container>
    </AddProductLayoutWrapper>
  );
}
