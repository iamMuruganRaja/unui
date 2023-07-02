import { useEffect, useState } from "react";

import headphone from "../../assets/headphone.png";
import logo from "../../assets/logo-white.svg";
import whatsapp from "../../assets/whatsapp.svg";

import classes from "./RegisterPage.module.css";
import SubmitButton from "../../components/buttons/SubmitButton";
import useForm from "../../components/hooks/useForm";
import { loginorsignup } from "../../services/auth.services";
import { useAuthContext } from "../../components/contexts/AuthContext";
import OtpModal from "../../components/modal/OtpModal";
import { toast } from "react-toastify";
import MobileInput from "../../components/input/MobileInput";
import OTPInput from "react-otp-input";

const RegisterPage = () => {
  const { verifyOtp } = useAuthContext();

  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isYesSelected, setIsYesSelected] = useState(null);
  const [hash, setHash] = useState("");
  const { form, setKey } = useForm({ phone: "" });

  useEffect(() => {
    if (!!form?.otp && form.otp.length >= 6) handleVerifyOtp();
    // eslint-disable-next-line
  }, [form]);

  const handleSendOtp = async () => {
    if (!/^(\+\d{1,3}[- ]?)?\d{10}$/.test(form.phone)) {
      return toast.error("Invalid Mobile Number");
    }

    setIsSendingOtp(true);

    const { data, error } = await loginorsignup({ phone: form.phone });

    setIsSendingOtp(false);

    if (!!error) return;

    if (!data.status) return toast.error(data.errors[0]);

    setHash(data.data.otp_uuid);
  };

  const handleVerifyOtp = async () => {
    await verifyOtp(form.otp, hash);
  };

  return (
    <h1 className={classes.main_container}>
      <img src={headphone} />
      <img src={logo} />
      <h3 className={classes.title}>Join in the fun!</h3>
      {!hash ? (
        <>
          <MobileInput
            placeholder="Phone Number"
            value={form.phone}
            onChange={(e) => setKey("phone", e.target.value)}
            type="number"
          />
          <div className={classes.subtitle}>
            <p>Do you have WhatsApp?</p>
            <img src={whatsapp} className={classes.whatsapp_icon} />
            <div className={classes.button_group}>
              <button
                className={classes.button_group_item}
                onClick={() => setIsYesSelected(true)}
                style={isYesSelected ? { backgroundColor: "#939393" } : {}}
              >
                Yes
              </button>
              <button
                className={classes.button_group_item}
                onClick={() => setIsYesSelected(false)}
                style={
                  isYesSelected === false ? { backgroundColor: "#939393" } : {}
                }
              >
                No
              </button>
            </div>
          </div>
          <button onClick={handleSendOtp} className={classes.bottom_button}>
            {isYesSelected === null
              ? "Sign in"
              : isYesSelected
              ? "Send OTP via WhatsApp"
              : "Send OTP via SMS"}
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
          <button onClick={handleSendOtp} className={classes.bottom_button}>
            Enter OTP
          </button>
        </>
      )}
    </h1>
  );
};

export default RegisterPage;
