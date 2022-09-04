import React from "react";
import twitterLogo from "../../../../Images/TwitterLogo.svg";
import PuffLoader from "react-spinners/PuffLoader";

const Content = ({ filterData, loading }) => {
  return (
    <>
      {loading ? (
        <div className="loader">
          <PuffLoader color="#F05728" loading={loading} size={50} />
        </div>
      ) : (
        <div className="left-content-wrapper">
          {/* <div className="loader">
            <PuffLoader color="#F05728" loading={loading} size={50} />
          </div> */}
          {filterData.map((item, index) => (
            <div key={index} className="left-content">
              <h1 className="left-content-heading">
                <span className="heading-colored">
                  {/* {item.htag[0]} {""} */}
                </span>

                {item.events}
              </h1>
              <p className="hashtags">
                {/* {item.hashtags} */}

                <span className="hashtags-colored">
                  {item.htag
                    .filter((item) => {
                      return item.length >= 1;
                    })
                    .join(" ")}
                </span>
              </p>
              <a
                href={item.url}
                rel="noreferrer"
                target="_blank"
                className="link"
              >
                {item.url}
              </a>
              <div className="twitter-details">
                <img
                  alt="twitter"
                  className="twitter-logo"
                  src={twitterLogo}
                ></img>
                <p className="username">@{item.username}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Content;
