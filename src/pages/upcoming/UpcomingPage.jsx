import React, { useEffect, useState } from "react";

import SplashScreen from "../../components/splash/SplashScreen";

import cardIcon from "../../assets/card-icon.png";
import participants from "../../assets/card-icon.png";

import classes from "./UpcomingPage.module.css";
import { getEvents } from "../../services/events.services";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import LoadingComponent from "../../components/loading/LoadingComponent";

const DEFAULT_LINKS = {
  "top-left": "https://i.ibb.co/NydP8DQ/card-icon.png",
  "bottom-right": "https://i.ibb.co/NydP8DQ/card-icon.png",
};

const UpcomingPage = () => {
  const [events, setEvents] = useState(null);

  useEffect(() => {
    (async () => {
      const { data, error } = await getEvents();

      if (!!error) return;

      setEvents(data.data);
    })();
  }, []);

  const getAsset = (assets, key) => {
    const asset = assets.filter((i) => i.key === key);

    if (asset.length > 0) return asset[0].value.link;
    else return DEFAULT_LINKS[key];
  };

  return (
    <SplashScreen>
      <div className={classes.main_container}>
        <h1 className={classes.page_title}>Upcoming Events</h1>

        <div className={classes.card_carousel}>
          {!events ? (
            <LoadingComponent fill={false} />
          ) : (
            events.map((event) => (
              <div className={classes.card_outer_container}>
                <div className={classes.card_inner_container}>
                  <div className={classes.card_details_horizontal}>
                    {console.log({
                      asset: getAsset(event.event_assets, "top-left"),
                    })}
                    <img
                      alt="icon"
                      src={getAsset(event.event_assets, "top-left")}
                      className={classes.round_img}
                    />
                    <p className={classes.details_text}>
                      Date: {dayjs(event.start_time).format("DD-MM-YY")}
                      <br />
                      Time: {dayjs(event.start_time).format("hh:mm a")}
                      <br /> Theme: {event.genre}
                    </p>
                  </div>
                  <div className={classes.card_details_horizontal}>
                    <p className={classes.details_text}>{event.description}</p>
                    <img
                      alt="icon"
                      src={getAsset(event.event_assets, "bottom-right")}
                      className={classes.round_img}
                    />
                  </div>
                </div>
                <div className={classes.card_footer}>
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
                      style={{ left: 10 - 5 * event.event_participants.length }}
                    >
                      {event.event_participants.length} Participants
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
            ))
          )}
        </div>

        <div className={classes.highlights_container}>
          <div className={classes.highlights_title}>Recent Highlights</div>
          <div className={classes.highlight_carousel}>
            <img alt="icon" src={cardIcon} className={classes.highlight_img} />
            <img alt="icon" src={cardIcon} className={classes.highlight_img} />
            <img alt="icon" src={cardIcon} className={classes.highlight_img} />
            <img alt="icon" src={cardIcon} className={classes.highlight_img} />
          </div>
        </div>
      </div>
    </SplashScreen>
  );
};

export default UpcomingPage;
