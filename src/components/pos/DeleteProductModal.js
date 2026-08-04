"use client";

import React from "react";
import { Modal } from "react-bootstrap";
import {
  DeleteProductFooter,
  DeleteProductMessage,
  DeleteProductModalHeader,
  PosDeleteProductModalGlobalStyles,
} from "@/styles/pages/pos-inventory.style";

const DeleteProductModal = ({
  show,
  productName = "",
  deleting = false,
  onHide = () => {},
  onConfirm = () => {},
}) => {
  return (
    <>
      <PosDeleteProductModalGlobalStyles />
      <Modal
        show={show}
        onHide={onHide}
        centered
        className="sitback-modal-wrapper sitback-pos-delete-product-modal"
      >
        <DeleteProductModalHeader>
          <h3>Delete Product</h3>
          <button
            type="button"
            className="close-btn"
            onClick={onHide}
            aria-label="Close"
            disabled={deleting}
          >
            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12.5" cy="12.5" r="12.5" fill="white"/>
              <path d="M16.4025 6.38199C17.0152 5.76924 18.0065 5.76924 18.6193 6.38199C19.2319 6.99475 19.232 7.98608 18.6193 8.59879L14.7159 12.5011L18.6193 16.4054C19.2316 17.0177 19.2316 18.008 18.6193 18.6203C18.3141 18.9273 17.911 19.0802 17.5118 19.0802C17.1106 19.0802 16.7095 18.9274 16.4044 18.6203L12.5011 14.717L8.59777 18.6203C8.29252 18.9276 7.89079 19.0801 7.48937 19.0802C7.08798 19.0802 6.68627 18.9274 6.38097 18.6203C5.7682 18.0075 5.7682 17.0162 6.38097 16.4035L10.2843 12.5002L6.37999 8.59586C5.76799 7.98357 5.76774 6.99315 6.37999 6.38101C6.99443 5.76879 7.98551 5.76887 8.59581 6.38101L12.4991 10.2843L16.4025 6.38199Z" fill="#E32C1F"/>
              </svg>

          </button>
        </DeleteProductModalHeader>

        <Modal.Body>
          <DeleteProductMessage>
            Are You Sure You Want To Delete{" "}
            <strong>{productName || "this product"}</strong>? This Action Cannot Be Undone And Will
            Permanently Remove This Product From Your Inventory.
          </DeleteProductMessage>

          <DeleteProductFooter>
            <button type="button" className="cancel-btn" onClick={onHide} disabled={deleting}>
              Cancel
            </button>
            <button type="button" className="delete-btn" onClick={onConfirm} disabled={deleting}>
              {deleting ? "Deleting..." : "Delete Product"}
            </button>
          </DeleteProductFooter>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default DeleteProductModal;
