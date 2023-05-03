import React from "react";

import classes from "./OtpModal.module.css";
import OTPInput from "react-otp-input";
import SubmitButton from "../buttons/SubmitButton";

function OtpModal({ isOpen, form, setKey, handleSubmit, phone }) {
  if (!isOpen) return <></>;

  return (
    <div className={classes.modal_overlay}>
      <div className={classes.main_container}>
        <div>
          <h2 className={classes.modal_title}>Enter Otp</h2>
          <h3 className={classes.modal_subtitle}>
            OTP has been sent on whatsapp to {phone}
          </h3>
        </div>

        <OTPInput
          shouldAutoFocus
          value={form.otp}
          inputType="number"
          onChange={(e) => setKey("otp", e)}
          numInputs={6}
          renderSeparator={<span>&nbsp;&nbsp;</span>}
          renderInput={(props) => <input {...props} />}
          inputStyle={{
            width: 40,
            height: 40,
            backgroundColor: "#B2C990",
            borderRadius: 4,
            border: "none",
          }}
        />

        <SubmitButton
          title="Verify OTP"
          onClick={handleSubmit}
          style={{ alignSelf: "center" }}
        />
      </div>
    </div>
  );
}

export default OtpModal;
