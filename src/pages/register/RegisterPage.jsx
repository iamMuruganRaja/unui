import { useState } from "react";
import registerHero from "../../assets/register-hero.png";
import TextInput from "../../components/input/TextInput";

import classes from "./RegisterPage.module.css";
import SubmitButton from "../../components/buttons/SubmitButton";
import useForm from "../../components/hooks/useForm";
import { loginorsignup } from "../../services/auth.services";
import { useAuthContext } from "../../components/contexts/AuthContext";
import OtpModal from "../../components/modal/OtpModal";

const RegisterPage = () => {
  const { verifyOtp } = useAuthContext();

  const [hash, setHash] = useState("");
  const { form, setKey } = useForm({ phone: "" }, { phone: () => {} });

  const handleSendOtp = async () => {
    const { data, error } = await loginorsignup({ phone: form.phone });

    if (!!error) return;

    setHash(data.data.otp_uuid);
  };

  const handleVerifyOtp = async () => {
    await verifyOtp(form.otp, hash);
  };

  return (
    <h1 className={classes.main_container}>
      <img src={registerHero} className={classes.hero_image} alt="Hero" />
      <TextInput
        placeholder="Whatsapp Number"
        value={form.phone}
        onChange={(e) => setKey("phone", e.target.value)}
        type="number"
      />
      <SubmitButton title="Get OTP" onClick={handleSendOtp} />
      <OtpModal
        isOpen={!!hash}
        phone={form.phone}
        form={form}
        setKey={setKey}
        handleSubmit={handleVerifyOtp}
      />
    </h1>
  );
};

export default RegisterPage;
