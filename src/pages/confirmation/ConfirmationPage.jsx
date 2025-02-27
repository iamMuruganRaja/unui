import React, { useEffect, useState } from "react";

import participants from "../../assets/card-icon.png";
import confirmHero from "../../assets/confirm-hero.png";
import confirmDownload from "../../assets/confirm-download.svg";
import confirmEdit from "../../assets/confirm-edit.svg";
import confirmShare from "../../assets/confirm-share.svg";
import confirmGif from "../../assets/registration.gif";

import classes from "./ConfirmationPage.module.css";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  getEvent,
  getEvents,
  registerForEvent,
} from "../../services/events.services";
import dayjs from "dayjs";
import { useAuthContext } from "../../components/contexts/AuthContext";
import RoleModal from "../../components/modal/RoleModal";
import LoadingComponent from "../../components/loading/LoadingComponent";
import * as htmlToImage from "html-to-image";
import EventCard from "../../components/cards/event/EventCard";
import { dateFormatter, timeFormatter  } from "../../utils/formatter.utils";

const ConfirmationPage = () => {
  const { authData } = useAuthContext();

  const [isConfirmationShowing, setIsConfirmationShowing] = useState(true);

  const [isRegistered, setIsRegistered] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [eventDetails, setEventDetails] = useState(null);
  const [upcoming, setUpcoming] = useState(null);
  const [searchParams] = useSearchParams();
  const getHost = (event) => {
    return event.event_participants.filter((part) => part.role === "Host")[0];
  };

  const navigate = useNavigate();

  const handleRegister = async (role) => {
    const eventId = searchParams.get("event_id");

    setIsRegistering(true);

    const { error } = await registerForEvent({
      role: role,
      link: authData.social_media_link,
      status: authData.role,
      event_id: eventId,
    });

    setIsRegistering(false);

    if (!!error) return;

    setIsRegistered(true);

    setTimeout(() => setIsConfirmationShowing(false), 3000);

    localStorage.removeItem("event_id");
  };

  useEffect(() => {
    (async () => {
      const eventId = searchParams.get("event_id");

      const { data, error } = await getEvent(eventId);

      if (!!error) return;

      if (
        data.data.event_participants.filter(
          (participant) => participant.user_uuid === authData.userData.uuid
        ).length > 0
      ) {
        navigate(`/details/${eventId}`);
      }

      setEventDetails(data.data);
    })();
  }, [searchParams, authData, navigate]);

  useEffect(() => {
    (async () => {
      const { data, error } = await getEvents();

      if (!!error) return;

      setUpcoming(data.data);
    })();
  }, []);

  const handleShare = () => {
    try {
      if (!navigator?.share) return;

      navigator.share({
        url: `https://unmutex.com/event?${eventDetails.uuid}`,
        title: "Click on link to join to register for the event",
        text: `🚀 UnmuteX's event is the place to be! Click the link below for a mind-blowing experience.\n`,
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

  if (!eventDetails || !upcoming) return <LoadingComponent />;

  if (!isRegistered)
    return (
      <RoleModal
        isOpen={true}
        handleSubmit={handleRegister}
        isButtonLoading={isRegistering}
        isUpdating={
          eventDetails.event_participants
            .map((i) => i.user_uuid)
            .indexOf(authData.userData.uuid) > -1
        }
      />
    );

  if (isConfirmationShowing)
    return (
      <div className={classes.confirmation_container}>
        <img src={confirmGif} className={classes.gif} alt="confirmed" />
        <h1>CONFIRMED!</h1>
        <h2>You have successfully registered for the event!</h2>
      </div>
    );

  return (
    <div className={classes.main_container}>
      <img src={confirmHero} alt="hero" />
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
                  <h4 className={classes.host_container}>Host: {getHost(eventDetails)?.profile_info?.first_name}</h4>
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

export default ConfirmationPage;
