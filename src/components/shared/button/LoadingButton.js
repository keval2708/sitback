import React from "react";
import Spinner from "react-bootstrap/Spinner";
import { Button } from "@/styles/global/main.style";

const LoadingButton = ({ disabled, isLoading, label, loadinglabel, variant='primary', ...rest }) => {
  return (
    <>
      <Button variant={variant} disabled={disabled} {...rest}>
        {isLoading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : null}
        {isLoading ? loadinglabel : label}
      </Button>
    </>
  );
};

export default LoadingButton;
