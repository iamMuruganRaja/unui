import registerHero from "../../assets/edit-hero.png";
import logo from "../../assets/logo-white.svg";
import TextInput from "../../components/input/TextInput";
import DropdownInput from "../../components/input/DropdownInput";

import classes from "./EditProfile.module.css";
import SubmitButton from "../../components/buttons/SubmitButton";
import useForm from "../../components/hooks/useForm";
import { useAuthContext } from "../../components/contexts/AuthContext";
import { updateProfile } from "../../services/user.services";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Switch from "react-switch";
import { useState } from "react";

const EditProfilePage = () => {
  const { authData } = useAuthContext();
  const navigate = useNavigate();

  const [areTermsAccepted, setAreTermsAccepted] = useState(false);

  const userData = authData.userData;

  const { form, setKey } = useForm({
    name: userData.name || "",
    social_media_link: userData.social_media_link || "",
    role: userData.role || "",
  });

  const handleUpdateProfile = async () => {
    const { data, error } = await updateProfile(form);

    if (!!error) return;

    toast.success(data.message);

    const eventId = localStorage.getItem("event_id");

    if (!!eventId) return navigate(`/event?event_id=${eventId}`);

    navigate("/");
  };

  return (
    <h1 className={classes.main_container}>
      <img src={registerHero} className={classes.hero_image} alt="Hero" />
      <img src={logo} alt="Hero" />
      <h4 className={classes.subtitle}>Only one step away...</h4>
      <TextInput
        placeholder="First Name"
        value={form.first_name}
        onChange={(e) => setKey("first_name", e.target.value)}
      />
      <TextInput
        placeholder="Social Media Link"
        value={form.social_media_link}
        onChange={(e) => setKey("social_media_link", e.target.value)}
      />
      <DropdownInput
        options={["Host", "Performer", "Audience"]}
        handleSelect={(e) => setKey("role", e)}
        placeholder="Select Role"
        selectedValue={form.role}
      />
      <p className={classes.terms_conditions}>
        I accept terms and conditions
        <Switch
          onChange={setAreTermsAccepted}
          checked={areTermsAccepted}
          checkedIcon={false}
          uncheckedIcon={false}
          offColor="#939393"
          onColor=""
        />
      </p>

      <SubmitButton title="Save" onClick={handleUpdateProfile} />
    </h1>
  );
};

export default EditProfilePage;
