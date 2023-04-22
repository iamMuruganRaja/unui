import React, { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import "./CarouselStyles.css";

import leftArrow from "../../assets/left-arrow.svg";
import rightArrow from "../../assets/right-arrow.svg";
import navbarLogo from "../../assets/navbar-logo.svg";
import aboutIcon from "../../assets/support/about.png";
import faqIcon from "../../assets/support/faq.png";
import galleryIcon from "../../assets/support/gallery.png";
import growIcon from "../../assets/support/grow.png";
import rolesIcon from "../../assets/support/roles.png";
import upcomingIcon from "../../assets/support/upcoming.png";

import classes from "./SupportPage.module.css";

const CARDS = [
  {
    image: aboutIcon,
    title: "ABOUT US",
  },
  {
    image: faqIcon,
    title: "UPCOMING EVENTS",
  },
  {
    image: galleryIcon,
    title: "ROLES",
  },
  {
    image: growIcon,
    title: "GALLERY",
  },
  {
    image: rolesIcon,
    title: "FAQ",
  },
  {
    image: upcomingIcon,
    title: "GROW TOGETHER",
  },
];

const SupportPage = () => {
  const [selected, setSelected] = useState(0);

  const handlePrevious = () => {
    setSelected((prev) => prev - 1);
  };

  const handleNext = () => {
    setSelected((prev) => prev + 1);
  };

  return (
    <div className={classes.main}>
      <nav className={classes.navbar}>
        <img className={classes.navbar_image} src={navbarLogo} />
      </nav>
      <div className={classes.carousel}>
        {selected > 0 ? (
          <div className={classes.left_overflow} />
        ) : (
          <div className={classes.inactive_overflow} />
        )}
        <div className={classes.carousel_active}>
          <div className={classes.carousel_top}>
            {selected > 0 ? (
              <img
                src={leftArrow}
                className={classes.leftArrow}
                onClick={handlePrevious}
              />
            ) : (
              <div className={classes.leftArrow} />
            )}
            <div className={classes.carousel_card}>
              <img className={classes.card_image} src={CARDS[selected].image} />
            </div>
            {selected < CARDS.length - 1 ? (
              <img
                src={rightArrow}
                className={classes.rightArrow}
                onClick={handleNext}
              />
            ) : (
              <div className={classes.rightArrow} />
            )}
          </div>
          <div className={classes.selected_tab_title}>
            {CARDS[selected].title}
          </div>
          <div className={classes.carousel_navigator}>
            {CARDS.map((_, ind) => (
              <>
                <div className={classes.dot} />
                <div
                  className={`${classes.bar} ${
                    selected === ind ? classes.bar_active : ""
                  }`}
                />
              </>
            ))}
            <div className={classes.dot} />
          </div>
        </div>
        {selected < CARDS.length - 1 ? (
          <div className={classes.right_overflow} />
        ) : (
          <div className={classes.inactive_overflow} />
        )}
      </div>

      <div>
        <p className={classes.highlights_title}>Recent Highlights</p>
        <div className={classes.highlight_carousel}>
          <div className={classes.highlight_cards} />
          <div className={classes.highlight_cards} />
          <div className={classes.highlight_cards} />
        </div>
        <p className={classes.highlights_footer}>See More...</p>
      </div>
    </div>
  );
};

export default SupportPage;
