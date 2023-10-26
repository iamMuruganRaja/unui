import React, { useState } from "react";
import classes from "./RoleModal.module.css";
import SubmitButton from "../buttons/SubmitButton";
import DropdownInput from "../input/DropdownInput";

function RoleModal({ isOpen, handleSubmit, isButtonLoading, isUpdating }) {
  const [selectedValue, setSelectedValue] = useState("");

  if (!isOpen) return null;

  return (
    <div className={classes.modal_overlay}>
      <div className={classes.main_container}>
        <div>
          <h2 className={classes.modal_title}>
            Please select your role for the event...
          </h2>
        </div>

        <DropdownInput
          options={["Host", "Performer", "Audience"]}
          handleSelect={(e) => setSelectedValue(e)}
          placeholder="Select"
          selectedValue={selectedValue}
        />

        <SubmitButton
          title={isUpdating ? "Update" : "Register"}
          onClick={() => handleSubmit(selectedValue)}
          loading={isButtonLoading}
        />
      </div>
    </div>
  );
}

export default RoleModal;
