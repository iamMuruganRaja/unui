import React, { useEffect, useState } from "react";

import SplashScreen from "../../components/splash/SplashScreen";

import cardIcon from "../../assets/card-icon.png";
import participants from "../../assets/card-icon.png";
import splashBg from "../../assets/splash_bg.png";

import classes from "./UpcomingPage.module.css";
import { getEvents } from "../../services/events.services";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

const UpcomingPage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    (async () => {
      const { data, error } = await getEvents();

      if (!!error) return;

      setEvents(data.data);
    })();
  }, []);

  return (
    <SplashScreen>
      <div className={classes.main_container}>
        <h1 className={classes.page_title}>Upcoming Events</h1>

        <div className={classes.card_carousel}>
          {events.map((event) => (
            <div className={classes.card_outer_container}>
              <div className={classes.card_inner_container}>
                <div className={classes.card_details_horizontal}>
                  <img src={cardIcon} className={classes.round_img} />
                  <p className={classes.details_text}>
                    Date: {dayjs(event.start_time).format("DD-MM-YY")}
                    <br />
                    Time: {dayjs(event.start_time).format("hh:mm a")}
                    <br /> Theme: {event.genre}
                  </p>
                </div>
                <div className={classes.card_details_horizontal}>
                  <p className={classes.details_text}>{event.description}</p>
                  <img src={cardIcon} className={classes.round_img} />
                </div>
              </div>
              <div className={classes.card_footer}>
                <div className={classes.participants}>
                  <img
                    className={classes.participant_icon}
                    src={participants}
                    style={{ left: 0 }}
                  />
                  <img
                    className={classes.participant_icon}
                    src={participants}
                    style={{ left: -5 }}
                  />
                  <img
                    className={classes.participant_icon}
                    src={participants}
                    style={{ left: -10 }}
                  />
                  <img
                    className={classes.participant_icon}
                    src={participants}
                    style={{ left: -15 }}
                  />
                  <p
                    className={classes.participant_count}
                    style={{ left: -10 }}
                  >
                    10 Participants
                  </p>
                </div>
                <Link
                  to={`/event?event_id=${event.uuid}`}
                  className={classes.register_btn}
                >
                  Register
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className={classes.highlights_container}>
          <div className={classes.highlights_title}>Recent Highlights</div>
          <div className={classes.highlight_carousel}>
            <img src={cardIcon} className={classes.highlight_img} />
            <img src={cardIcon} className={classes.highlight_img} />
            <img src={cardIcon} className={classes.highlight_img} />
            <img src={cardIcon} className={classes.highlight_img} />
          </div>
        </div>
      </div>
    </SplashScreen>
  );
};

export default UpcomingPage;
