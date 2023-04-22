import React from "react";
import classes from "./TextInput.module.css";

function TextInput({ ...props }) {
  return <input className={classes.main_container} {...props} />;
}

export default TextInput;
