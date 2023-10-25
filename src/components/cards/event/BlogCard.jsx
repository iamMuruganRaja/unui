import {
  faUndo,
} from "@fortawesome/free-solid-svg-icons";

import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ImageArea from "./ImageArea";
import MainArea from "./MainArea";
import CombinedForm from "./CombinedForm";
import dayjs from "dayjs";
import EventForm from "../../../pages/event-form/EventForm";
import { useNavigate } from "react-router-dom";
import { faCog, faBell, faComment, faDownload } from '@fortawesome/free-solid-svg-icons'; 
import * as htmlToImage from "html-to-image";

const CardContainer = styled.div`
  // Your styling for the card container
`;

const BlogCard = ({ event }) => {
  const [flipped, setFlipped] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedCommunication, setSelectedCommunication] = useState("");
  const [customMessage, setCustomMessage] = useState("");
  const navigate = useNavigate();

  const flip = () => {
    setFlipped(!flipped);
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleCommunicationChange = (event) => {
    const selected = event.target.value;
    if (selected === "custom") {
      setSelectedCommunication(selected);
      setCustomMessage("");
    } else {
      setSelectedCommunication(selected);
    }
  };

  const handleCustomMessageChange = (event) => {
    setCustomMessage(event.target.value);
  };
  const handleRedirectToEventForm = () => {
    // Navigate to the EventForm component with any necessary data
    navigate("/events", { state: { event: event } });

  
  };
  const handleDownload = () => {
    htmlToImage
      .toBlob(document.getElementById("card-to-download"))
      .then(function (blob) {
        var bloblink = URL.createObjectURL(blob);
        var link = document.createElement("a");

        document.body.appendChild(link); // for Firefox

        link.setAttribute("href", bloblink);
        link.setAttribute("download", "image.png");
        link.style.display = "none";
        link.click();
      });
  };

  const handleSubmitCommunication = () => {
    // Handle form submission here
    console.log("Selected Communication: ", selectedCommunication);
    console.log("Custom Message: ", customMessage);

    // Add your API call here

    // Reset the form and hide it
    setSelectedCommunication("Reminder_1");
    setCustomMessage("");
    setShowForm(false);
  };

  const handleCancelCommunication = () => {
    // Handle form cancellation here
    setSelectedCommunication("Reminder_1");
    setCustomMessage("");
    setShowForm(false);
  };

  return (
    <CardContainer className={`CardContainer ${flipped ? "flipped" : ""}`}>
      
      <div className="Front" id="card-to-download">
        <br></br>
        {/* <div className="cta-button"  onClick={handleDownload}>
            <FontAwesomeIcon
              icon={faDownload}
              style={{
                color: "#2ed365",
                position: "absolute",
                top: "10px",
                right: "10px",
                size:"xl"
              }}
            />
          </div> */}
      
        <ImageArea event={event} />
        <MainArea
          showForm={showForm}
          toggleForm={toggleForm}
            selectedCommunication={selectedCommunication}
            
            handleSubmitCommunication={handleSubmitCommunication}
            handleCancelCommunication={handleCancelCommunication}
          flipCard={flip}
          event={event}
        />
         
        {/* {true && (
          <EventForm
            event={event} // Pass event details as props to the EventForm component
          />
        )} */}
        
      </div>
      <div className="Back">
        <div className="cta-buttons">
          <div className="cta-button" onClick={flip}>
            <FontAwesomeIcon
              icon={faUndo}
              style={{
                color: "#2ed365",
                position: "absolute",
                top: "10px",
                right: "10px",
              }}
            />
          </div>
          <div style={{ textAlign: "center", fontWeight: "bold", color: "#2ed365" }}>
           Event - {event.name}
            </div>
          
          <CombinedForm
            selectedCommunication={selectedCommunication}
            handleCommunicationChange={handleCommunicationChange}
            customMessage={customMessage}
            handleCustomMessageChange={handleCustomMessageChange}
            handleSubmitCommunication={handleSubmitCommunication}
            handleCancelCommunication={handleCancelCommunication}
            event={event}
          />
        </div>
      </div>
    </CardContainer>
  );
};

export default BlogCard;
