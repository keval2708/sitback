import React from "react";
import { Modal } from "react-bootstrap";

const NoteList = ({ show, onHide = () => { }, note }) => {
  const cancel = async () => {
    onHide();
  };

  return (
    <>
      <Modal
        show={show}
        onHide={() => cancel()}
        aria-labelledby="example-modal-sizes-title-sm"
        centered
        className="sitback-modal-wrapper sitback-modalv2-wrapper sitback-updated-note-modal-wrapper"
      >
        <Modal.Header closeButton className="red-close-icon "></Modal.Header>
        <Modal.Body className="pt-0">
          <div className="sitback-option-modal-wrapper sitback-payment-tip-modal note-modal-wrapper">
            <h5>Note!</h5>
            <p>{note?.notes}</p>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default NoteList;
