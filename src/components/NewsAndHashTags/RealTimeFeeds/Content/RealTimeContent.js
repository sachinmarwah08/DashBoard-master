import React from "react";
import twitterLogo from "../../../../Images/TwitterLogo.svg";
import { FadeLoader } from "react-spinners";

const Content = ({ filterData, loading, lastUserRef }) => {
  return (
    <>
      {loading ? (
        <div className="loader">
          <FadeLoader color="#F05728" loading={loading} size={50} />
        </div>
      ) : (
        <div className="left-content-wrapper">
          {filterData.map((item, index) =>
            filterData.length === index + 1 ? (
              <div ref={lastUserRef} key={index} className="left-content">
                <a
                  href={item.url}
                  rel="noreferrer"
                  target="_blank"
                  className="left-content-heading"
                >
                  {item.events}
                </a>
                <p className="hashtags">
                  <span className="hashtags-colored">
                    {item.htag
                      .filter((item) => {
                        return item.length >= 1;
                      })
                      .join(" ")}
                  </span>
                </p>

                <div className="twitter-details">
                  <img
                    alt="twitter"
                    className="twitter-logo"
                    src={twitterLogo}
                  ></img>
                  <p className="username">@{item.username}</p>
                </div>
              </div>
            ) : (
              <div
                ref={lastUserRef}
                key={index}
                className="left-content-tweets"
              >
                <a
                  href={item.url}
                  rel="noreferrer"
                  target="_blank"
                  className="left-content-heading"
                >
                  {item.events}
                </a>
                <p className="hashtags">
                  <span className="hashtags-colored">
                    {item.htag
                      .filter((item) => {
                        return item.length >= 1;
                      })
                      .join(" ")}
                  </span>
                </p>

                <div className="twitter-details">
                  <img
                    alt="twitter"
                    className="twitter-logo"
                    src={twitterLogo}
                  ></img>
                  <p className="username">@{item.username}</p>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </>
  );
};

export default Content;
