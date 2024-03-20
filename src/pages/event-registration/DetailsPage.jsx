import React, { useEffect, useState } from "react";

import participants from "../../assets/card-icon.png";
import confirmHero from "../../assets/confirm-hero.png";
import cardIcon from "../../assets/card-icon.png";

import classes from "./DetailsPage.module.css";
import { Link, useParams } from "react-router-dom";
import { getEvent, getEvents } from "../../services/events.services";
import dayjs from "dayjs";
import LoadingComponent from "../../components/loading/LoadingComponent";
import confirmShare from "../../assets/confirm-share.svg";
import confirmDownload from "../../assets/confirm-download.svg";
import * as htmlToImage from "html-to-image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faDoorOpen, faUsers } from "@fortawesome/free-solid-svg-icons";
import EventCard from "../../components/cards/event/EventCard";
import { useLocation } from "react-router-dom";
import { dateFormatter, timeFormatter } from "../../utils/formatter.utils";


const DetailsPage = () => {
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

  if (!eventDetails || !upcoming) return <LoadingComponent />;

  const getAsset = (event, asset_key) => {
    return event.event_assets.filter((asset) => asset_key === asset.key)[0];
  };
  const getHost = (event) => {
    return event.event_participants.filter((part) => part.role === "Host")[0];
  };
  const handleShare = () => {
    try {
      if (!navigator?.share) return;

      navigator.share({
        url: `https://unmutex.com/event?${eventDetails.uuid}`,
        title: "Click on link to join to register for the event",
        text: `Watch me performing live on Unmutex \n\n, https://unmutex.com/event?${eventDetails.uuid}`,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleDownload = () => {
    htmlToImage
      .toBlob(document.getElementById("card-to-download"))
      .then(function (blob) {
        var bloblink = URL.createObjectURL(blob);
        var link = document.createElement("a");

        document.body.appendChild(link); // for Firefox

        link.setAttribute("href", bloblink);
        link.setAttribute("download", "image.png");
        link.style.display = "none";
        link.click();
      });
  };

  return (
    <div className={classes.main_container} id="card-to-download">
      <img alt="icon" src={confirmHero} />
      
     
 <EventCard event={eventDetails} />
      <div className={classes.upcoming_container}>
        <h1>Details</h1>
        <div className={classes.upcoming_carousel}>
       {eventDetails.description}
        </div>
      </div>
      <div className={classes.upcoming_container}>
        <h1>You may also like</h1>
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
                {dateFormatter(event.start_time)}
                </div>
              </div>
              <div className={classes.bottom_row}>
                <div className={classes.left_container}>
                  <h3 className={classes.name_container}>{event.name}</h3>
                  <h4 className={classes.host_container}>Host: {getHost(event)?.profile_info?.first_name}</h4>
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

export default DetailsPage;
