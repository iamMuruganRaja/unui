import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import CombinedForm from "./CombinedForm";
import {
  faCog,
  faBell,
  faLocationDot,
  faEdit,
  faPlus
} from "@fortawesome/free-solid-svg-icons";
import { useAuthContext } from "../../../components/contexts/AuthContext";
import { useNavigate } from "react-router-dom";



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
  const { authData } = useAuthContext();
  const isUserAParticipant = (event) => {
    if (!authData.isAuthenticated) return false;

    return (
      event.event_participants.filter(
        (part) => part.user_uuid === authData.userData.uuid
      ).length > 0
    );
  };

  const handleRedirectToEventForm = () => {
    // Navigate to the EventForm component with any necessary data
    navigate("/events", { state: { event: event } });

  
  };


  return (
    <div className="MainArea">
      <div className="blog-post">
        <div className="actions">
          <div className="action-icon" onClick={handleRedirectToEventForm}>
            <FontAwesomeIcon
              icon={faEdit}
              style={{
                color: "#2ed365",
                position: "absolute",
                top: "10px",
                right: "10px",
                size:"xl",
              }}
            />
          </div>
          

          <div className="location-icon">
            <FontAwesomeIcon
              icon={faLocationDot}
              size="xl"
              style={{ color: "#2ed365" }}
            />{" "}
            Zoom
          </div>

          <div className="bell-icon" onClick={flipCard}>
            <FontAwesomeIcon
              icon={faBell}
              size="xl"
              style={{ color: "#2ed365" }}
            />{" "}
            
          </div>

          {isUserAParticipant(event) ? (
                    <Link
                      to={`/details?event_id=${event.uuid}`}
                      className="circular_button">
                    
                      Details
                    </Link>
                  ) : (
                    <Link to={`/event?event_id=${event.uuid}`} className="circular_button">
            Register
          </Link>
                  )}

         
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
