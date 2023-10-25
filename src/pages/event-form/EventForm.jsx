import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import TextInput from "../../components/input/TextInput";
import DropdownInput from "../../components/input/DropdownInput";
import useForm from "../../components/hooks/useForm";
import SubmitButton from "../../components/buttons/SubmitButton";
import classes from "./EventForm.module.css";
import SplashScreen from "../../components/splash/SplashScreen";
import { updateEvent, createEvent } from "../../services/events.services";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";

const EventForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { form, setKey } = useForm({
    name: "",
    description: "",
    start_time: "",
    end_time: "",
    bg_image_url: "",
    genre: "",
    mode: "online",
    link: "",
    location: "",
    status: "",
  });
  const createEventValidation = {
    name: !!form.description,
    description: !!form.description,
    start_time: !!form.start_time,
    end_time: !!form.end_time,
    bg_image_url: !!form.bg_image_url,
    link: !!form.link,
  };

  const updateEventValidation = {
    name: !form.description,
    description: !form.description,
    start_time: !form.start_time,
    end_time: !form.end_time,
    bg_image_url: !form.bg_image_url,
    link: !form.link,
  };

  const [validation, setValidation] = useState(createEventValidation);
  const isFormValid = Object.values(validation).every((isValid) => isValid);

  const getAsset = (event, asset_key) => {
    return event.event_assets.filter((asset) => asset_key === asset.key)[0];
  };
  const getShortUrl = () => location.state.event && location.state.event.short_url !== null ? location.state.event.short_url : null;


  useEffect(() => {
    const eventToUpdate = location.state ? location.state.event : null;
    
    if (eventToUpdate) {
      setFormFields(eventToUpdate);
      setValidation(updateEventValidation)
    }
    else{
    
      setValidation(createEventValidation)
    }
  }, [location.state]);

  const setFormFields = (event) => {
    setKey("name", event.name);
    setKey("description", event.description);
    setKey("start_time", format(new Date(event.start_time), "yyyy-MM-dd'T'HH:mm"));
    setKey("end_time", format(new Date(event.end_time), "yyyy-MM-dd'T'HH:mm"));
    setKey("bg_image_url", getAsset(event, "background")?.value.link);
    setKey("genre", event.genre);
    setKey("mode", event.mode);
    setKey("link", event.link);
    setKey("status", event.status);
    setKey("location", event.location);

    const originalDate = new Date(event.start_time);

// Format the date in your desired format
const formattedDateStr = format(new Date(event.start_time), "yyyy-MM-dd'T'HH:mm");
  };

  const handleInputChange = (property, value) => {
    setKey(property, value);

    // Remove red border when a property is filled
    setValidation({
      ...validation,
      [property]: !!value,
    });
  };

  const handleEventSubmit = async () => {
    const eventToUpdate = location.state ? location.state.event : null;

    if (eventToUpdate) {
      const eventId = eventToUpdate.uuid;
      const updatedEvent = {
        name: form.name,
        description: form.description,
        start_time: form.start_time,
        end_time: form.end_time,
        bg_image_url: form.bg_image_url,
        genre: form.genre,
        mode: form.mode,
        link: form.link,
        status: form.status,
      };

      const { error } = await updateEvent(eventId, updatedEvent);

      if (!!error) return;
    } else {
      const eventToBeCreated = {
        name: form.name,
        description: form.description,
        start_time: form.start_time,
        end_time: form.end_time,
        bg_image_url: form.bg_image_url,
        genre: form.genre,
        mode: form.mode,
        link: form.link,
        status: form.status,
      };
      createEvent(eventToBeCreated);
    }
    location.state.event = null;
    navigate("/upcoming");
  };

  const handleCancel = async () => {
    navigate(-1);
    location.state.event = null;
  };

  const validateForm = () => {
    // Check if all mandatory fields are filled
    return Object.values(validation).every((isValid) => isValid);
  };

  return (
    <SplashScreen>
      <div className={classes.eventForm}>
        <div className={classes.titleContainer}>
          <Link to="/upcoming">
            <FontAwesomeIcon icon={faArrowLeft} className={classes.backArrow} />
          </Link>
          <h5 className={classes.subtitle}>
            {location.state.event ? "Update Event Details" : "Create a New Event"}
          </h5>
        </div>
        {getShortUrl()?
        <div>
        <br></br>
        <label className={classes.formLabel}>Link<br></br></label>
        <a href={getShortUrl()} >
  <label className={classes.formLabel}>{getShortUrl()}</label>
</a>
<br></br>
<br></br>
</div>:
<></>
}


        <div className={classes.formGroup}>
          <label className={classes.formLabel}>Name</label>
          <TextInput
            placeholder="Name your event"
            className={classes.textInput}
            value={form.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            style={{
              borderColor: validation.name ? "#4caf50" : "red",
            }}
          />
        </div>


        <div className={classes.formGroup}>
          <label className={classes.formLabel}>Description</label>
          <TextInput
            placeholder="Description of the event"
            className={classes.textareaInput}
            value={form.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            style={{
              borderColor: validation.description ? "#2ed365" : "red",
            }}
          />
        </div>

        <div className={classes.formGroup}>
          <label className={classes.formLabel}>Mode</label>
          <DropdownInput
            options={["Online", "Offline"]}
            placeholder="Online"
            className={classes.dropdownInput}
            selectedValue={form.mode}
            handleSelect={(value) => handleInputChange("mode", value)}
          />
        </div>

        <div className={classes.formGroup}>
          <label className={classes.formLabel}>Status</label>
          <DropdownInput
            options={["draft", "created","on_hold","published","scheduled","live","cancelled"]}
            placeholder="Select"
            className={classes.dropdownInput}
            selectedValue={form.status}
            handleSelect={(value) => handleInputChange("status", value)}
          />
        </div>
        <div className={classes.formGroup}>
          <label className={classes.formLabel}>Start Time</label>
          <TextInput
            placeholder="Start Time"
            type="datetime-local"
            className={classes.datetimeInput}
            value={form.start_time}
            onChange={(e) => handleInputChange("start_time", e.target.value)}
            style={{
              borderColor: validation.start_time ? "#4caf50" : "red",
            }}
          />
        </div>

        <div className={classes.formGroup}>
          <label className={classes.formLabel}>End Time</label>
          <TextInput
            placeholder="End Time"
            type="datetime-local"
            className={classes.datetimeInput}
            value={form.end_time}
            onChange={(e) => handleInputChange("end_time", e.target.value)}
            style={{
              borderColor: validation.end_time ? "#4caf50" : "red",
            }}
          />
        </div>

        <div className={classes.formGroup}>
          <label className={classes.formLabel}>Event Card Image</label>
          <TextInput
            placeholder="Enter the URL of the image"
            className={classes.textInput}
            value={form.bg_image_url}
            onChange={(e) => handleInputChange("bg_image_url", e.target.value)}
            style={{
              borderColor: validation.bg_image_url ? "#4caf50" : "red",
            }}
          />
        </div>

        <div className={classes.formGroup}>
          <label className={classes.formLabel}>Link of the event</label>
          <TextInput
            placeholder="Zoom Link"
            className={classes.textInput}
            value={form.link}
            onChange={(e) => handleInputChange("link", e.target.value)}
            style={{
              borderColor: validation.link ? "#4caf50" : "red",
            }}
          />
        </div>

        <div className={classes.formGroup}>
          <label className={classes.formLabel}>Genre</label>
          <DropdownInput
            options={["Comedy", "Cricket", "Poetry", "Mixed"]}
            placeholder="Genre"
            className={classes.dropdownInput}
            selectedValue={form.genre}
            handleSelect={(value) => handleInputChange("genre", value)}
          />
        </div>

        <div className={classes.submitButtonContainer}>
          <SubmitButton
            title="Save"
            className={`${classes.submitButton} ${
              !Object.values(validation).every((isValid) => isValid)
                ? classes.disabledButton
                : ""
            }`}
            onClick={handleEventSubmit}
          />
          <div className={classes.buttonSpacing}></div>
          <SubmitButton
            title="Cancel"
            className={classes.submitButton}
            onClick={handleCancel}
            disabled={!Object.values(validation).every((isValid) => isValid)}
          />
        </div>
        <br></br>
        <br></br>
        <br></br>
      </div>
    </SplashScreen>
  );
};

export default EventForm;
