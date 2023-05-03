import React from "react";

import classes from "./SubmitButton.module.css";
import LoadingComponent from "../loading/LoadingComponent";

function SubmitButton({ title, loading, ...props }) {
  return (
    <button className={classes.button_container} {...props}>
      {loading ? (
        <LoadingComponent fill={false} color="white" size={20} />
      ) : (
        title
      )}
    </button>
  );
}

export default SubmitButton;
