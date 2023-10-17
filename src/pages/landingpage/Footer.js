import React from "react";
import "./Footer.module.css"; // Make sure to adjust the CSS file path

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <div className="address">
            <h3>Registered Address</h3>
            <p>
              13/14, 2nd Cross 7th Phase J.P Nagar, <br />
              Bangalore, Karnataka <br />
              560078
            </p>
          </div>
          <div className="social-icons">
            {/* Add your social media icons here */}
          </div>
        </div>
        <div className="copyright">
          &copy; {new Date().getFullYear()} NAMAHTEY DAIS (OPC) PRIVATE LIMITED.
          All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
