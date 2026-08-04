// import LoadingButton from "@/components/shared/button/LoadingButton";

import { useRouter } from "next/navigation";
import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { handleLoginTab } from "@/redux/authCheck";
import { PATH_AUTH } from "@/routes/paths";

const VerifyMessagePopup = ({
  show,
  //   handleClose,
  onHide = () => { },
  appleData,
}) => {

  const dispatch = useDispatch();
  const { push } = useRouter();

  const handleRedirect = (key) => {
    // handleLoginTab
    dispatch(handleLoginTab(key));
    push(PATH_AUTH?.signIn);
  };

  return (
    <Modal
      className="confirm-delete-modal confirm-service-modal-wrapper verify-your-account-modal-wrapper"
      show={show}
      onHide={() => onHide()}
      centered
    >
      <Modal.Body className="verify-account-modal-body mt-0">
        <button
          type="button"
          className="verify-account-modal-close"
          onClick={() => onHide()}
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
        <div className="verify-account-modal-top">
          <div className="verify-account-modal-illustration">
            <img alt="" src="/images/email-iconv.svg" />
          </div>
        </div>
        <div className="verify-account-modal-bottom">
          {appleData ?
          <>
            <h4 className="success-modal-title-text">
              Your request is currently under the admin approval process.
            </h4>
            <p className="success-modal-para-text mb-1">
             Please wait for the approval confirmation email.
            </p>
            <p className="success-modal-para-text">
                Get ready to sit back and relax.
              </p>
          </> :
            <>
              <h4 className="success-modal-title-text">
                Check Your Email To Verify Your Account!
              </h4>
              <p className="success-modal-para-text">
                Get ready to sit back and relax.
              </p>
            </>
          }
          <Button
            type="button"
            onClick={() => handleRedirect("first")}
            className="success-modal-btn"
          >
            Done
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default VerifyMessagePopup;
