import React, { forwardRef } from "react";
import { FadeLoader, BeatLoader } from "react-spinners";

const Content = forwardRef(
  ({ topInfluencerData, loading, lastUserRef }, ref) => {
    return (
      <>
        {loading ? (
          <div className="loader">
            <FadeLoader color="#F05728" loading={loading} size={50} />
          </div>
        ) : (
          <div ref={ref} className="right-content-wrapper">
            {topInfluencerData &&
              topInfluencerData.map((item, index) =>
                topInfluencerData.length === index + 1 ? (
                  <div key={index} className="right-content">
                    <ul
                      style={{ listStyle: "none", margin: "0%", padding: "0%" }}
                    >
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
                  <div ref={ref} key={index} className="right-content">
                    <ul
                      style={{ listStyle: "none", margin: "0%", padding: "0%" }}
                    >
                      <li
                        style={{ padding: "1rem", paddingLeft: "0%" }}
                        className="username"
                      >
                        {item}
                      </li>
                    </ul>
                  </div>
                )
              )}
            {loading && (
              <BeatLoader color="#F05728" loading={loading} size={10} />
            )}
          </div>
        )}
      </>
    );
  }
);

export default Content;
