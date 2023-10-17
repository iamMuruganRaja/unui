import React from "react";
import classes from "./AboutUs.module.css";
import heroImg from "../../assets/common-hero.svg";
import aboutUs from "../../assets/about-us.png";
import aboutUsTop from "../../assets/about-us-top.svg";

import styles from "./AboutUs.module.css";

const AboutUs = () => {
  return (
    <section class="section">
      <span className={styles.medium_title}>
        <br></br>
        <span className={styles.medium_title_span0}>Welcome to</span>
        <span className={styles.medium_title_span1}> UnmuteX </span>
        <p>
          your gateway to a vibrant Indian platform dedicated to fostering group
          conversations, idea exchanges, and the flourishing expression of arts
          in the exciting era of the Internet.
          <img className={styles.image_bottom} src={aboutUs} alt="alt text" />
          <br></br>
          At UnmuteX, we believe that the power of community transcends
          geographical boundaries and language barriers. Our mission is to unite
          individuals from diverse backgrounds, celebrating the richness of
          Indian culture and creativity while breaking down the barriers that
          separate us.
        </p>
      </span>
    </section>
  );
};

export default AboutUs;
