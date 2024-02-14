// Import necessary dependencies
import React, { useContext } from "react";
import { Context } from "../../main";
import { Link } from "react-router-dom";
import { FaFacebookF, FaYoutube, FaLinkedin } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

// Footer component
const Footer = () => {
  // Accessing the isAuthorized state from the global context
  const { isAuthorized } = useContext(Context);

  // JSX rendering
  return (
    <footer className={isAuthorized ? "footerShow" : "footerHide"}>
      {/* Copyright information */}
      <div>&copy; All Rights Reserved By Souvik.</div>
      
      {/* Social media links */}
      <div>
        <Link to={"https://www.facebook.com/profile.php?id="} target="_blank">
          <FaFacebookF />
        </Link>
        <Link to={"https://www.youtube.com/@Souvik36510"} target="_blank">
          <FaYoutube />
        </Link>
        <Link to={"https://www.youtube.com/@Souvik36510"} target="_blank">
          <FaLinkedin />
        </Link>
        <Link to={"https://www.instagram.com//"} target="_blank">
          <RiInstagramFill />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
