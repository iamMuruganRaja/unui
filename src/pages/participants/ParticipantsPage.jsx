import React, { useEffect, useState } from "react";

import heroImg from "../../assets/schedule-logo.svg";

import classes from "./ParticipantsPage.module.css";
import { Link, useParams } from "react-router-dom";
import { getEvent } from "../../services/events.services";
import LoadingComponent from "../../components/loading/LoadingComponent";

function ParticipantsPage() {
  const { eventId } = useParams();

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
      <img alt="hero" src={heroImg} className={classes.hero_img} />

      <div className={classes.participants_container}>
        {eventDetails &&
          eventDetails.event_participants.map((participant) => (
            <div className={classes.list_item}>
              <div className={classes.list_item_avatar_container}>
                <img
                  alt="avatar"
                  className={classes.list_item_avatar}
                  src={`https://avatars.dicebear.com/api/human/${participant.uuid}.svg`}
                />
              </div>
              <div className={classes.list_item_details_container}>
                <h4 className={classes.participant_name}>
                  {participant.first_name} {participant.last_name}
                </h4>
                <h6 className={classes.participant_role}>{participant.role}</h6>

                <div className={classes.participant_socials}></div>
              </div>
            </div>
          ))}
      </div>

      <div className={classes.bottom_buttons}>
        <Link className={classes.bottom_button}>Connect</Link>
        <Link to={`/schedule/${eventId}`} className={classes.bottom_button}>
          Schedule
        </Link>
      </div>
    </div>
  );
}

export default ParticipantsPage;
