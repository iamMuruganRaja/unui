import React, { useEffect, useState } from "react";

import heroImg from "../../assets/details-hero.png";
import editImg from "../../assets/pariticipant-edit-icon.png";
import liveImg from "../../assets/live.png"

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

  return (
    <div className={classes.main_container}>
      <img src={heroImg} alt="hero" />
      <div className={classes.participants_container}>
        <div className={classes.participant_container}>
          <div className={classes.top_container}>
            <img
              className={classes.avatar}
              src="https://images.unsplash.com/photo-1616268164880-673b3ba611bb"
              alt="avatar"
            />
            <div className={classes.details}>
              <h2 className={classes.name}>
                {authData.userData.first_name}
                <Link to="/edit-profile" className={classes.edit_icon}>
                  <img src={editImg} alt="edit" />
                </Link>
              </h2>
              
              <Link to="/profile">
              <p className={classes.text}>View Profile</p>
      </Link>
            </div>
          </div>
          <div className={classes.bottom_container}>
                  {authData?.userData?.social_media_link && (
                    <a
                      href={authData.userData.social_media_link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {authData.userData.social_media_link.includes("twitter") && (
                        <img src={twitterColor} alt="social" />
                      )}
                      {authData.userData.social_media_link.includes("instagram") && (
                        <img src={instagramColor} alt="social" />
                      )}
                      {authData.userData.social_media_link.includes("facebook") && (
                        <img src={facebookColor} alt="social" />
                      )}
                    </a>
                  )}
          </div>
        </div>
        <h1 className={classes.participants_header}>Participants</h1>
        {eventDetails.event_participants.map((participant) => (

    <div className={classes.participant_container_bottom}>
            <div className={classes.top_container}>
              {/* Add the "Live Now" icon here */}
              {participant.status === "live" && (
                <img
                  src={liveImg}
                  alt="Confirm"
                  width="50px"
                  height="50px"
                />
              )}
              <img
                className={classes.avatar}
                src="https://images.unsplash.com/photo-1616268164880-673b3ba611bb"
                alt="avatar"
              />
              <div className={classes.details}>
                <h2 className={classes.name}>
                  {participant?.profile_info?.first_name}{" "}
                  {participant?.profile_info?.last_name}
                </h2>
                <p className={classes.text}>
                  {participant?.profile_info?.role}
                </p>
              </div>
            </div>
              <div className={classes.bottom_container}>
                {participant?.profile_info?.social_media_link && (
                  <a
                    href={participant.profile_info.social_media_link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {participant.profile_info.social_media_link.includes("twitter") && (
                      <img src={twitterColor} alt="social" />
                    )}
                    {participant.profile_info.social_media_link.includes("instagram") && (
                      <img src={instagramColor} alt="social" />
                    )}
                    {participant.profile_info.social_media_link.includes("facebook") && (
                      <img src={facebookColor} alt="social" />
                    )}
                  </a>
                )}
              </div>
    </div>
        ))}
        Thats all for this event.<br></br>
        <br></br>
        <a href="https://www.intagram.in/fan_bole_toh"> @fan_bole_toh </a>
        ... 
        ...
        ...
      </div>
    </div>
  );
}

export default ParticipantsPage;



