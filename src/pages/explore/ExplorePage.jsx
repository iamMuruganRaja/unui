import React, { useEffect, useState } from "react";

import confirmHero from "../../assets/confirm-hero.svg";
import cardIcon from "../../assets/card-icon.png";
import confirmCards from "../../assets/confirm_cards.png";
import carouselCtx from "../../assets/confirm_carousel_icons.svg";

import classes from "./ExplorePage.module.css";
import { Link, useParams } from "react-router-dom";
import { getEvent } from "../../services/events.services";
import dayjs from "dayjs";

const ExplorePage = () => {
  const [eventDetails, setEventDetails] = useState(null);

  const { eventId } = useParams();

  useEffect(() => {
    (async () => {
      const { data, error } = await getEvent(eventId);

      if (!!error) return;

      setEventDetails(data.data);
    })();
  }, [eventId]);

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
          <Link className={classes.white_pill}>Connect</Link>
        </div>
      </div>
      <div className={classes.bottom_carousel}>
        <div className={classes.carousel_card}>
          <img
            alt="icon"
            src={confirmCards}
            className={classes.carousel_image}
          />
          <div className={classes.bottom_footer}>
            <div className={classes.left_icons}>
              <img alt="icon" src={carouselCtx} />
            </div>
            <button className={classes.bottom_pill}>RSVP</button>
          </div>
        </div>
        <div className={classes.carousel_card}>
          <img
            alt="icon"
            src={confirmCards}
            className={classes.carousel_image}
          />
          <div className={classes.bottom_footer}>
            <div className={classes.left_icons}>
              <img alt="icon" src={carouselCtx} />
            </div>
            <button className={classes.bottom_pill}>RSVP</button>
          </div>
        </div>
        <div className={classes.carousel_card}>
          <img
            alt="icon"
            src={confirmCards}
            className={classes.carousel_image}
          />
          <div className={classes.bottom_footer}>
            <div className={classes.left_icons}>
              <img alt="icon" src={carouselCtx} />
            </div>
            <button className={classes.bottom_pill}>RSVP</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
