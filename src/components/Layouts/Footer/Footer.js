import React from "react";
import "./Footer.scss";
import logo from "../../../Images/logo.svg";
import appleLogo from "../../../Images/appleLogo.png";
import googlePlayLogo from "../../../Images/googlePlayLogo.png";

const Footer = () => {
  return (
    <footer className="footer-wrapper">
      <div className="footer-inside-wrapper">
        <div className="footer-left-container">
          <div className="footer-column-one">
            <div className="footer-li">
              <img alt="logo" src={logo}></img>
              <p className="title-logo">
                Wholistic Wellbeing for a better life
              </p>
            </div>
          </div>
          <div className="footer-column-one">
            <div className="footer-li">
              <h1 className="heading">About Us</h1>
              <p className="title">Our Story</p>
              <p className="title">Careers</p>
            </div>
          </div>
          <div className="footer-column-one">
            <div className="footer-li">
              <h1 className="heading">Impact</h1>
              <p className="title">Sustain</p>
              <p className="title">Sports</p>
            </div>
          </div>
          <div className="footer-column-one">
            <div className="footer-li">
              <h1 className="heading">About Us</h1>
              <p className="title">FAQ</p>
              <p className="title">Contact Us</p>
            </div>
          </div>
        </div>
        <div className="footer-right-container">
          <div className="footer-column-one">
            <div className="footer-li">
              <h1 className="heading">Get the free round glass app</h1>
              <p className="title-right">
                Let the power of meditation & minfulness help you achieve a
                healthier, happer you
              </p>
              <div className="logos-apple">
                <img
                  alt="appleLogo"
                  className="appleLogo"
                  src={appleLogo}
                ></img>
                <img
                  alt="googlePlayLogo"
                  className="googleLogo"
                  src={googlePlayLogo}
                ></img>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
