import registerHero from "../../assets/profile-hero.svg";
import TextInput from "../../components/input/TextInput";

import classes from "./EditProfile.module.css";
import SubmitButton from "../../components/buttons/SubmitButton";
import useForm from "../../components/hooks/useForm";
import { useAuthContext } from "../../components/contexts/AuthContext";
import { updateProfile } from "../../services/user.services";
import { useNavigate } from "react-router-dom";

const EditProfilePage = () => {
  const { authData } = useAuthContext();
  const navigate = useNavigate();

  const userData = authData.userData;

  const { form, setKey } = useForm(
    {
      first_name: userData.first_name || "",
      last_name: userData.last_name || "",
      social_media_link: userData.social_media_link || "",
    },
    {
      first_name: () => {},
      last_name: () => {},
      social_media_link: () => {},
    }
  );

  const handleUpdateProfile = async () => {
    const { data, error } = await updateProfile(form);

    if (!!error) return false;

    alert(data.message);

    const eventId = localStorage.getItem("event_id");

    console.log({ eventId });

    if (!!eventId) return navigate(`/event?event_id=${eventId}`);

    navigate("/");
  };

  return (
    <h1 className={classes.main_container}>
      <img src={registerHero} className={classes.hero_image} alt="Hero" />
      <TextInput
        placeholder="First Name"
        value={form.first_name}
        onChange={(e) => setKey("first_name", e.target.value)}
      />
      <TextInput
        placeholder="Last Name"
        value={form.last_name}
        onChange={(e) => setKey("last_name", e.target.value)}
      />
      <TextInput
        placeholder="Social Media Link"
        value={form.social_media_link}
        onChange={(e) => setKey("social_media_link", e.target.value)}
      />
      <div style={{ width: 267, paddingLeft: 10 }}>
        <SubmitButton title="Save" onClick={handleUpdateProfile} />
      </div>
    </h1>
  );
};

export default EditProfilePage;
