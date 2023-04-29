import React, { useEffect, useState } from "react";

import confirmHero from "../../assets/confirm-hero.svg";
import checkCircle from "../../assets/check-circle.svg";
import confirmDownload from "../../assets/confirm-download.svg";
import confirmEdit from "../../assets/confirm-edit.svg";
import confirmShare from "../../assets/confirm-share.svg";
import cardLogo from "../../assets/card-logo.svg";
import cardIcon from "../../assets/card-icon.png";
import confirmCards from "../../assets/confirm_cards.png";
import carouselCtx from "../../assets/confirm_carousel_icons.svg";

import classes from "./ConfirmationPage.module.css";
import { Link, useSearchParams } from "react-router-dom";
import { getEvent, registerForEvent } from "../../services/events.services";
import dayjs from "dayjs";
import { useAuthContext } from "../../components/contexts/AuthContext";

const ConfirmationPage = () => {
  const { authData } = useAuthContext();

  const [eventDetails, setEventDetails] = useState(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    (async () => {
      const eventId = searchParams.get("event_id");

      await registerForEvent({
        role: authData.role,
        link: authData.social_media_link,
        status: authData.role,
        event_id: eventId,
      });

      localStorage.removeItem("event_id");
    })();
  }, [searchParams]);

  useEffect(() => {
    (async () => {
      const eventId = searchParams.get("event_id");

      const { data, error } = await getEvent(eventId);

      if (!!error) return;

      setEventDetails(data.data);
    })();
  }, [searchParams]);

  return (
    <div className={classes.main_container}>
      <img src={confirmHero} />
      <img src={checkCircle} />
      <div className={classes.card_container}>
        <div className={classes.top_container}>
          <img className={classes.card_image} src={cardIcon} />
          <img className={classes.card_logo} src={cardLogo} />
        </div>
        <div className={classes.card_details_section}>
          <div className={classes.card_details_item}>
            <p className={classes.card_details_key}>Name</p>
            <p className={classes.card_details_value}>{eventDetails?.name}</p>
          </div>
          <div className={classes.card_details_item}>
            <p className={classes.card_details_key}>Role Selected</p>
            <p className={classes.card_details_value}>
              {eventDetails?.event_participants[0].role}
            </p>
          </div>
          <div className={classes.card_details_item}>
            <p className={classes.card_details_key}>Date & Time</p>
            <p className={classes.card_details_value}>
              {dayjs(eventDetails?.start_time).format("MMM D, YYYY h:mm A")}
            </p>
          </div>
          <div className={classes.card_details_item}>
            <p className={classes.card_details_key}>Theme</p>
            <p className={classes.card_details_value}>{eventDetails?.genre}</p>
          </div>
          <div className={classes.card_details_item}>
            <p className={classes.card_details_key}>Venue</p>
            <p className={classes.card_details_value}>
              {eventDetails?.platform}
            </p>
          </div>
        </div>
        <div className={classes.card_footer}>
          <Link
            className={classes.card_pill_button}
            to={`/details/${eventDetails?.uuid}`}
          >
            Details
          </Link>
          <div className={classes.card_icons_container}>
            <img className={classes.card_icon} src={confirmEdit} />
            <img className={classes.card_icon} src={confirmDownload} />
            <img className={classes.card_icon} src={confirmShare} />
          </div>
        </div>
      </div>
      <div className={classes.bottom_carousel}>
        <div className={classes.carousel_card}>
          <img src={confirmCards} className={classes.carousel_image} />
          <div className={classes.bottom_footer}>
            <div className={classes.left_icons}>
              <img src={carouselCtx} />
            </div>
            <button className={classes.bottom_pill}>RSVP</button>
          </div>
        </div>
        <div className={classes.carousel_card}>
          <img src={confirmCards} className={classes.carousel_image} />
          <div className={classes.bottom_footer}>
            <div className={classes.left_icons}>
              <img src={carouselCtx} />
            </div>
            <button className={classes.bottom_pill}>RSVP</button>
          </div>
        </div>
        <div className={classes.carousel_card}>
          <img src={confirmCards} className={classes.carousel_image} />
          <div className={classes.bottom_footer}>
            <div className={classes.left_icons}>
              <img src={carouselCtx} />
            </div>
            <button className={classes.bottom_pill}>RSVP</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;
