import React, { useEffect, useState } from "react";

import classes from "./HomePage.module.css";

import heroImg from "../../assets/common-hero.svg";
import cardIcon from "../../assets/card-icon.png";
import highlightImg from "../../assets/highlight.png";

import { getRegisteredEvents } from "../../services/user.services";
import { getEvents } from "../../services/events.services";
import EventBox from "../../components/cards/event/EventBox";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import LoadingComponent from "../../components/loading/LoadingComponent";

const HomePage = () => {
  const [registeredEvents, setRegisteredEvents] = useState();
  const [upcomingEvents, setUpcomingEvents] = useState();

  useEffect(() => {
    (async () => {
      const { data, error } = await getRegisteredEvents();

      if (!!error) return;

      setRegisteredEvents(data.data);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const { data, error } = await getEvents();

      if (!!error) return;

      setUpcomingEvents(data.data);
    })();
  }, []);

  if (!upcomingEvents || !registeredEvents)
    return <LoadingComponent></LoadingComponent>;

  return (
    <div className={classes.container}>
      <img className={classes.hero} src={heroImg} />
      <section>
        <h1 className={classes.header}>Upcoming Events.</h1>
        <div className={classes.horizontal_scroll}>
          {upcomingEvents.map((event) => (
            <div className={classes.card_container}>
              <div className={classes.top_card}>
                <div className={classes.top_upper_container}>
                  <img className={classes.event_icon} src={cardIcon} />
                  <div className={classes.details_container}>
                    <p>Date: {dayjs(event.start_date).format("DD/MM/YY")}</p>
                    <p>Time: {dayjs(event.start_date).format("hh:mm a")}</p>
                    <p>Theme: {event.genre}</p>
                  </div>
                </div>
                <div className={classes.top_lower_container}>
                  <div className={classes.details_container}>
                    Join in with Host, (h/n) in a session filled with (theme)
                  </div>
                  <img className={classes.event_icon} src={cardIcon} />
                </div>
              </div>
              <div className={classes.bottom_card}>
                <p>{event.event_participants.length} participants</p>
                <Link
                  className={classes.register_button}
                  to={`/register/${event.uuid}`}
                >
                  Register
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section>
        <h1 className={classes.header}>Registered Events.</h1>
        <div className={classes.horizontal_scroll}>
          {registeredEvents.map((event) => (
            <EventBox event={event} />
          ))}
        </div>
      </section>
      <section>
        <h1 className={classes.header}>Recent Highlights</h1>
        <div className={classes.horizontal_scroll}>
          <img src={highlightImg} />
          <img src={highlightImg} />
          <img src={highlightImg} />
          <img src={highlightImg} />
        </div>
      </section>
    </div>
  );
};

export default HomePage;
