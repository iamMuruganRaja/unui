import React from "react";
import PropTypes from "prop-types";

const TextInput = ({ label, name, type = "text", textarea = false }) => {
  return (
    <div className="text-input">
      <label htmlFor={name}>{label}</label>
      {textarea ? (
        <textarea id={name} name={name} rows="4"></textarea>
      ) : (
        <input type={type} id={name} name={name} />
      )}
    </div>
  );
};

TextInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  textarea: PropTypes.bool,
};

export default TextInput;
