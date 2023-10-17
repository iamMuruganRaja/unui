// SocialFollow.js
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faYoutube,
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

import styles from "./SocialFollow.module.css"; // Import CSS module

const SocialFollow = () => {
  return (
    <section className={styles.section}>
      <div className={styles.socialContainer}>
        <p>
          <span className={styles.mediumTitleSpan1}>Connect with Us</span>
        </p>

        {/* Place the text above the icons */}
        <div>
          {/* <a
            href="https://www.youtube.com/c/jamesqquick"
            className={`${styles.social} ${styles.youtube}`} // Use CSS module classes
          >
            <FontAwesomeIcon icon={faYoutube} size="2x" />
          </a>
          <a
            href="https://www.facebook.com/learnbuildteach/"
            className={`${styles.social} ${styles.facebook}`} // Use CSS module classes
          >
            <FontAwesomeIcon icon={faFacebook} size="2x" />
          </a>
          <a
            href="https://www.twitter.com/jamesqquick"
            className={`${styles.social} ${styles.twitter}`} // Use CSS module classes
          >
            <FontAwesomeIcon icon={faTwitter} size="2x" />
          </a> */}
          <a
            href="https://www.instagram.com/fan_bole_toh"
            className={`${styles.social} ${styles.instagram}`} // Use CSS module classes
          >
            <FontAwesomeIcon icon={faInstagram} size="2x" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default SocialFollow;
