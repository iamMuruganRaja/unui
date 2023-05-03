import React from "react";

import classes from "./LoadingComponent.module.css";
import { ClipLoader } from "react-spinners";

function LoadingComponent({ fill = true, color = "#30513E", size = 50 }) {
  return (
    <div
      className={
        fill ? classes.loading_container_fill : classes.loading_container
      }
    >
      <ClipLoader
        color={color}
        size={size}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default LoadingComponent;
