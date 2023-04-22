import React from "react";

import classes from "./SwitchInput.module.css";

function SwitchInput({ label, isChecked, toggleCheck }) {
  return (
    <div className={classes.main_container}>
      <button
        className={`${classes.switch_outer} ${
          isChecked ? classes.switch_checked : ""
        }`}
        onClick={toggleCheck}
      >
        <span className={classes.white_switch} />
      </button>
      {label}
    </div>
  );
}

export default SwitchInput;
