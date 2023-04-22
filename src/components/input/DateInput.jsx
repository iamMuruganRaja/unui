import React from "react";

import classes from "./DateInput.module.css";

function DateInput({ placeholder }) {
  return (
    <input
      type="date"
      placeholder={placeholder}
      className={classes.main_container}
    />
  );
}

export default DateInput;
