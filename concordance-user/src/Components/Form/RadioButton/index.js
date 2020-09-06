import React from "react";
import PropTypes from "prop-types";

const RadioButton = ({ label, selected, styleClass, onChange, value,disabled }) => {
  const handleChange = (event) => {
    const { value } = event.target;
    onChange(value);
  };

  return (
    <div className={`form-group mr-3 ${styleClass}`}>
      <label className="mb-0">
        <input
          type="radio"
          className="mr-2"
          value={value}
          checked={selected}
          onChange={handleChange}
          disabled={disabled}
        />
        {label}
      </label>
    </div>
  );
};

RadioButton.propTypes = {
  styleClass: PropTypes.string,
  selected: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

RadioButton.defaultProps = {
  styleClass: "",
};

export default RadioButton;
