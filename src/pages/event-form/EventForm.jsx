import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TextInput from "../../components/input/TextInput";
import DropdownInput from "../../components/input/DropdownInput";
import useForm from "../../components/hooks/useForm";
import SubmitButton from "../../components/buttons/SubmitButton";
import classes from "./EventForm.module.css";
import SplashScreen from "../../components/splash/SplashScreen";
import { updateEvent, createEvent } from "../../services/events.services";

const EventForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { form, setKey } = useForm({
    name: "",
    description: "",
    start_time: "",
    end_time: "",
    bg_image: "",
    genre: "",
    mode: "online",
    link: "",
    location: "",
  });

  const [validation, setValidation] = useState({
    name: true,
    description: true,
    start_time: true,
    end_time: true,
    bg_image: true,
    link: true,
  });

  useEffect(() => {
    const eventToUpdate = location.state ? location.state.event : null;
    if (eventToUpdate) {
      setFormFields(eventToUpdate);
    }
  }, [location.state]);

  const setFormFields = (event) => {
    setKey("name", event.name);
    setKey("description", event.description);
    setKey("start_time", event.start_time);
    setKey("end_time", event.end_time);
    setKey("bg_image", event.bg_image);
    setKey("genre", event.genre);
    setKey("mode", event.mode);
    setKey("link", event.link);
    setKey("location", event.location);
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
     //   ...eventToUpdate,
        name: form.name,
        description: form.description,
        start_time: form.start_time,
        end_time: form.end_time,
        bg_image_url: form.bg_image,
        genre: form.genre,
        mode: form.mode,
        link: form.link,
        
      };
      
      const { error } = await updateEvent(eventId, updatedEvent);
    
        if (!!error) return;
    
      // Handle update logic
    } else {
      // Handle creation logic
      const eventToBeCreated = {
        //   ...eventToUpdate,
           name: form.name,
           description: form.description,
           start_time: form.start_time,
           end_time: form.end_time,
           bg_image_url: form.bg_image,
           genre: form.genre,
           mode: form.mode,
           link: form.link,
           
         };
      createEvent(eventToBeCreated)
    }

    navigate("/upcoming");
    
  };

  const validateForm = () => {
    // Check if all mandatory fields are filled
    return Object.values(validation).every((isValid) => isValid);
  };

  return (
    <SplashScreen>
      <div className={classes.eventForm}>
        <h4 className={classes.subtitle}>
          {location.state ? "Update Event Details" : "Create a New Event"}
        </h4>
        Event Name
        <div className={classes.formGroup}>
          <TextInput
            placeholder="Name your event"
            className={classes.textInput}
            value={form.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            style={{
              borderColor: validation.name ? "#2ed365" : "red",
            }}
          />
          Description
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
            <DropdownInput
              options={["Online", "Offline"]}
              placeholder="Mode"
              className={classes.dropdownInput}
              selectedValue={form.genre}
              handleSelect={(value) => handleInputChange("mode", value)}
            />
          </div>
        Start Time
        <div className={classes.formGroup}>
          <TextInput
            placeholder="Start Time"
            type="datetime-local"
            className={classes.datetimeInput}
            value={form.start_time}
            onChange={(e) => handleInputChange("start_time", e.target.value)}
            style={{
              borderColor: validation.start_time ? "#2ed365" : "red",
            }}
          />
          End Time
          <TextInput
            placeholder="End Time"
            type="datetime-local"
            className={classes.datetimeInput}
            value={form.end_time}
            onChange={(e) => handleInputChange("end_time", e.target.value)}
            style={{
              borderColor: validation.end_time ? "#2ed365" : "red",
            }}
          />
        </div>
        
        <div className={classes.formGroup}>
          Event Card Image
          <TextInput
            placeholder="Enter the URL of image"
            className={classes.textInput}
            value={form.bg_image}
            onChange={(e) => handleInputChange("bg_image", e.target.value)}
            style={{
              borderColor: validation.bg_image ? "#2ed365" : "red",
            }}
          />
        </div>
        Link of the event
        <div className={classes.formGroup}>
          <TextInput
            placeholder="Zoom Link"
            className={classes.textInput}
            value={form.link}
            onChange={(e) => handleInputChange("link", e.target.value)}
            style={{
              borderColor: validation.link ? "#2ed365" : "red",
            }}
          />
        </div>
        <div className={`${classes.formGroup} ${classes.sideBySideDropdowns}`}>
          <div className={classes.formGroup}>
            Genre
            <DropdownInput
              options={["Comedy", "Cricket", "Poetry", "Mixed"]}
              placeholder="Genre"
              className={classes.dropdownInput}
              selectedValue={form.genre}
              handleSelect={(value) => handleInputChange("genre", value)}
            />
          </div>
        </div>
        <div className={classes.submitButtonContainer}>
          <SubmitButton
            title="Save"
            className={classes.submitButton}
            onClick={handleEventSubmit}
          />
         <div className={classes.buttonSpacing}></div>
          <SubmitButton
            title="Cancel"
            className={classes.submitButton}
            onClick={handleEventSubmit}
          />
        </div>
        <br />
        <br />
        <br />
        <br></br>
      </div>
    </SplashScreen>
  );
};

export default EventForm;
