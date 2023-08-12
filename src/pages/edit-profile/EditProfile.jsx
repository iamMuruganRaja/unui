import React from "react";
import { useLocation } from "react-router-dom";
import registerHero from "../../assets/edit-hero.png";
import logo from "../../assets/logo-white.svg";
import TextInput from "../../components/input/TextInput";
import classes from "./EditProfile.module.css";
import useForm from "../../components/hooks/useForm";
import { useAuthContext } from "../../components/contexts/AuthContext";
import { updateProfile } from "../../services/user.services";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SubmitButton from "../../components/buttons/SubmitButton";

const EditProfilePage = () => {
  const { authData } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

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

  // Determine if all fields should be enabled
  const isEditProfile = location.pathname === "/edit-profile";

  return (
    <div className={classes.main_container}>
      <img src={registerHero} className={classes.hero_image} alt="Hero" />
      <img src={logo} alt="Logo" />
      <h4 className={classes.subtitle}>{isEditProfile ? "Update your profile ...":"Only one step away ..."}</h4>
      {/* Conditionally render the Name TextInput */}
      {(isEditProfile || !userData.first_name )&& (
        <TextInput
          placeholder="Name"
          value={form.first_name}
          onChange={(e) => setKey("first_name", e.target.value)}
        />
      )}
      
      {/* Conditionally render the Social Media TextInput */}
      {(isEditProfile || !userData.social_media_link )&& (
        <TextInput
          placeholder="Instagram/Youtube link"
          value={form.social_media_link}
          onChange={(e) => setKey("social_media_link", e.target.value)}
        />
      )}
      
      {/* Conditionally render the Role TextInput */}
      {(isEditProfile || !userData.role) && (
        <TextInput
          placeholder="About you"
          value={form.role}
          onChange={(e) => setKey("role", e.target.value)}
        />
      )}
      
      <SubmitButton title="Save" onClick={handleUpdateProfile} />{" "}
    </div>
  );
};

export default EditProfilePage;
