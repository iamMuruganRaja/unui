// AboutUs.js
import React from "react";
// import classes from "./AboutUs.module.css";
// import heroImg from "../../assets/common-hero.svg";
// // import ourJourney from "../../assets/our-journey.png";
// import aboutUsTop from "../../assets/about-us-top.svg";

import styles from "./OurJourney.module.css";

const OurJourney = () => {
  return (
    <section class="section">
      <span className={styles.medium_title}>
        <br></br>

        <span className={styles.medium_title_span1}> Our Journey </span>
        <p>
          Our Instagram page, "Fan Bole Toh," has been a testament to our
          commitment to this mission. Over the last 18 months, we've taken
          monumental steps towards achieving our vision.
          <img
            className={styles.image_bottom}
            src={
              "https://ik.imagekit.io/unmutex/unmutex-website-public/our-journey.png?updatedAt=1701972450139"
            }
            alt="alt text"
          />
          With over 200+ online open mic events, we've witnessed the emergence
          of raw, unbridled talent from countless new faces. We've been inspired
          by the artistic brilliance and passion displayed by our community
          members.
        </p>
      </span>
    </section>
  );
};

export default OurJourney;

// import React from "react";
// import classes from "./AboutUs.module.css";
// import heroImg from "../../assets/common-hero.svg";
// import aboutUsBottom from "../../assets/about-us-bottom.svg";
// import aboutUsTop from "../../assets/about-us-top.svg";

// import styles from "./AboutUs.module.css";

// function Aboutus(props) {
//   return (
//     <div className={classes.container}>
//       <img className={classes.hero} src={heroImg} alt="hero" />

//       <img className={styles.image_top} src={aboutUsTop} alt="alt text" />
//       <img className={styles.image_bottom} src={aboutUsBottom} alt="alt text" />

//       <h2 className={styles.medium_title_box}>
//         <span className={styles.medium_title}>
//           <span className={styles.medium_title_span0}>
//             The best place to pour
//           </span>
//           <span className={styles.medium_title_span1}> your words </span>
//           <span className={styles.medium_title_span2}>
//             or listen to them...
//           </span>
//         </span>
//       </h2>
//       <h4 className={styles.highlights}>
//         Lorem ipsum dolor sit amet, te impetus eloquentiam nam, id pro summo
//         graeci concludaturque, no eam mutat epicuri detracto. At inani eruditi
//         nec. Te dolore qualisque eum. Tale ridens ut has, pri nibh legere soluta
//         ut. Vix ad cibo delectus. Ius et euismod iracundia. Expetenda argumentum
//         vim an, erat salutandi at vix.
//       </h4>
//       <h4 className={styles.highlights_bottom}>
//         Lorem ipsum dolor sit amet, te impetus eloquentiam nam, id pro
//       </h4>
//     </div>
//   );
// }

// export default Aboutus;
