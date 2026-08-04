import { Modal } from "react-bootstrap";
import { Button } from "@/styles/global/main.style";
const Confirmation = ({
  show,
  handleClose = () => { },
}) => {



  return (
    <Modal
      show={show}
      onHide={handleClose}
      aria-labelledby="example-modal-sizes-title-lg"
      centered
      className="sitback-modal-wrapper warning-modal-wrapper"
    >
      <Modal.Header closeButton className="red-close-icon"></Modal.Header>
      <Modal.Body>
        <div className="sitback-request-modal-wrapper">
          <h5 style={{ color: '#295086' }}>Confirm</h5>
          <p>Payment is captured.</p>
        </div>
        <div className="modal-footer-div mb-2">
          <Button onClick={() => handleClose()}>Ok</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Confirmation;
