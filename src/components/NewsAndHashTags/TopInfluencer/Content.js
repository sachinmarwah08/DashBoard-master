import React from "react";
import PuffLoader from "react-spinners/PuffLoader";

const Content = ({ topInfluencerData, loading }) => {
  return (
    <>
      {loading ? (
        <div className="loader">
          <PuffLoader color="#F05728" loading={loading} size={50} />
        </div>
      ) : (
        <div className="right-content-wrapper">
          {topInfluencerData.slice(0, 15).map((item, index) => (
            <div key={index} className="right-content">
              <ul style={{ listStyle: "none", margin: "0%", padding: "0%" }}>
                <li
                  style={{ padding: "1rem", paddingLeft: "0%" }}
                  className="username"
                >
                  {item}
                </li>
              </ul>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Content;
