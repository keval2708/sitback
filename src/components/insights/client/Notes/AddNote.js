"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import LoadingButton from "@/components/shared/button/LoadingButton";
import { useToaster } from "@/hooks";
import { handleRedirect, insightCheckSliceSelector } from "@/redux/insightClient";
import { API_ROUTER } from "@/services/apiRouter";
import {
  FormGroup,
  Input,
  Label,
} from "@/styles/global/main.style";
import { ClientAddLayoutTableWrapper } from "@/styles/pages/client.style";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";


export const AddNote = () => {

  // hooks
  const dispatch = useDispatch();
  const { toaster } = useToaster();
  const { t } = useTranslation();
  const { selectedClient } = useSelector(insightCheckSliceSelector);

  //states
  const [loading, setLoading] = useState(false);

  const defaultValues = {
    title: '',
    description: '',
  };

  const formSchema = yup
    .object()
    .shape({
      title: yup
        .string()
        .required("Title is required")
        .min(3, "Title is too short")
        .max(30, "Title is too long - should be at most 30 characters")
        .matches(/^[A-Za-z]+( [A-Za-z]+)*\s*$/, "Please enter valid title"),
      description: yup
        .string()
        .required("Description is required"),
    })
    .strict(true);

  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(formSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = methods;

  const cancel = async () => {
    reset();
  };

  const onSubmitForm = (formData) => {
    try {
      createNotesData(formData);
    } catch (error) { }
  };

  const createNotesData = async (formData) => {
    try {
      setLoading(true);
      const params = {
        userId: selectedClient && selectedClient.userId,
        title: formData?.title.trim(),
        description: formData?.description?.trim(),
      };
      const res = await axiosApiCall.post(API_ROUTER?.ADD_NOTES, params);
      if (!res?.status) {
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        toaster(res?.data?.message, TOAST_TYPES.SUCCESS);
        cancel();
        dispatch(handleRedirect("client-note-list"));
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <ClientAddLayoutTableWrapper className="sitback-updated-client-add-layout-div">
        <Form onSubmit={handleSubmit(onSubmitForm)}>
          <div className="table-header-bgfill">
            <h5>{t('notes')}- <span>{selectedClient && selectedClient.username} </span></h5>
            <LoadingButton
              type="submit"
              disabled={loading}
              label={t('addNotes')}
              loadinglabel={t('addNotes')}
              isLoading={loading}
              className="addnew-client"
            />
          </div>

          <div className="select-reports-box-wrapper">
            <FormGroup className="white-input-wrapper">
              <Label>{t('addTitle')}</Label>
              <Input
                type="text"
                placeholder="Add note title"
                className=""
                {...register("title")}
              />
              <p className="text-danger">{errors?.title?.message}</p>

            </FormGroup>
            <FormGroup className="white-input-wrapper">
              <Label>{t('description')}</Label>
              <Input
                type="text"
                placeholder="Your text here..."
                className=""
                as="textarea"
                rows={5}
                {...register("description")}
              />
              <p className="text-danger">{errors?.description?.message}</p>
            </FormGroup>
          </div>
        </Form>
      </ClientAddLayoutTableWrapper>

    </div>
  );
};
