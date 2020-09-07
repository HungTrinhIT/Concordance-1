import React, { useState } from "react";
import PropTypes from "prop-types";
import "./input.css";
import { validateInput } from "../../../Services/Validator";

const Input = ({
  value,
  label,
  placeholder,
  validators,
  type,
  onChange,
  labelClass,
}) => {
  const [error, setError] = useState(false);

  const handleChange = (event) => {
    const { value } = event.target;
    setError(validateInput(validators, value));
    onChange(value);
  };

  return (
    <div className="form-group d-flex align-items-center">
      {label && (
        <label className={`mr-2 ${labelClass}`} htmlFor="app-input-field">
          {label}
        </label>
      )}
      {type === "textarea" ? (
        <textarea
          className="form-control"
          placeholder={placeholder}
          value={value}
          defaultValue={value}
          onChange={handleChange}
        />
      ) : (
        <div className="search__container">
          <input
            type={type}
            value={value}
            className="search__input"
            placeholder={placeholder}
            onChange={handleChange}
          />
        </div>
      )}
      {error && <span className="text-danger">{error.message}</span>}
    </div>
  );
};

Input.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  validators: PropTypes.array,
  type: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

Input.defaultProps = {
  value: "",
  label: "",
  placeholder: "",
  type: "text",
  validators: [],
};

export default Input;
