import React, { useEffect, useState } from "react";
import hamburgerIcon from "../../assets/hamburger.svg";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

import { useAuthContext } from "../contexts/AuthContext";

import classes from "./TopNav.module.css";
import { Link } from "react-router-dom";
import { logoutUser } from "../../utils/storage.utils";

function TopNav() {
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

  if (location.pathname === "/profile") return <></>;

  return (
    <div className={classes.navbar}>
      <button
        className={classes.hamburger_icon_container}
        onClick={toggleSidebar}
      >
        <img
          alt="icon"
          src={hamburgerIcon}
          className={classes.hamburger_icon}
        />
      </button>

      <motion.div
        className={classes.sidebar}
        initial={{ x: isOpen ? "0%" : "100%" }} /* Completely hide sidebar initially */
        animate={{ x: isOpen ? "0%" : "100%" }} /* Show/hide sidebar by moving it */
        transition={{ bounce: 0 }}
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
}

export default TopNav;
