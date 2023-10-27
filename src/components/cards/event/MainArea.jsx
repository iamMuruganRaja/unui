import React from "react";

import { Link } from "react-router-dom";
import CombinedForm from "./CombinedForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCog,
  faBell,
  faLocationDot,
  faCheckDouble,
  faEdit,
  faPlus,
  faShareAlt,
  faDownload
} from "@fortawesome/free-solid-svg-icons";
import { useAuthContext } from "../../../components/contexts/AuthContext";
import { useNavigate } from "react-router-dom";


import confirmShare from "../../../assets/confirm-share.svg";
import confirmDownload from "../../../assets/confirm-download.svg";
import * as htmlToImage from "html-to-image";
import { useLocation } from "react-router-dom";



const MainArea = (props) => {
  const {
    showForm,
    toggleForm,
    selectedCommunication,
    handleCommunicationChange,
    customMessage,
    handleCustomMessageChange,
    handleSubmitCommunication,
    handleCancelCommunication,
    flipCard,
    event,
  } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const { authData } = useAuthContext();
  const isUserAParticipant = (event) => {
    if (!authData.isAuthenticated) return false;

    return (
      event.event_participants.filter(
        (part) => part.user_uuid === authData.userData.uuid
      ).length > 0
    );
  };

  const isUserEventCreator = (event) => {
    if (!authData.isAuthenticated) return false;
    return  event.created_by===authData.userData.uuid
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

  const handleShare = () => {
    try {
      if (!navigator?.share) return;
      const url= event.short_url || (`https://www.unmutex.in/event-details/${event.uuid}`)

      navigator.share({
        title: "Join me at the Unmutex event!\n\n",
        text: `Hey there! 🎉 I'm excited to share this amazing Unmutex event with you. It's going to be fantastic! 🚀\n\nClick the link below to register and secure your spot:\n${url}`,
      });
    } catch (err) {
      console.log(err);
    }
  };
  const isEventDetailsPage = location.pathname.includes("/event-details/");


  return (
    <div className="MainArea">
      <div className="blog-post" id="card-to-download">
        <div className="actions">
        {isUserEventCreator(event) ? (<div className="action-icon" onClick={handleRedirectToEventForm}>
            <FontAwesomeIcon
              icon={faEdit}
              style={{
                color: "#BF2B0B",
                position: "absolute",
                top: "10px",
                right: "10px",
                size:"xl",
              }}
            />
          </div>):
          <></>
        }
          
          <FontAwesomeIcon icon="fal fa-share-alt" />
          <div className="location-icon">
            <FontAwesomeIcon
              icon={faLocationDot}
              size="xl"
              style={{ color: "#2ed365" }}
            />{" "}
            Zoom
          </div>
          {isUserEventCreator(event) ? (
          <div className="bell-icon" onClick={flipCard}>
            <FontAwesomeIcon
              icon={faBell}
              size="xl"
              style={{ color: "#2ed365" }}
            />{" "}
            
            </div>):
          <div className="bell-icon" onClick={handleShare}>
          <FontAwesomeIcon
            icon={faShareAlt}
            size="xl"
            style={{ color: "#2ed365" }}
          />{" "}
          
          </div>}
          {isUserAParticipant(event) ? (
                  // If the user is a participant
                  isEventDetailsPage  ? (
                    // and not on 'details_page', show "Details" button
                    <div className="confirmed-icon" >
            <FontAwesomeIcon
              icon={faCheckDouble}
              beatFade
              size="xl"
              style={{ color: "#2ed365" }}
            />{" "}
            
            </div>
            


                  ) : <Link to={`/event-details/${event.uuid}`} className="circular_button">
                  Details
                  </Link>
                ) : 
                <Link to={`/event?event_id=${event.uuid}`} className="circular_button">
                Register
</Link>}




         
          <br></br>
        </div>
      </div>
      
      {/* {showForm && 
      (
        <CombinedForm
          selectedCommunication={selectedCommunication}
          handleCommunicationChange={handleCommunicationChange}
          customMessage={customMessage}
          handleCustomMessageChange={handleCustomMessageChange}
          handleSubmitCommunication={handleSubmitCommunication}
          handleCancelCommunication={handleCancelCommunication}
          
        />
      )} */}
    </div>
  );
};

export default MainArea;
