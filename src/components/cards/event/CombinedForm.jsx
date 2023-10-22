import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { sendCommunication,updateEvent } from "../../../services/events.services";

const CombinedForm = (props) => {
  const {
    handleCancelCommunication,
    event, // Pass the event object as a prop
  } = props;

  const [eventState, setEventState] = useState(""); // Default state is "draft"
  const [selectedCommunicationValue, setSelectedCommunicationValue] = useState("");
  const [eventStateValueChanged, setEventStateValueChanged] = useState(false);
  const [communicationValueChanged, setCommunicationValueChanged] = useState(false);
  const [customMessage, setCustomMessage] = useState("");

  useEffect(() => {
    if (event.state !== eventState) {
      setEventStateValueChanged(true);
    } else {
      setEventStateValueChanged(false);
    }
  }, [event.state, eventState]);

  useEffect(() => {
    if (selectedCommunicationValue !== "") {
      setCommunicationValueChanged(true);
    } else {
      setCommunicationValueChanged(false);
    }
  }, [selectedCommunicationValue]);

  const handleUpdateEventState = () => {
    if (eventStateValueChanged) {
      // Call your update event state API here with event.uuid and eventState
      // Example:
      // updateEventState(event.uuid, eventState);

      const updatedEventState = {
        //   ...eventToUpdate,
          status:eventState
           
         };
      
      updateEvent(event.uuid, updatedEventState);
    }
  };

  const handleCommunicationChange = (e) => {
    setSelectedCommunicationValue(e.target.value);
  };

  const handleCustomMessageChange = (e) => {
    setCustomMessage(e.target.value);
  };

  const handleSendCommunication = () => {
    if (communicationValueChanged) {

      const communication_details = {
        //   ...eventToUpdate,
           communication_type: selectedCommunicationValue,
           message:customMessage}
           
         
      
      sendCommunication(event.uuid,communication_details)
      if (selectedCommunicationValue === "custom") {
        // Call your API to send custom communication with customMessage
        // Example:
        // sendCustomCommunication(event.uuid, customMessage);
        toast.success("Custom message sent successfully");
      } else {
        // Call your API to send selected communication with selectedCommunicationValue
        // Example:
        // sendSelectedCommunication(event.uuid, selectedCommunicationValue);
        toast.success("Reminder sent successfully");
      }
    }
    setEventState(event.state);
    setSelectedCommunicationValue("");
    setCustomMessage("");
  };

  return (
    <div className="form">
      Update Event State
      <select
        value={eventState}
        onChange={(e) => setEventState(e.target.value)}
      >
        
        <option value="draft">Draft</option>
        <option value="created">Created</option>
        <option value="on_hold">On Hold</option>
        <option value="published">Published</option>
        <option value="staged">Staged</option>
        <option value="live">Live</option>
        <option value="cancelled">Cancelled</option>
      </select>
      Send Communication
      <select
        value={selectedCommunicationValue}
        onChange={handleCommunicationChange}
        className="select"
        style={{ borderColor: "#2ed365" }}
      >
        
        <option value="event_scheduled">Event Scheduled</option>
        <option value="reminder_1">Reminder 1</option>
        <option value="reminder_2">Reminder 2</option>
        <option value="custom">Custom</option>
      </select>
      {selectedCommunicationValue === "custom" && (
        <textarea
          rows="4"
          value={customMessage}
          onChange={handleCustomMessageChange}
          placeholder="Enter custom message"
          style={{ borderColor: "#2ed365" }}
        ></textarea>
      )}
      <div className="form-buttons">
        <FontAwesomeIcon
          icon={faCheck}
          style={{ color: "#2ed365", marginRight: "10px" }}
          onClick={() => {
            handleUpdateEventState();
            handleSendCommunication();
          }}
        />
        <FontAwesomeIcon
          icon={faTimes}
          style={{ color: "#2ed365", marginLeft: "10px" }}
          onClick={handleCancelCommunication}
        />
      </div>
    </div>
  );
};

export default CombinedForm;
