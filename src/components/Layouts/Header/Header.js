import React from "react";
import "./Header.scss";
import logo from "../../../Images/logo.svg";
import { faSortDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const navigateHome = () => {
    navigate("/");
  };
  return (
    <header className="header-container">
      <div className="main-content">
        <div className="logo">
          <img
            onClick={navigateHome}
            alt="logo"
            className="logo-image"
            src={logo}
          ></img>
        </div>
        <div className="links">
          <div className="links-data">
            <a href="" className="icon-button">
              WELLBEING
              <div className="icon">
                <FontAwesomeIcon icon={faSortDown} />
              </div>
            </a>
            <a href="" className="icon-button">
              IMPACT
              <div className="icon">
                <FontAwesomeIcon icon={faSortDown} />
              </div>
            </a>
            <a href="" className="icon-button">
              LOGIN
            </a>
            <button className="join-free-button">JOIN FREE</button>
            <a href="" className="icon-button">
              GLOBAL
              <div className="icon">
                <FontAwesomeIcon icon={faSortDown} />
              </div>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
