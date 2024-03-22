import React, { useEffect, useState } from "react";

import heroImg from "../../assets/details-hero.png";
import editImg from "../../assets/pariticipant-edit-icon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import liveImg from "../../assets/live.png"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";


import instagramColor from "../../assets/instagram-color.svg";
import facebookColor from "../../assets/facebook-color.svg";
import twitterColor from "../../assets/twitter-color.svg";

import instagramMono from "../../assets/instagram-mono.svg";
import facebookMono from "../../assets/facebook-mono.svg";
import twitterMono from "../../assets/twitter-mono.svg";

import classes from "./ParticipantsPage.module.css";
import { Link, useParams } from "react-router-dom";
import { getEvent } from "../../services/events.services";
import LoadingComponent from "../../components/loading/LoadingComponent";
import { useAuthContext } from "../../components/contexts/AuthContext";

function ParticipantsPage() {
  const { eventId } = useParams();

  const { authData } = useAuthContext();
  const [eventDetails, setEventDetails] = useState(null);

  useEffect(() => {
    (async () => {
      const { data, error } = await getEvent(eventId);

      if (!!error) return;

      setEventDetails(data.data);
    })();
  }, [eventId]);

  if (!eventDetails) return <LoadingComponent />;
  const performers = eventDetails.event_participants.filter(participant =>
    participant.role === "Performer"
  );

  const standardizeInstagramURL = (input) => {
    // Return null or an empty string if the input is falsy (including null)
    if (!input) {
      return null; // or return ""; based on how you want to handle it
    }
  
    const baseInstagramURL = "https://www.instagram.com/";
  
    // Check if input is already in the desired format
    if (input.startsWith(baseInstagramURL)) {
      return input; // No changes needed
    }
  
    // Remove '@' prefix if present
    const cleanInput = input.startsWith("@") ? input.slice(1) : input;
  
    // Construct the full Instagram URL
    return `${baseInstagramURL}${cleanInput}`;
  };


  const standardizeInstagramHandle = (input) => {
    // Return null or an empty string if the input is falsy (including null)
    if (!input) {
      return null; // or return ""; based on how you want to handle it
    }
  
    const baseInstagramURL = "https://www.instagram.com/";
  
    // Check if input is already in the desired format
    if (input.startsWith(baseInstagramURL)) {
      return input; // No changes needed
    }
  
    // Remove '@' prefix if present
    const cleanInput = input.startsWith("@") ? input.slice(1) : input;
  
    // Construct the full Instagram URL
    return `${cleanInput}`;
  };
  const getAvatorUrl= (name) =>{

    const baseAvatorURL = "https://ui-avatars.com/api/?name="
    const default_name = "Not Available"
    if (!name) {
      name= default_name
    }
  
    return `${baseAvatorURL}${name}`;
  }
  

  return (
    <div className={classes.main_container}>
     
      {/* <img src={heroImg} alt="hero" />
      <div className={classes.titleContainer}>
	    </div> */}
      <div className={classes.participants_container}>
        <h1 className={classes.participants_header}>Performers</h1>
        {performers.map((performer) => (

    <div className={classes.participant_container_bottom}>
            <div className={classes.top_container}>
              {/* Add the "Live Now" icon here */}
              {performer.status === "live" && (
                <img
                  src={liveImg}
                  alt="Confirm"
                  width="50px"
                  height="50px"
                />
              )}
              <img
                className={classes.avatar}
                src={getAvatorUrl(performer?.profile_info?.first_name)}
                alt="avatar"
              />
              <div className={classes.details}>
                <h2 className={classes.name}>
                  {performer?.profile_info?.first_name} {performer?.profile_info?.last_name}
                </h2>
                <p className={classes.text}>
                  {performer?.profile_info?.role}
                </p>
                {performer?.profile_info?.social_media_link && (
                  <p className={classes.text}>
                    <a
                      href={standardizeInstagramURL(performer.profile_info.social_media_link)}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {standardizeInstagramHandle(performer.profile_info.social_media_link)}
                    </a>
                  </p>
                )}
              </div>

            </div>
            <div className={classes.bottom_container}>
  {performer?.profile_info?.social_media_link ? (
    <a
      href={standardizeInstagramURL(performer.profile_info.social_media_link)}
      target="_blank"
      rel="noreferrer"
    >
      <img src={instagramColor} alt="social" />
    </a>
  ) : null}
</div>
    </div>
        ))}
        {/* Thats all for this event.<br></br>
        <br></br>
        <a href="https://www.intagram.in/fan_bole_toh"> @fan_bole_toh </a> */}
        
      </div>
    </div>
  );
}

export default ParticipantsPage;



