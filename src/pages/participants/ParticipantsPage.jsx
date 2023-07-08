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

  console.log({ authData });

  if (!eventDetails) return <LoadingComponent />;

  return (
    <div className={classes.main_container}>
      <img src={heroImg} />
      <div className={classes.participants_container}>
        <div className={classes.participant_container}>
          <div className={classes.top_container}>
            <img
              className={classes.avatar}
              src="https://images.unsplash.com/photo-1616268164880-673b3ba611bb"
            />
            <div className={classes.details}>
              <h2 className={classes.name}>
                {authData.userData.user.first_name}{" "}
                {authData.userData.user.last_name}
                <Link to="/edit profile" className={classes.edit_icon}>
                  <img src={editImg} />
                </Link>
              </h2>
              <p className={classes.text}>Performer</p>
              <p className={classes.text}>Link by user</p>
            </div>
          </div>
          <div className={classes.bottom_container}>
            <img src={twitterColor} />
            <img src={instagramColor} />
            <img src={facebookColor} />
          </div>
        </div>
        <h1 className={classes.participants_header}>Participants</h1>
        {eventDetails.event_participants.map((participant) => (
          <div className={classes.participant_container_bottom}>
            <div className={classes.top_container}>
              <img
                className={classes.avatar}
                src="https://images.unsplash.com/photo-1616268164880-673b3ba611bb"
              />
              <div className={classes.details}>
                <h2 className={classes.name}>
                  {participant.first_name} {participant.last_name}
                  <Link to="/edit-profile" className={classes.edit_icon}>
                    <img src={editImg} />
                  </Link>
                </h2>
                <p className={classes.text}>Performer</p>
                <p className={classes.text}>Link by user</p>
              </div>
            </div>
            <div className={classes.bottom_container}>
              <img src={twitterMono} />
              <img src={instagramMono} />
              <img src={facebookMono} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ParticipantsPage;
