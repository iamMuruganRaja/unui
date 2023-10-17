// AboutUs.js
import React from "react";
import classes from "./AboutUs.module.css";
import heroImg from "../../assets/common-hero.svg";
import getInvolved from "../../assets/get-involved.png";
import aboutUsTop from "../../assets/about-us-top.svg";

import styles from "./GetInvolved.module.css";

const GetInvolved = () => {
  return (
    <section class="section">
      <span className={styles.medium_title}>
        <br></br>

        <span className={styles.medium_title_span1}> Get Involved </span>
        <p>
          We believe that the strength of our community lies in its diversity.
          We invite you to be a part of our journey and help us scale our
          vision. Whether you're an artist, a thinker, or someone who believes
          in the power of creativity, we encourage you to join our community,
          contribute your unique perspectives, and be a part of a movement
          that's redefining the boundaries of expression.
          <img
            className={styles.image_bottom}
            src={getInvolved}
            alt="alt text"
          />
          <br></br>
          Explore, engage, and evolve with UnmuteX. Together, we can make the
          digital realm a canvas for boundless creativity and a platform for
          connecting hearts and minds, one conversation at a time.
          <br></br>
          Join us in breaking barriers, forging connections, and celebrating the
          beauty of art and ideas. Together, we can shape the future of
          creativity in the digital age.
        </p>
      </span>
    </section>
  );
};

export default GetInvolved;

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
