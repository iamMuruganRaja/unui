import hamburgerIcon from "../../assets/hamburger.svg";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

import { useAuthContext } from "../contexts/AuthContext";

import classes from "./Header.module.css";
import { Link } from "react-router-dom";
import { logoutUser } from "../../utils/storage.utils";
import topLeftLogo from '../../assets/top-logo.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
} from "@fortawesome/free-solid-svg-icons";

const sidebarVariants = {
  open: {
    x: 0,
  },
  closed: {
    x: "100%",
  },
};

const headerContainerStyle = {
  backgroundColor: "#2ed365",
  height: "60px",
  position: "sticky",
  top: "0",
  zIndex: "100",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "20px",
};

const logoContainerStyle = {
  width: "50px",
  height: "50px",
  position: "absolute",
  left: "5%",
  // bottom: "-20px",
};

const logoStyle = {
  width: "100%",
  height: "100%",
  borderRadius: "50%",
  backgroundColor: "white",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const Header = () => {
  const { isAuthLoading, authData } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  if (isAuthLoading) return <></>;

  const toggleSidebar = () => {
    setIsOpen((i) => !i);
  };

  

  return (
    <div style={headerContainerStyle}>
      <div style={logoContainerStyle}>
        <div style={logoStyle}>
          <img src={topLeftLogo} alt="Logo" />
        </div>
      </div>
      {/* <button
        className={classes.hamburger_icon_container}
        onClick={toggleSidebar}
      >
        <img
          alt="icon"
          src={hamburgerIcon}
          className={classes.hamburger_icon}
        />
      </button> */}

      <div  className={classes.hamburger_icon_container} onClick={toggleSidebar}>
            <FontAwesomeIcon
              icon={faBars}
              style={{
                color: "#f0f2f5",
                position: "absolute",
                top: "10px",
                right: "10px",
                size:"fa-2xl"
                
              }}
            />
          </div>
      <motion.div
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={sidebarVariants}
        className={classes.sidebar}
        transition={{
            type: "spring", // You can use different transition types like "tween", "spring", or "inertia"
            stiffness: 500, // Adjust the stiffness for the spring effect
            damping: 40, // Adjust the damping for the spring effect
          }}
      >
        <Link className={classes.nav_link} to="/">
          HOME
        </Link>
        <Link className={classes.nav_link} to="/about-us">
          ABOUT US
        </Link>
        <Link className={classes.nav_link} to="/upcoming">
          UPCOMING EVENTS
        </Link>
        {authData.isAuthenticated ? (
          <button className={classes.nav_link} onClick={logoutUser}>
            LOGOUT
          </button>
        ) : (
          <Link to="/register" className={classes.nav_link}>
            SIGN-IN/REGISTER
          </Link>
        )}
      </motion.div>
    </div>
  );
};

export default Header;
