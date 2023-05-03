import React from "react";
import classes from "./MobileInput.module.css";

function MobileInput({ ...props }) {
  return <input className={classes.main_container} {...props} />;
}

export default MobileInput;
