import React from "react";
import "./styles.css";
import Header from "../../components/topbar/Headers";

const Section = () => {
  return (
    <div>
      <Header />
      <section className="section">
        {/* <Header /> */}
        <h2>About Us - UnmuteX</h2>
        <p>
          Welcome to UnmuteX, your gateway to a vibrant Indian platform
          dedicated to fostering group conversations, idea exchanges, and the
          flourishing expression of arts in the exciting era of the Internet. At
          UnmuteX, we believe that the power of community transcends
          geographical boundaries and language barriers. Our mission is to unite
          individuals from diverse backgrounds, celebrating the richness of
          Indian culture and creativity while breaking down the barriers that
          separate us.
        </p>
      </section>
    </div>
  );
};

export default Section;
