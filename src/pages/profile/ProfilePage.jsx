import profileHero from "../../assets/account-hero.png";
import backIcon from "../../assets/back-icon.svg";
import settingsIcon from "../../assets/account-settings.png";
import twitterIcon from "../../assets/twitter-color.svg";
import instagramIcon from "../../assets/instagram-color.svg";
import facebookIcon from "../../assets/facebook-color.svg";
import galleryIcon from "../../assets/gallery-camera.png";
import galleryItem from "../../assets/account-hero.png";

import classes from "./ProfilePage.module.css";
import { useMemo, useState } from "react";
import { useAuthContext } from "../../components/contexts/AuthContext";

const ProfilePage = () => {
  const {
    authData: { userData },
  } = useAuthContext();

  console.log({ userData });

  const userDetails = useMemo(
    () => ({
      pfp: "https://images.unsplash.com/photo-1573554893531-5779992f6cd2",
      full_name: `${userData?.first_name} ${userData?.last_name || ""}`,
      bio: `${userData?.role || ""}`,
    }),
    [userData]
  );

  const [galleryItems, setGalleryItems] = useState([]);

  return (
    <div
      className={classes.container}
      style={{ backgroundImage: `url("${profileHero}")` }}
    >
      <nav className={classes.account_nav}>
        <button className={classes.nav_button}>
          <img className={classes.nav_button_icon} src={backIcon} alt="back" />
        </button>
        <button className={classes.nav_button}>
          <img
            className={classes.nav_button_icon}
            src={settingsIcon}
            alt="settings"
          />
        </button>
      </nav>

      <div className={classes.details_container}>
        <div className={classes.account_avatar}>
          {userDetails?.full_name.substring(0, 1)}
        </div>

        <h2 className={classes.account_name}>{userDetails.full_name}</h2>
        <p className={classes.account_bio}>{userDetails.bio || ""}</p>

        {/* <div className={classes.socials_container}>
          <div className={classes.social}>
            <img
              src={twitterIcon}
              alt="social"
              className={classes.social_img}
            />

            <button className={classes.social_button}>Friends</button>
          </div>
          <div className={classes.social}>
            <img
              src={instagramIcon}
              alt="social"
              className={classes.social_img}
            />

            <button className={classes.social_button}>Messages</button>
          </div>
          <div className={classes.social}>
            <img
              src={facebookIcon}
              alt="social"
              className={classes.social_img}
            />

            <button className={classes.social_button}>My Events</button>
          </div>
        </div> */}
      </div>
      <div className={classes.gallery_container}>
        <h1 className={classes.gallery_header}>
          <img
            src={galleryIcon}
            alt="gallery"
            className={classes.gallery_image}
          />
          My Gallery
        </h1>

        {galleryItems.length === 0 ? (
          <div className={classes.no_items_message}>Coming Soon</div>
        ) : (
          <div className={classes.gallery}>
            {galleryItems.map((item) => (
              <img
                src={item.background}
                alt="gallery-item"
                className={classes.gallery_item}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
