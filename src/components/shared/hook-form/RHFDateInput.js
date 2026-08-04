import PropTypes from "prop-types";
import { Form } from "react-bootstrap";
import Flatpickr from "react-flatpickr";

// form
import { Controller, useFormContext } from "react-hook-form";

RHFDateInput.propTypes = {
  name: PropTypes.string,
};

export default function RHFDateInput({
  name,
  id,
  label = "",
  placeholder = "",
  dateInputProps = {},
  ...other
}) {
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
          <Flatpickr
            render={({ value, ...props }, ref) => {
              return (
                <Form.Control
                  id={id}
                  aria-describedby={id}
                  className="form-control"
                  placeholder={placeholder}
                  value={value}
                  {...props}
                  ref={ref}
                />
              );
            }}
            onChange={(selectedDates) =>
              field.onChange(new Date(selectedDates[0]))
            }
            value={field.value}
            {...dateInputProps}
          />
          <Form.Text id={id} className="text-danger">
            {error ? error?.message : ""}
          </Form.Text>
        </>
      )}
      {...other}
    />
  );
}
