import React from "react";
import classes from "./AboutUs.module.css";
import heroImg from "../../assets/common-hero.svg";
import aboutUsBottom from "../../assets/about-us-bottom.svg";
import aboutUsTop from "../../assets/about-us-top.svg";

import styles from "./AboutUs.module.css";

function Aboutus(props) {
  return (
    <div className={classes.container}>
      <img className={classes.hero} src={heroImg} alt="hero" />

      <img className={styles.image_top} src={aboutUsTop} alt="alt text" />
      <img className={styles.image_bottom} src={aboutUsBottom} alt="alt text" />

      <h2 className={styles.medium_title_box}>
        <span className={styles.medium_title}>
          <span className={styles.medium_title_span0}>
            The best place to pour
          </span>
          <span className={styles.medium_title_span1}> your words </span>
          <span className={styles.medium_title_span2}>
            or listen to them...
          </span>
        </span>
      </h2>
      <h4 className={styles.highlights}>
        Lorem ipsum dolor sit amet, te impetus eloquentiam nam, id pro summo
        graeci concludaturque, no eam mutat epicuri detracto. At inani eruditi
        nec. Te dolore qualisque eum. Tale ridens ut has, pri nibh legere soluta
        ut. Vix ad cibo delectus. Ius et euismod iracundia. Expetenda argumentum
        vim an, erat salutandi at vix.
      </h4>
      <h4 className={styles.highlights_bottom}>
        Lorem ipsum dolor sit amet, te impetus eloquentiam nam, id pro
      </h4>
    </div>
  );
}

export default Aboutus;
