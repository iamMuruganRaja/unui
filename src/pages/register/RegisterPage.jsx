import { useState } from "react";

import headphone from "../../assets/headphone.png";
import logo from "../../assets/logo-white.svg";

import classes from "./RegisterPage.module.css";
import useForm from "../../components/hooks/useForm";
import { loginorsignup } from "../../services/auth.services";
import { useAuthContext } from "../../components/contexts/AuthContext";
import { toast } from "react-toastify";
import MobileInput from "../../components/input/MobileInput";
import OTPInput from "react-otp-input";
import Switch from "react-switch";

const RegisterPage = () => {
  const { verifyOtp } = useAuthContext();

  const [areTermsAccepted, setAreTermsAccepted] = useState(true);

  const [hash, setHash] = useState("");
  const { form, setKey } = useForm({ phone: "" });

  const isButtonDisabled = () => {
    return !form?.otp || form.otp.length < 6 || !areTermsAccepted;
  };

  const handleSendOtp = async () => {
    if (!/^(\+\d{1,3}[- ]?)?\d{10}$/.test(form.phone)) {
      return toast.error("Invalid Mobile Number");
    }

    const { data, error } = await loginorsignup({ phone: form.phone });

    if (!!error) return;

    if (!data.status) return toast.error(data.errors[0]);

    setHash(data.data.otp_uuid);
  };

  const handleVerifyOtp = async () => {
    await verifyOtp(form.otp, hash);
  };

  return (
    <h1 className={classes.main_container}>
      <div className={classes.hero_container}>
        <img src={headphone} alt="hero" className={classes.hero} />
      </div>
      <img src={logo} alt="logo" />
      <h3 className={classes.title}>Join in the fun!</h3>
      {!hash ? (
        <>
          <MobileInput
            placeholder="Phone Number"
            value={form.phone}
            onChange={(e) => {
              if (e.target.value.length <= 10) setKey("phone", e.target.value);
            }}
            type="number"
          />
          <button
            onClick={handleSendOtp}
            className={classes.bottom_button}
            disabled={form.phone.length !== 10}
          >
            Send OTP via WhatsApp
          </button>
        </>
      ) : (
        <>
          <OTPInput
            shouldAutoFocus
            value={form.otp}
            inputType="number"
            onChange={(e) => setKey("otp", e)}
            numInputs={6}
            renderSeparator={<span>&nbsp;&nbsp;</span>}
            renderInput={(props) => <input {...props} />}
            inputStyle={{
              marginTop: 40,
              width: 40,
              height: 40,
              background: "transparent",
              border: "none",
              borderBottom: "1px solid #fff",
            }}
          />
          <button className={classes.resend_button}>Resend OTP</button>
          <p className={classes.terms_conditions}>
            I accept terms and conditions
            <Switch
              onChange={setAreTermsAccepted}
              checked={areTermsAccepted}
              checkedIcon={false}
              uncheckedIcon={false}
              offColor="#939393"
              onColor="#30513E"
            />
          </p>
          <button
            disabled={isButtonDisabled()}
            onClick={handleVerifyOtp}
            className={classes.bottom_button}
          >
            Verify OTP
          </button>
        </>
      )}
    </h1>
  );
};

export default RegisterPage;
