import React, { useState } from "react";
import hamburgerIcon from "../../assets/hamburger.svg";
import { motion } from "framer-motion";

import { useAuthContext } from "../contexts/AuthContext";

import classes from "./NavbarComponent.module.css";
import { Link } from "react-router-dom";

function NavbarComponent() {
  const { isAuthLoading, authData } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);

  if (isAuthLoading || !authData.isAuthenticated) return <></>;

  const toggleSidebar = () => {
    setIsOpen((i) => !i);
  };

  return (
    <div className={classes.navbar}>
      <div></div>
      <button
        className={classes.hamburger_icon_container}
        onClick={toggleSidebar}
      >
        <img src={hamburgerIcon} className={classes.hamburger_icon} />
      </button>

      <motion.div
        className={classes.sidebar}
        animate={{ x: isOpen ? 0 : window.innerWidth }}
        transition={{ bounce: 0 }}
      >
        <Link className={classes.nav_link}>HOME</Link>
        <Link className={classes.nav_link}>ABOUT US</Link>
        <Link className={classes.nav_link}>UPCOMING EVENTS</Link>
        <Link className={classes.nav_link}>GALLERY</Link>
        <Link className={classes.nav_link}>ROLES</Link>
        <Link className={classes.nav_link}>GROW TOGETHER</Link>
        <Link className={classes.nav_link}>RECENT HIGHLIGHTS</Link>
        <Link className={classes.nav_link}>REQUESTS</Link>
        <Link className={classes.nav_link}>SIGN-IN/REGISTER</Link>
      </motion.div>
    </div>
  );
}

export default NavbarComponent;
