import React from "react";

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

const ConfirmationPage = () => {
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
            <p className={classes.card_details_value}></p>
          </div>
          <div className={classes.card_details_item}>
            <p className={classes.card_details_key}>Role Selected</p>
            <p className={classes.card_details_value}></p>
          </div>
          <div className={classes.card_details_item}>
            <p className={classes.card_details_key}>Date & Time</p>
            <p className={classes.card_details_value}></p>
          </div>
          <div className={classes.card_details_item}>
            <p className={classes.card_details_key}>Theme</p>
            <p className={classes.card_details_value}></p>
          </div>
          <div className={classes.card_details_item}>
            <p className={classes.card_details_key}>Venue</p>
            <p className={classes.card_details_value}></p>
          </div>
        </div>
        <div className={classes.card_footer}>
          <button className={classes.card_pill_button}>Details</button>
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
