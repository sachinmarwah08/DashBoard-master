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
      <Tippy
        zIndex={9999999}
        theme={"light"}
        interactive={true}
        content={
          <div
            style={{
              fontWeight: 400,
              fontFamily: "Work-Sans",
              fontSize: "20px",
              zIndex: "99999999999999999999",
            }}
          >
            <p style={{ fontWeight: 400, margin: 0, padding: "0.5rem" }}>
              {renderHashFunc(trendingHashtag)}
            </p>
          </div>
        }
      >
        <div
          onClick={() => handleChange(index)}
          className={`bubble-${name}`}
        ></div>
      </Tippy>
      <p
        onClick={() => handleChange(index)}
        className={`bubble-${name}-content`}
      >
        <span className="hashtag-title">{renderHashFunc(trendingHashtag)}</span>
      </p>
      <div className={`bubble-line-${name}`}></div>
    </>
  );
};

export default Bubble;
