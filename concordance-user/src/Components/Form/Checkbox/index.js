import React from "react";
import PropTypes from "prop-types";

const Checkbox = ({ label, selected, styleClass, onChange }) => {
  const handleChange = (event) => {
    const { checked } = event.target;
    onChange(checked);
  };

  return (
    <div className={`${styleClass}`}>
      <label className="d-flex">
        <input
          type="checkbox"
          value={selected}
          checked={selected}
          onChange={handleChange}
          className="mr-2"
        />
        {label}
      </label>
    </div>
  );
};

Checkbox.propTypes = {
  styleClass: PropTypes.string,
  selected: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

Checkbox.defaultProps = {
  styleClass: "",
};

export default Checkbox;
