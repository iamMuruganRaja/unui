import React, { useState } from "react";

import classes from "./RoleModal.module.css";
import SubmitButton from "../buttons/SubmitButton";
import DropdownInput from "../input/DropdownInput";

function RoleModal({ isOpen, handleSubmit, isButtonLoading }) {
  const [selectedValue, setSelectedValue] = useState("");

  if (!isOpen) return <></>;

  return (
    <div className={classes.modal_overlay}>
      <div className={classes.main_container}>
        <div>
          <h2 className={classes.modal_title}>Select Role</h2>
        </div>

        <DropdownInput
          options={["Host", "Performer", "Audience"]}
          handleSelect={(e) => setSelectedValue(e)}
          placeholder="Select Role"
          selectedValue={selectedValue}
        />

        <SubmitButton
          title="Register"
          onClick={() => handleSubmit(selectedValue)}
          style={{ alignSelf: "center" }}
          loading={isButtonLoading}
        />
      </div>
    </div>
  );
}

export default RoleModal;
