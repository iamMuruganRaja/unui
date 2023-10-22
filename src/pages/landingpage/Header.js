import React, { useEffect, useState, useRef } from "react";
import "./styles.css";
import headphone from "../../assets/headphone.png";
import logogreen from "../../assets/logo-green.svg";
import logowhite from "../../assets/logo-white.svg";
import { debounce } from "lodash";

const Header = () => {
  const [isHeaderShrunk, setIsHeaderShrunk] = useState(false);
  const headerRef = useRef(null); // Create a ref for the header element

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollToContent = () => {
    const contentSection = document.getElementById("content");
    if (contentSection) {
      window.scrollTo({
        top: contentSection.offsetTop,
        behavior: "smooth",
      });
    }
  };

  const handleScroll = () => {
    if (window.scrollY > 10 && !isHeaderShrunk) {
      setIsHeaderShrunk(true);
    } else if (window.scrollY <= 10 && isHeaderShrunk) {
      setIsHeaderShrunk(false);
    }
  };

  const debouncedHandleScroll = debounce(handleScroll, 100); // Adjust the delay (100ms in this example) as needed

  useEffect(() => {
    window.addEventListener("scroll", debouncedHandleScroll);
    return () => {
      window.removeEventListener("scroll", debouncedHandleScroll);
    };
  }, [isHeaderShrunk]);

  return (
    <header
      ref={headerRef}
      className={`header ${isHeaderShrunk ? "shrink" : ""}`}
    >
      <div className="logo">
        <img src={headphone} alt="UnmuteX Logo" />
      </div>
      <div className="header-content">
        <h1>UnmuteX</h1>
        <h2>Celebrating Creativity, Uniting Hearts!</h2>
      </div>

      {!isHeaderShrunk && (
        <div className="scroll-down" onClick={scrollToContent}>
          <div className="scroll-arrow-down">
            <span>&#8595;</span>
          </div>
        </div>
      )}
      <div
        className={`scroll-to-top ${isHeaderShrunk ? "show" : ""}`}
        onClick={scrollToTop}
      >
        &#8593;
      </div>
      <img id="small-logo" src={logowhite} alt="Small Logo" />
    </header>
  );
};

export default Header;
