import React from "react";
import FadeLoader from "react-spinners/FadeLoader";

const Content = ({ topInfluencerData, loading, lastUserRef }) => {
  return (
    <>
      {loading ? (
        <div className="loader">
          <FadeLoader color="#F05728" loading={loading} size={50} />
        </div>
      ) : (
        <div className="right-content-wrapper">
          {topInfluencerData.map((item, index) =>
            topInfluencerData.length === index + 1 ? (
              <div key={index} className="right-content">
                <ul style={{ listStyle: "none", margin: "0%", padding: "0%" }}>
                  <li
                    ref={lastUserRef}
                    style={{ padding: "1rem", paddingLeft: "0%" }}
                    className="username"
                  >
                    {item}
                  </li>
                </ul>
              </div>
            ) : (
              <div key={index} className="right-content">
                <ul style={{ listStyle: "none", margin: "0%", padding: "0%" }}>
                  <li
                    ref={lastUserRef}
                    style={{ padding: "1rem", paddingLeft: "0%" }}
                    className="username"
                  >
                    {item}
                  </li>
                </ul>
              </div>
            )
          )}
        </div>
      )}
    </>
  );
};

export default Content;
