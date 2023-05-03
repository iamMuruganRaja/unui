import { useEffect, useState } from "react";

import classes from "./RegisterPage.module.css";
import SubmitButton from "../../components/buttons/SubmitButton";
import useForm from "../../components/hooks/useForm";
import { loginorsignup } from "../../services/auth.services";
import { useAuthContext } from "../../components/contexts/AuthContext";
import OtpModal from "../../components/modal/OtpModal";
import { toast } from "react-toastify";
import MobileInput from "../../components/input/MobileInput";

const RegisterPage = () => {
  const { verifyOtp } = useAuthContext();

  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [maskedPhone, setMaskedPhone] = useState("");
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
    setMaskedPhone(data.data.masked_phone);
  };

  const handleVerifyOtp = async () => {
    await verifyOtp(form.otp, hash);
  };

  return (
    <h1 className={classes.main_container}>
      <MobileInput
        placeholder="Whatsapp Number"
        value={form.phone}
        onChange={(e) => setKey("phone", e.target.value)}
        type="number"
      />
      <SubmitButton
        title="Get OTP"
        onClick={handleSendOtp}
        loading={isSendingOtp}
      />
      <OtpModal
        isOpen={!!hash}
        phone={maskedPhone}
        form={form}
        setKey={setKey}
        handleSubmit={handleVerifyOtp}
      />
    </h1>
  );
};

export default RegisterPage;
