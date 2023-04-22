import { useState } from "react";
import registerHero from "../../assets/register-hero.png";
import DropdownInput from "../../components/input/DropdownInput";
import TextInput from "../../components/input/TextInput";

import classes from "./RegisterPage.module.css";
import SwitchInput from "../../components/input/SwitchInput";
import SubmitButton from "../../components/buttons/SubmitButton";
import DateInput from "../../components/input/DateInput";
import useForm from "../../components/hooks/useForm";

const RegisterPage = () => {
  const [selectedValue, setSelectedValue] = useState();
  const { form, setKey } = useForm(
    { shouldSaveInformation: false },
    { shouldSaveInformation: () => {} }
  );

  const handleSelect = (value) => {
    setSelectedValue(value);
  };

  return (
    <h1 className={classes.main_container}>
      <img src={registerHero} className={classes.hero_image} />
      <TextInput placeholder="Email or Phone Number" />
      <TextInput placeholder="First Name" />
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
      <div style={{ width: 267, paddingLeft: 10 }}>
        <SubmitButton title="SUBMIT" />
      </div>
    </h1>
  );
};

export default RegisterPage;
