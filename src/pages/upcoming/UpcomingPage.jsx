import React, { useEffect, useState } from "react";

import SplashScreen from "../../components/splash/SplashScreen";

import participants from "../../assets/card-icon.png";

import classes from "./UpcomingPage.module.css";
import { getEvents } from "../../services/events.services";
import LoadingComponent from "../../components/loading/LoadingComponent";
import { useAuthContext } from "../../components/contexts/AuthContext";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

const UpcomingPage = () => {
  const [events, setEvents] = useState(null);

  const { authData } = useAuthContext();

  useEffect(() => {
    (async () => {
      const { data, error } = await getEvents();

      if (!!error) return;

      setEvents(data.data);
    })();
  }, []);

  const getAsset = (event, asset_key) => {
    return event.event_assets.filter((asset) => asset_key === asset.key)[0];
  };

  const isUserAParticipant = (event) => {
    if (!authData.isAuthenticated) return false;

    return (
      event.event_participants.filter(
        (part) => part.user_uuid === authData.userData.uuid
      ).length > 0
    );
  };

  const getHost = (event) => {
    return event.event_participants.filter((part) => part.role === "Host")[0];
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
              <div
                className={classes.carousel_card_item}
                style={{
                  backgroundImage: `url(${
                    getAsset(event, "background")?.value.link ||
                    "https://i.ibb.co/HtRrwPV/bg.png"
                  })`,
                }}
              >
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
                    <h4 className={classes.host_container}>
                      Host: {getHost(event)?.profile_info?.first_name}
                    </h4>
                  </div>
                  {isUserAParticipant(event) ? (
                    <Link
                      to={`/details/${event.uuid}`}
                      className={classes.register_button}
                    >
                      Details
                    </Link>
                  ) : (
                    <Link
                      to={`/event?event_id=${event.uuid}`}
                      className={classes.register_button}
                    >
                      Register
                    </Link>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </SplashScreen>
  );
};

export default UpcomingPage;
