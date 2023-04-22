import React from "react";

import classes from "./SubmitButton.module.css";

function SubmitButton({ title, ...props }) {
  return (
    <button className={classes.button_container} {...props}>
      {title}
    </button>
  );
}

export default SubmitButton;
