import React from "react";
import dayjs from "dayjs";
import { Link, useLocation } from "react-router-dom";
import { dateFormatter, timeFormatter  } from "../../../utils/formatter.utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  
  faPeopleGroup,
  faMicrophoneLines
  
} from "@fortawesome/free-solid-svg-icons";




const ImageArea = ({ event }) => {
  

  const getAsset = (event, asset_key) => {
    return event.event_assets.filter((asset) => asset_key === asset.key)[0];
  };

  

  const getHost = (event) => {
    return event.event_participants.filter((part) => part.role === "Host")[0];
  };
  return (
    <div className="ImageContainer">
      <img
        className="card-image"
        src="https://thumbs.dreamstime.com/z/vintage-paper-texture-abstract-background-art-music-microphone-32061046.jpg?w=768"
        alt="Blog Post"
      />
      <div className="image-overlay">
        <p className="time-description"> {timeFormatter(event.start_time)}</p>
        <p className="card-description">{event.name}</p>
        <p className="theme">Theme: {event.genre}</p>
        <p className="host">Host: {getHost(event)?.profile_info?.first_name}</p>
        <div className="date_box">
          {dateFormatter(event.start_time)}
          
        </div>
       
        <div className="participants">
          <p className="participant_count">
            {event.event_participants.length}{" "}
            {/* <Link to={`/participants/${event.uuid}`}> */}
              <FontAwesomeIcon icon={faPeopleGroup} style={{ color: "#e1e2e5" }} />
            {/* </Link> */}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImageArea;
