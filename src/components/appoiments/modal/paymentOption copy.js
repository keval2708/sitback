import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
// import AddCards from "@/components/insights/modal/addCards";
import { useDispatch, useSelector } from "react-redux";
import { default as ReactSelect, components } from "react-select";
import InlineSVG from "svg-inline-react";
import LoadingButton from "@/components/shared/button/LoadingButton";
import CashModal from "@/components/shared/modal/cashModal";
import { useToaster } from "@/hooks";
import { appointmentCheckSliceSelector, handlePaymentFailedModal, handlePaymentFailedTotalAmount } from "@/redux/appointment";
import { handleTarget, handleTargetProcess, messageCheckSliceSelector } from "@/redux/messageTab";
import { API_ROUTER } from "@/services/apiRouter";
import { Button, FormGroup, Input } from "@/styles/global/main.style";
import { dollar_icon } from "@/styles/svgs";
import axiosApiCall from "@/utils/axios";
import { TOAST_ALERTS, TOAST_TYPES } from "@/utils/constants";

const PaymentOption = ({ show, data, providerData, onHide = () => { } }) => {
  const [openCash, setOpenCash] = useState(false);
  const [getPaymentLoader, setGetPaymentLoader] = useState(false);
  const [isAddTip, setIsAddTip] = useState(false);
  const [optionSelected, setOptionSelected] = useState(null);

  const { bookingData } = useSelector(messageCheckSliceSelector);
  const { toaster } = useToaster();
  const dispatch = useDispatch();
  const { SingleValue, Option } = components;
  const [serviceData, setServiceData] = useState([]);
  const [tipPrice, setTipPrice] = useState(null);
  const [priceError, setPriceError] = useState(false);
  const { tipTotalAmount } = useSelector(appointmentCheckSliceSelector);

  const IconSingleValue = (props) => (
    <SingleValue {...props}>
      <img src={props.data.image} style={{ height: "30px", width: "30px" }} alt="img-tag" />
      {props.data.label}
    </SingleValue>
  );

  const IconOption = (props) => (
    <Option {...props}>
      <img src={props.data.image} style={{ height: "30px", width: "30px" }} alt="img-tag" />
      {props.data.label}
    </Option>
  );
  const handleChange = (selected) => {
    setOptionSelected(selected);
    // dispatch(handlePaymentFailedTotalAmount({ ...tipTotalAmount, optionSelected: selected }));
  };
  const handleChangePrice = (e) => {
    let value = e?.target?.value;

    // Ensure the value is an integer and non-negative
    if (value) {
      value = parseInt(value, 10); // Convert to integer

      if (isNaN(value) || value < 0) {
        setTipPrice(null);
        dispatch(handlePaymentFailedTotalAmount({ ...tipTotalAmount, tipPrice: null }));
        setPriceError(true);
      } else {
        setTipPrice(value);
        dispatch(handlePaymentFailedTotalAmount({ ...tipTotalAmount, tipPrice: value }));
        setPriceError(false);
      }
    } else {
      setTipPrice(null);
      dispatch(handlePaymentFailedTotalAmount({ ...tipTotalAmount, tipPrice: null }));
      setPriceError(false);
    }
  };

  const CapturePayment = async (data) => {
    if (isAddTip) {
      if (tipPrice && Math.abs(tipPrice) > 0) {
        setPriceError(false);
      } else {
        setPriceError(true);
        return;
      }
    }
    let params = "";
    if (isAddTip) {
      params = {
        id: data.id,
        tip: tipPrice,
        tipemployee_id: optionSelected?.value,
      };
    } else {
      params = {
        id: data.id,
      };
    }
    try {
      setGetPaymentLoader(true);
      const res = await axiosApiCall.post(API_ROUTER?.CAPTURE_PAYMENT, params);
      if (!res?.status) {
        if (res?.userCardError) {
          onHide();
          dispatch(handlePaymentFailedModal(true));
        } else {
          return toaster(res?.message, TOAST_TYPES.ERROR);
        }
      } else {
        const updatedList = bookingData.filter((record) => record.id == data?.id);
        dispatch(handleTargetProcess("removeBooking"));
        dispatch(handleTarget(updatedList[0]));
        toaster(res?.data?.message, TOAST_TYPES.SUCCESS);
        handlePaymentOptionModel();

        // setOpenConfirmationModal(true)
      }
    } catch (error) {
      toaster(TOAST_ALERTS.GENERAL_ERROR, TOAST_TYPES.ERROR);
    } finally {
      // dispatch(handleCalender(false));
      setGetPaymentLoader(false);
    }
  };

  const handlePaymentOptionModel = async () => {
    setOptionSelected(null);
    onHide();
    setIsAddTip(false);
    setTipPrice(null);

  };
  const handleCashPayment = async () => {
    if (isAddTip) {
      if (tipPrice && Math.abs(tipPrice) > 0) {
        setPriceError(false);
      } else {
        setPriceError(true);
        return;
      }
    }
    setOpenCash(true);
    onHide();
  };
  const handleCheckAddTip = (e) => {
    if (e?.target?.checked) {
      setIsAddTip(true);
      dispatch(handlePaymentFailedTotalAmount({ ...tipTotalAmount, isAddTip: true }));
    } else {
      setIsAddTip(false);
      dispatch(handlePaymentFailedTotalAmount({ ...tipTotalAmount, isAddTip: false }));
    }
  };

  const services = async (providerData) => {
    try {
      let options = [];
      providerData &&
        providerData?.map((s) => {
          options.push({
            value: s.id,
            label: s.name,
            image: s.image,
          });
        });
      setServiceData(options);
    } catch (error) { }
  };

  useEffect(() => {
    if (providerData) {
      services(providerData);
    }
  }, [providerData]);

  useEffect(() => {
    if (data) {
      setOptionSelected({
        value: data?.employee_id,
        label: data?.employeename,
        image: data?.employeeimage,
      });
      dispatch(handlePaymentFailedTotalAmount({
        ...tipTotalAmount, optionSelected: {
          value: data?.employee_id,
          label: data?.employeename,
          image: data?.employeeimage,
        }
      }));
      if (show) {
        setTipPrice(null)
        setIsAddTip(false);
        dispatch(handlePaymentFailedTotalAmount({
          tipPrice: null,
          isAddTip: false,
        }));
      }
    } else {
      dispatch(handlePaymentFailedTotalAmount({ ...tipTotalAmount, optionSelected: null }));
      setOptionSelected(null);
    }
  }, [show]);

  return (
    <>
      <Modal
        show={show}
        onHide={() => handlePaymentOptionModel()}
        aria-labelledby="example-modal-sizes-title-sm"
        centered
        className="sitback-modal-wrapper sitback-modalv2-wrapper"
      >
        <Modal.Header
          closeButton
          className="red-close-icon"
          onClick={() => handlePaymentOptionModel()}
        ></Modal.Header>
        <Modal.Body className="pt-0">
          <div className="sitback-option-modal-wrapper sitback-payment-tip-modal">
            <h5>Payment Options</h5>
            <p>
              Please select the preferred payment option for services provided to {data?.username}{" "}
              an amount of ${data?.userTotalAmount}
            </p>
            <div className="checkbox-list-wrapper available-times">
              <div className="checkbox-wrapper-div">
                <input
                  type="checkbox"
                  id="addtip"
                  name="addtip"
                  value="1"
                  className="form-check-input"
                  onChange={(e) => handleCheckAddTip(e)}
                />
                <label htmlFor={`addtip`}>
                  <p>Add Tip</p>
                </label>
              </div>
              {isAddTip ? (
                <>
                  <form>
                    <FormGroup controlId="formBasicEmail">
                      {/* <Label>{t("selectemployee")}</Label> */}
                      <ReactSelect
                        className="sitback-select2-container input-with-icon"
                        classNamePrefix="sitback-select-option"
                        placeholder="Select Employee"
                        //{...register("service")}
                        options={serviceData}
                        closeMenuOnSelect={true}
                        hideSelectedOptions={false}
                        components={{
                          SingleValue: IconSingleValue,
                          Option: IconOption,
                        }}
                        isSearchable={false}
                        onChange={handleChange}
                        allowSelectAll={true}
                        value={optionSelected}
                      />
                    </FormGroup>

                    <FormGroup controlId="formBasicEmail">
                      {/* <Label>{t("price")}</Label> */}
                      <div className="sitback-tip-payment-amount">
                        <Input
                          type="number"
                          // placeholder="$"
                          onChange={(e) => handleChangePrice(e)}
                          value={tipPrice}
                          min="0"
                        />
                        <InlineSVG
                          src={dollar_icon}
                          className="global_laguage_icon"
                        //onClick={(e) => handleSearch(e)}
                        />
                      </div>
                      {priceError ? <small className="text-danger">price is required</small> : ""}
                    </FormGroup>
                  </form>
                </>
              ) : (
                ""
              )}
            </div>
            <div className="sitback-option-modal-wrapper sitback-payment-tip-modal note-modal-wrapper">
              {isAddTip ? <>
                <p>Tip amount: <b>${tipPrice ? tipPrice : 0}</b></p>
                <p>Services amount: <b>${data?.userTotalAmount}</b></p>
                <p>Total amount: <b>${(tipPrice + data?.userTotalAmount)}</b></p>
              </> : ''}

            </div>
            <div className="addcard-footer-wrapper mb-3">
              {/* <Button onClick={() => cardAdd()}>Card payment</Button> */}
              <LoadingButton
                className="get-payment-btn"
                id={data?.id}
                disabled={getPaymentLoader}
                label={"Card payment"}
                loadinglabel={"Card payment"}
                isLoading={getPaymentLoader}
                // className="loading-btn-wrapper"
                // onClick={() => CapturePayment(data)}
                onClick={() => CapturePayment(data)}
              />
              {/* <Button className="cash-payment-btn" onClick={() => setOpenCash(true)}>Cash payment</Button> */}
              <Button className="cash-payment-btn" onClick={() => handleCashPayment(true)}>
                Cash payment
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <CashModal
        show={openCash}
        onHide={() => setOpenCash(false)}
        data={data}
        handlePaymentOptionModel={handlePaymentOptionModel}
      />
    </>
  );
};

export default PaymentOption;
