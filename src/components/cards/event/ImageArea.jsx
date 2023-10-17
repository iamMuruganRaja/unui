import React from "react";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  
  faPeopleGroup,
  
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
        <p className="card-description">{event.description}</p>
        <p className="theme">Theme: {event.genre}</p>
        <p className="host">Host: {getHost(event)?.profile_info?.first_name}</p>
        <div className="date_box">
          {dayjs(event.start_time).format("DD MMM")}
        </div>
        <div className="participants">
          <p className="participant_count">
            {event.event_participants.length}{" "}
            <FontAwesomeIcon icon={faPeopleGroup} style={{ color: "#e1e2e5" }} />
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImageArea;
