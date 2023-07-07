import React, { useEffect, useState } from "react";

import participants from "../../assets/card-icon.png";
import confirmHero from "../../assets/confirm-hero.png";
import cardIcon from "../../assets/card-icon.png";

import classes from "./ExplorePage.module.css";
import { Link, useParams } from "react-router-dom";
import { getEvent, getEvents } from "../../services/events.services";
import dayjs from "dayjs";
import LoadingComponent from "../../components/loading/LoadingComponent";

const ExplorePage = () => {
  const [eventDetails, setEventDetails] = useState(null);
  const [upcoming, setUpcoming] = useState(null);

  const { eventId } = useParams();

  useEffect(() => {
    (async () => {
      const { data, error } = await getEvent(eventId);

      if (!!error) return;

      setEventDetails(data.data);
    })();
  }, [eventId]);

  useEffect(() => {
    (async () => {
      const { data, error } = await getEvents();

      if (!!error) return;

      setUpcoming(data.data);
    })();
  }, []);

  if (!eventDetails) return <LoadingComponent />;

  return (
    <div className={classes.main_container}>
      <img alt="icon" src={confirmHero} />
      <div className={classes.card_container}>
        <div className={classes.card_details_section}>
          <div className={classes.card_details_horizontal}>
            <img alt="icon" src={cardIcon} className={classes.round_img} />
            <p className={classes.details_text}>
              Date: {dayjs(eventDetails?.start_time).format("DD-MM-YY")}
              <br />
              Time: {dayjs(eventDetails?.start_time).format("hh:mm a")}
              <br /> Theme: {eventDetails?.genre}
            </p>
          </div>
          <div className={classes.card_details_horizontal}>
            <p className={classes.details_text}>{eventDetails?.description}</p>
            <img alt="icon" src={cardIcon} className={classes.round_img} />
          </div>
        </div>
        <div className={classes.card_footer}>
          <Link to={`/schedule/${eventId}`} className={classes.white_pill}>
            Schedule
          </Link>
          <Link to={`/participants/${eventId}`} className={classes.white_pill}>
            Participants
          </Link>
          <a
            href={eventDetails.link}
            target="_blank"
            rel="noreferrer"
            className={classes.white_pill}
            disabled={dayjs().isAfter(
              dayjs(eventDetails?.start_time).subtract(10, "minutes")
            )}
          >
            Connect
          </a>
        </div>
      </div>
      <div className={classes.upcoming_container}>
        <h1>Upcoming Events</h1>
        <div className={classes.upcoming_carousel}>
          {upcoming.map((event) => (
            <div className={classes.carousel_card_item}>
              <div className={classes.top_row}>
                <div className={classes.participants}>
                  {event.event_participants.length > 0 && (
                    <img
                      alt="icon"
                      className={classes.participant_icon}
                      src={participants}
                      style={{ left: 0 }}
                    />
                  )}
                  {event.event_participants.length > 1 && (
                    <img
                      alt="icon"
                      className={classes.participant_icon}
                      src={participants}
                      style={{ left: -5 }}
                    />
                  )}
                  {event.event_participants.length > 2 && (
                    <img
                      alt="icon"
                      className={classes.participant_icon}
                      src={participants}
                      style={{ left: -10 }}
                    />
                  )}
                  {event.event_participants.length > 3 && (
                    <img
                      alt="icon"
                      className={classes.participant_icon}
                      src={participants}
                      style={{ left: -15 }}
                    />
                  )}
                  <p
                    className={classes.participant_count}
                    style={{
                      left: 10 - 5 * (event.event_participants.length % 4),
                    }}
                  >
                    {event.event_participants.length} Participants
                  </p>
                </div>
                <div className={classes.date_box}>
                  {dayjs(event.start_time).format("DD MMM")}
                </div>
              </div>
              <div className={classes.bottom_row}>
                <div className={classes.left_container}>
                  <h3 className={classes.name_container}>{event.name}</h3>
                  <h4 className={classes.host_container}>Host: John Doe</h4>
                </div>
                <Link
                  to={`/event?event_id=${event.uuid}`}
                  className={classes.register_button}
                >
                  Register
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
