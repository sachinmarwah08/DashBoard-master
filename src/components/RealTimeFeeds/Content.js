import React from "react";

const Content = ({ filterData }) => {
  return (
    <div className="left-content-wrapper">
      {filterData.map((item) => (
        <div key={item.id} className="left-content">
          <h1 className="left-content-heading">
            <span className="heading-colored">{item.colredHeading}</span> ❤️
            {item.heading}
          </h1>
          <p className="hashtags">
            {item.hashtags}
            <span className="hashtags-colored">{item.coloredHastags}</span>
            ❤️
          </p>
          <a href={item.link} rel="noreferrer" target="_blank" className="link">
            {item.link}
          </a>
          <div className="twitter-details">
            <img
              alt="twitter"
              className="twitter-logo"
              src={item.twitterLogo}
            ></img>
            <p className="username">{item.userName}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Content;
