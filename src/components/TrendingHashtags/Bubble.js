import React from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import "tippy.js/dist/svg-arrow.css";

const Bubble = ({ name, index, handleChange, trendingHashtag }) => {
  const renderHashFunc = (data) => {
    return data && data.length && data[index] && data[index]?.hashtag?.htag;
  };

  return (
    <>
      <div className={`bubble-${name}`}></div>
      <Tippy
        theme={"light"}
        interactive={true}
        content={
          <div
            style={{
              fontWeight: 400,
              fontFamily: "Work-Sans",
              fontSize: "20px",
            }}
          >
            <p style={{ fontWeight: 400, margin: 0, padding: "0.5rem" }}>
              {renderHashFunc(trendingHashtag)}
            </p>
          </div>
        }
      >
        <p
          onClick={() => handleChange(index)}
          className={`bubble-${name}-content`}
        >
          <span className="hashtag-title">
            {/* {trendingHashtag &&
              trendingHashtag.length &&
              trendingHashtag[index].hashtag.htag} */}
            {renderHashFunc(trendingHashtag)}
          </span>
        </p>
      </Tippy>
      <div className={`bubble-line-${name}`}></div>
    </>
  );
};

export default Bubble;
