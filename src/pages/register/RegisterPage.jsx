import { useState } from "react";
import registerHero from "../../assets/register-hero.png";
import TextInput from "../../components/input/TextInput";

import classes from "./RegisterPage.module.css";
import SubmitButton from "../../components/buttons/SubmitButton";
import useForm from "../../components/hooks/useForm";
import OtpInput from "react-otp-input";
import { loginorsignup } from "../../services/auth.services";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../components/contexts/AuthContext";

const RegisterPage = () => {
  const { verifyOtp } = useAuthContext();

  const [hash, setHash] = useState("");
  const { form, setKey } = useForm({ phone: "" }, { phone: () => {} });

  const navigate = useNavigate();

  const handleSendOtp = async () => {
    const { data, error } = await loginorsignup({ phone: form.phone });

    if (!!error) return;

    setHash(data.data.otp_uuid);
  };

  const handleVerifyOtp = async () => {
    await verifyOtp({ otp_uuid: hash, otp: form.otp });
  };

  return (
    <h1 className={classes.main_container}>
      <img src={registerHero} className={classes.hero_image} alt="Hero" />
      {!hash && (
        <TextInput
          placeholder="Whatsapp Phone Number"
          value={form.phone}
          onChange={(e) => setKey("phone", e.target.value)}
        />
      )}
      {hash && (
        <OtpInput
          value={form.otp}
          onChange={(e) => setKey("otp", e)}
          numInputs={6}
          renderSeparator={<span>&nbsp;&nbsp;</span>}
          renderInput={(props) => <input {...props} />}
          inputStyle={{
            width: 30,
            height: 30,
            backgroundColor: "#B2C990",
            borderRadius: 4,
            border: "none",
          }}
        />
      )}
      {/*<TextInput placeholder="First Name" />
      <TextInput placeholder="Last Name" />
      <TextInput placeholder="Social Media Link" />
      <DropdownInput
        options={["Host", "Performer", "Audience"]}
        placeholder="Select role"
        handleSelect={handleSelect}
        selectedValue={selectedValue}
      />
      <SwitchInput
        label="Save my Information"
        isChecked={form.shouldSaveInformation}
        toggleCheck={() =>
          setKey("shouldSaveInformation", !form.shouldSaveInformation)
        }
      />
      <SwitchInput label="I agree to Terms and Conditions" />
      <DateInput placeholder="Availability to host" />
          */}
      <div style={{ width: 267, paddingLeft: 10 }}>
        {!hash ? (
          <SubmitButton title="Send OTP" onClick={handleSendOtp} />
        ) : (
          <SubmitButton title="Verify OTP" onClick={handleVerifyOtp} />
        )}
      </div>
    </h1>
  );
};

export default RegisterPage;
