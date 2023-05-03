import React, { useEffect, useState } from "react";

import heroImg from "../../assets/schedule-logo.svg";

import classes from "./SchedulePage.module.css";
import { Link, useParams } from "react-router-dom";
import { getEvent } from "../../services/events.services";
import dayjs from "dayjs";
import LoadingComponent from "../../components/loading/LoadingComponent";

function SchedulePage() {
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

      <div className={classes.schedule_container}>
        <div className={classes.schedule_row}>
          <h3 className={classes.participant_item}>SCHEDULE</h3>
        </div>
        <div className={classes.divider} />
        {eventDetails && (
          <>
            <div className={classes.schedule_row}>
              <div className={classes.time}>
                {dayjs(eventDetails?.start_time).format("hh:mma")}
              </div>
              <div className={classes.performance}>Start</div>
            </div>
            <div className={classes.divider} />
          </>
        )}
        {eventDetails &&
          eventDetails.event_participants.map((participant, index) => (
            <>
              <div className={classes.schedule_row}>
                <div className={classes.time}>
                  {dayjs(participant.actual_slot_start_time).format("hh:mma")}
                </div>
                <div className={classes.performance}>
                  Performance {index + 1}
                </div>
              </div>
              <div className={classes.divider} />
            </>
          ))}
      </div>

      <div className={classes.bottom_buttons}>
        <Link className={classes.bottom_button}>Connect</Link>
        <Link to={`/participants/${eventId}`} className={classes.bottom_button}>
          Participants
        </Link>
      </div>
    </div>
  );
}

export default SchedulePage;
