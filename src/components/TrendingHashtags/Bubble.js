import React, { useState } from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import "tippy.js/dist/svg-arrow.css";

const Bubble = ({
  name,
  index,
  handleChange,
  trendingHashtag,
  toggle,
  dropdown,
  wrapperRef,
}) => {
  const renderHashFunc = (data) => {
    return data && data.length && data[index] && data[index]?.hashtag?.htag;
  };

  return (
    <>
      {/* {toggle && dropdown ? (
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
            onClick={() => {
              handleChange(index);
            }}
            className={
              toggle && dropdown === index
                ? `bubble-${name}-colored`
                : `bubble-${name}-opacity`
            }
            // className={toggle && dropdown === index && `bubble-${name}-colored`}
          >
            <p
              ref={wrapperRef}
              onClick={() => handleChange(index)}
              className={`bubble-${name}-content`}
            >
              <span className="hashtag-title">
                {renderHashFunc(trendingHashtag)}
              </span>
            </p>
          </div>
        </Tippy>
      ) : (
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
            onClick={() => {
              handleChange(index);
            }}
            className={
              toggle && dropdown === index
                ? `bubble-${name}-colored`
                : `bubble-${name}`
            }
          >
            <p
              ref={wrapperRef}
              onClick={() => handleChange(index)}
              className={`bubble-${name}-content`}
            >
              <span className="hashtag-title">
                {renderHashFunc(trendingHashtag)}
              </span>
            </p>
          </div>
        </Tippy>
      )} */}

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
          onClick={() => {
            handleChange(index);
          }}
          className={
            toggle && dropdown === index
              ? `bubble-${name}-colored`
              : `bubble-${name}`
          }
        >
          <p
            ref={wrapperRef}
            onClick={() => handleChange(index)}
            className={`bubble-${name}-content`}
          >
            <span className="hashtag-title">
              {renderHashFunc(trendingHashtag)}
            </span>
          </p>
        </div>
      </Tippy>
      <div className={`bubble-line-${name}`}></div>
    </>
  );
};

export default Bubble;
