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

import classes from "./ExplorePage.module.css";

const ExplorePage = () => {
  return (
    <div className={classes.main_container}>
      <img src={confirmHero} />
      <div className={classes.card_container}>
        <div className={classes.card_details_section}>
          <div className={classes.card_details_horizontal}>
            <img src={cardIcon} className={classes.round_img} />
            <p className={classes.details_text}>
              Date:
              <br />
              Time:
              <br /> Theme:
            </p>
          </div>
          <div className={classes.card_details_horizontal}>
            <p className={classes.details_text}>
              Join in with Host, (h/n) in a session filled with (theme)
            </p>
            <img src={cardIcon} className={classes.round_img} />
          </div>
        </div>
        <div className={classes.card_footer}>
          <button className={classes.white_pill}>Schedule</button>
          <button className={classes.white_pill}>Participants</button>
          <button className={classes.white_pill}>Connect</button>
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

export default ExplorePage;
