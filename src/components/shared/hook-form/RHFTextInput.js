import PropTypes from "prop-types";
import { Form } from "react-bootstrap";
// form
import { Controller, useFormContext } from "react-hook-form";

import {
  FormGroup,
  Input
} from '@/styles/global/main.style';

RHFTextInput.propTypes = {
  name: PropTypes.string,
};

export default function RHFTextInput({
  name,
  id,
  label = "",
  placeholder = "",
  type = "text",
  disabled = false,
  readOnly = false,
  autoComplete = "on",
  isSmallInputWrapper = false,
  ...other
}) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormGroup>
          {label ? (
            <Form.Label htmlFor={id} className="form-label">
              {label}
            </Form.Label>
          ) : (
            ""
          )}
          <Input
            type={type}
            id={id}
            aria-describedby={id}
            className="form-control"
            placeholder={placeholder}
            disabled={disabled}
            autoComplete={autoComplete}
            readOnly={readOnly}
            isSmallInputWrapper={isSmallInputWrapper}
            {...field}
          />
          <Form.Text id={id} className="text-danger">
            {error ? error?.message : ""}
          </Form.Text>
        </FormGroup>
      )}
      {...other}
    />
  );
}
