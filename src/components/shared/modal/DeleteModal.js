import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const DeleteModal = ({
  show,
  handleClose,
  handleConfirmDelete,
  messageBody,
  disabled = false
}) => {
  //hooks
  const { t } = useTranslation();

  return (
    <Modal className="confirm-delete-modal modal-white-bg" show={show} onHide={handleClose} centered>
      {/* <Modal.Header closeButton className="red-close-icon">
        <Modal.Title>{t('deleteConfirm')}</Modal.Title>
      </Modal.Header> */}
      {/* <Modal.Body>{t('deletemessage')}</Modal.Body> */}
      <Modal.Body>{messageBody || t('deletemessage')}</Modal.Body>
      <Modal.Footer>
        <Button disabled={disabled} variant="danger" className="mb-3 mb-sm-0" onClick={handleConfirmDelete}>
          {t('delete')}
        </Button>
        <Button variant="secondary" onClick={handleClose} className="cancel-btn-wrapper">
          {t('cancel')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
