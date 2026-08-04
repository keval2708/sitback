"use client";
import React from "react";
import { Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import LoadingButton from "../button/LoadingButton";
import { FormGroup, Input } from "@/styles/global/main.style";

const ReviewReplyForm = ({ onChangeMessage, data, onSubmit, isEdit, loading, onClose }) => {
  //hook//
  const { t } = useTranslation();
  return (
    <>
      <Form>
        <FormGroup className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Input
            as="textarea"
            rows={3}
            style={{ resize: "none" }}
            placeholder={t("addreply")}
            value={data?.messageReplay || ""}
            onChange={(e) => onChangeMessage(data.id, e.target.value)}
          />
        </FormGroup>
        <div className="text-center">
          <LoadingButton
            type="submit"
            disabled={loading || !data?.messageReplay?.trim()}
            label={isEdit ? t("update") : t("reply")}
            variant="primary"
            loadinglabel={t("saving")}
            isLoading={loading}
            className="loading-btn-wrapper"
            onClick={(e) => {
              onSubmit(e);
              onClose();
            }}
          />
        </div>
      </Form>
    </>
  );
};

export default ReviewReplyForm;
