import React from "react";

import classes from "./ImageModal.module.css";

function ImageModal({ isOpen, toggle, image }) {
  if (!isOpen) return <></>;

  return (
    <button className={classes.modal_overlay} onClick={() => toggle()}>
      <div className={classes.main_container}>
        <img src={image} alt="default" className={classes.image} />
      </div>
    </button>
  );
}

export default ImageModal;
