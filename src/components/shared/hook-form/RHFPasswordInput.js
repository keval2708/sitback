import PropTypes from "prop-types";
import { Form } from "react-bootstrap";
// form
import { Controller, useFormContext } from "react-hook-form";
import InlineSVG from "svg-inline-react";
import { useToggle } from "@/hooks";
import { Input } from "@/styles/global/main.style";
import {
  ViewHide_icon,
  ViewShow_icon,
} from "@/styles/svgs";

RHFPasswordInput.propTypes = {
  name: PropTypes.string,
};

export default function RHFPasswordInput({
  name,
  id,
  className = "",
  label = "",
  placeholder = "",
  ...other
}) {
  const { toggle, onToggle } = useToggle(false);

  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <>
          {label ? (
            <Form.Label htmlFor={id} className="form-label">
              {label}
            </Form.Label>
          ) : (
            ""
          )}
          <div className="input-group input-password-show-and-hide-wrapper">
            <Input
              type={toggle ? "text" : "password"}
              id={id}
              aria-describedby={id}
              className={ className || "form-control"}
              placeholder={placeholder}
              autoComplete="on"
              {...field}
            />
            <a
              className="input-group-text"
              onClick={onToggle}
            >
              <i className={`bx bx-${toggle ? "show" : "hide"}`}>
                <span className="view-icon">
                  <InlineSVG src={ViewShow_icon} className="down-icon" />
                </span>
                <span className="hide-icon">
                  <InlineSVG src={ViewHide_icon} className="down-icon" />
                </span>
              </i>
            </a>
          </div>
          <Form.Text id={id} className="text-danger">
            {error ? error?.message : ""}
          </Form.Text>
        </>
      )}
      {...other}
    />
  );
}
