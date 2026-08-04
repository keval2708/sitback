import { yupResolver } from "@hookform/resolvers/yup";
import moment from "moment";
import { useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import "react-datepicker/dist/react-datepicker.css";
import CustomModal from "@/components/shared/modal";
import { useToaster } from "@/hooks";
import { API_ROUTER } from "@/services/apiRouter";
import { FormGroup, Input, Label, SitBackModalBodyWrapper, } from "@/styles/global/main.style";

import axiosApiCall from "@/utils/axios";
import { TOAST_TYPES } from "@/utils/constants";

const PastRequestDeclineModal = ({ show, handleClose,data,setItems,checkPendingAppointment }) => {

const { t } = useTranslation();
const [loading, setLoading] = useState(false);
const { toaster } = useToaster();

const defaultValues = {
    slots: [],
  };

  const CustomFormSchema = yup
    .object()
    .shape()
    .strict(true);

  // Hooks
  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(CustomFormSchema),
    defaultValues,
  });


 const {
    register,
    reset,
    getValues,
    formState: { errors },
  } = methods;

   const handleFinalDecline = async (data) => {

    setLoading(true)
    const message = getValues("message"); // Get the message field value


    let declineData = {
      bookingid: data?.id,
      decline_reason: message, // Add message to the request body
    };

    try {
      const res = await axiosApiCall.post(API_ROUTER?.DASHBOARD_FINAL_BOOKING_REJECT, declineData);
      if (!res?.status) {
        return toaster(res?.message, TOAST_TYPES.ERROR);
      } else {
        setItems((prevAppointments) =>
          prevAppointments.map((data) =>
            data.id === data?.id ? { ...data, status: 'Rejected' } : data
          )
        );
        toaster(res?.data?.message, TOAST_TYPES.SUCCESS);
        reset({
          message: '',  // Reset message value
        });
        checkPendingAppointment()
        handleClose()


      }
    } catch (error) {
      // console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }


  };

  const handleClosed = () => {
    reset({
        message: '',  // Reset message value
      });
    handleClose()
    setLoading(false)
  }


 const formatPhoneNumber = (phone) => {
    const cleaned = ('' + phone).replace(/\D/g, ''); // Remove non-digit characters
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/); // Match the format
    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`; // Format the phone number
    }
    return phone; // Return the phone number as is if it doesn't match the pattern
  };


  return (
    <>

    <CustomModal
        show={show}
        onHide={() => handleClosed()}
        aria-labelledby="delete-confirmation-modal"
        centered
        className="sitback-modal-wrapper sitback-edit-service-modal-wrapper sitback-modalv2-wrapper sitback-approve-req-modal-wrapper"
      >
        <Modal.Header closeButton className="red-close-icon">
          <Modal.Title>
            {t('declineRequest')}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SitBackModalBodyWrapper>
            <div className="sit-req-table-div">
              <Table responsive>
                <thead>
                  <tr>
                    <th>{t('cName')}</th>
                    <th>{t('phoneText')}</th>
                    <th>{t('date')}</th>
                    <th>{t('slotText')}</th>
                    <th>{t('massageTypeText')}</th>
                    <th>Preference</th>
                  </tr>
                </thead>
                <tbody>
                    <tr>
                      <td>{data?.username}</td>
                      <td>{formatPhoneNumber(data?.phone)}</td>
                      <td>{moment(data?.date).format('DD MMMM YYYY')}</td>
                      <td>{data?.slot_title}</td>
                      <td>{data?.servicename}</td>
                      <td>{data?.name}</td>
                    </tr>
                </tbody>
              </Table>
            </div>
            <div>
              <FormGroup className="msg-textarea-wrapper">
                <Label>{t('includeMessageToTheClient')}</Label>
                  <Input
                    as="textarea"
                    rows={5}
                    {...register("message")}
                    name="message"
                    placeholder="Write here..."
                  />
                </FormGroup>
                <p className="text-danger">{errors?.message?.message}</p>
                <div className="sit-req-cancel-btn-wrapper">
                <Button variant="primary" className="decline-btn" onClick={() => handleFinalDecline(data)} disabled={loading}>{t('declineNow')}</Button>
                  <Button variant="secondary" className="decline-btn cancel-btn"  onClick={() => handleClose()}>{t('cancel')}</Button>

                </div>
              </div>
            </SitBackModalBodyWrapper>

        </Modal.Body>
      </CustomModal>

    </>
  );
};

export default PastRequestDeclineModal;
