import React, { useEffect, useState } from "react";

import heroImg from "../../assets/details-hero.png";
import editImg from "../../assets/pariticipant-edit-icon.png";

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
              <p className={classes.text}>Performer</p>
              <p className={classes.text}>Link by user</p>
            </div>
          </div>
          <div className={classes.bottom_container}>
            <img src={twitterColor} alt="social" />
            <img src={instagramColor} alt="social" />
            <img src={facebookColor} alt="social" />
          </div>
        </div>
        <h1 className={classes.participants_header}>Participants</h1>
        {eventDetails.event_participants.map((participant) => (
          <div className={classes.participant_container_bottom}>
            <div className={classes.top_container}>
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
              <a
                href={participant?.profile_info?.social_media_link}
                target="_blank"
                rel="noreferrer"
              >
                <img src={twitterColor} alt="social" />
              </a>
              <a
                target="_blank"
                href={participant?.profile_info?.social_media_link}
                rel="noreferrer"
              >
                <img src={instagramColor} alt="social" />
              </a>
              <a
                target="_blank"
                href={participant?.profile_info?.social_media_link}
                rel="noreferrer"
              >
                <img src={facebookColor} alt="social" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ParticipantsPage;
