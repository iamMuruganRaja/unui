import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import logoGreen from "../../assets/logo-green.svg";

import classes from "./SplashScreen.module.css";

const SPLASH_DURATION = process.env.REACT_SPLASH_DURATION || 5000;

const SplashScreen = ({ children }) => {
    const [isSplashShown, setIsSplashShown] = useState(false);

    useEffect(() => {
        //        setTimeout(() => setIsSplashShown(true), SPLASH_DURATION);
    }, []);

    if (!isSplashShown) return children;

    return (
        <div className={classes.main_container}>
            <motion.div
                initial={{ y: -window.innerHeight }}
                animate={{ y: 0 }}
                transition={{ ease: "backInOut", duration: 1.5 }}
                className={classes.green_circle}
            >
                <motion.div
                    initial={{ scale: 0, display: "none" }}
                    animate={{ scale: 1, display: "block" }}
                    transition={{ ease: "linear", duration: 0.2, delay: 2 }}
                    className={classes.white_circle}
                >
                    <img src={logoGreen} />
                </motion.div>
            </motion.div>
        </div>
    );
};

export default SplashScreen;
