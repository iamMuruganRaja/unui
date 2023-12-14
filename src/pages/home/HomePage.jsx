import React, { useEffect, useState } from "react";

import classes from "./HomePage.module.css";

import heroImg from "../../assets/common-hero.svg";
import cardIcon from "../../assets/card-icon.png";

import { getRegisteredEvents } from "../../services/user.services";
import { useAuthContext } from "../../components/contexts/AuthContext";
import { getEvents } from "../../services/events.services";
import EventBox from "../../components/cards/event/EventBox";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import LoadingComponent from "../../components/loading/LoadingComponent";
import ImageModal from "../../components/modal/ImageModal";
import Header from "../../components/topbar/Headers";
import {TIMZONE_OFFSET_IN_MINS_INDIA} from "../../config/constants";

const HomePage = () => {
  const [registeredEvents, setRegisteredEvents] = useState();
  const [upcomingEvents, setUpcomingEvents] = useState();

  const [activeImage, setActiveImage] = useState(null);

  const { authData } = useAuthContext();

  useEffect(() => {
    (async () => {
      const { data, error } = await getRegisteredEvents();

      if (!!error) {
        setRegisteredEvents([]);
        return;
      }

      setRegisteredEvents(data.data);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const { data, error } = await getEvents();
      const filteredRegisteredEvents = data.data.filter(
        (event) =>
          !event.event_participants.some(
            (participant) => participant.user_uuid === authData.userData.uuid
          )
      );

      if (!!error) return;

      setUpcomingEvents(filteredRegisteredEvents);
    })();
  }, [authData]);

  const getAsset = (event, asset_key) => {
    return event.event_assets.filter((asset) => asset_key === asset.key)[0];
  };

  const toggleImage = (image) => {
    setActiveImage(image);
  };

  if (!upcomingEvents) return <LoadingComponent></LoadingComponent>;

  return (
    <div className={classes.container}>
      <Header /> 
      <section>
        <h1 className={classes.header}>Get Ready for Action!</h1>
        <div className={classes.horizontal_scroll}>
          {upcomingEvents.map((event) => (
            <div className={classes.card_container}>
              <div className={classes.top_card}>
                <div className={classes.top_upper_container}>
                  <img
                    className={classes.event_icon}
                    src={getAsset(event, "top-left")?.value?.link || cardIcon}
                    alt="card-hero"
                  />
                  <div className={classes.details_container}>
                    <p>Date: {dayjs(Date.now()).add(TIMZONE_OFFSET_IN_MINS_INDIA, "minute").format("DD/MM/YY")}</p>
                    <p>Time: {dayjs(event.start_time).add(TIMZONE_OFFSET_IN_MINS_INDIA, "minute").format("hh:mm a")}</p>
                    <p>Theme: {event.genre}</p>
                  </div>
                </div>
                <div className={classes.top_lower_container}>
                  <div className={classes.details_container}>
                    {event.description}
                  </div>
                  <img
                    className={classes.event_icon}
                    src={
                      getAsset(event, "bottom-right")?.value?.link || cardIcon
                    }
                    alt="card-hero"
                  />
                </div>
              </div>
              <div className={classes.bottom_card}>
                <p>{event.event_participants.length} participants</p>
                <Link
                  className={classes.register_button}
                  to={`/event?event_id=${event.uuid}`}
                >
                  <div className={classes.cta_button}>Register</div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
      {registeredEvents.length > 0 && (
        <section>
          <h1 className={classes.header}>Your Reservations!</h1>
          <div className={classes.horizontal_scroll}>
            {registeredEvents.map((event) => (
              <EventBox event={event} />
            ))}
          </div>
        </section>
      )}

      <section>
        <h1 className={classes.header}>Recent Highlights</h1>
        <div className={classes.horizontal_scroll}>
          {upcomingEvents.map((event) => {
            const asset = getAsset(event, "highlights");

            if (!asset) {
              return <></>;
            }

            if (asset.value.type === "image") {
              return (
                <button
                  onClick={() => toggleImage(asset.value.thumbnail)}
                  className={classes.image_button}
                >
                  <img
                    className={classes.highlight_image}
                    src={asset.value.thumbnail}
                    alt="highlight"
                  />
                </button>
              );
            } else {
              return (
                <div className="video-responsive">
                  <iframe
                    title="video"
                    width="180"
                    height="90"
                    border-radius="20"
                    src={asset.value.link}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              );
            }
          })}
        </div>
      </section>
      <ImageModal
        image={activeImage}
        isOpen={!!activeImage}
        toggle={toggleImage}
      />
    </div>
  );
};

export default HomePage;
