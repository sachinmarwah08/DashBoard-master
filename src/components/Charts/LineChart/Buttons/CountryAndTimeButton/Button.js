import React from "react";
import plus from "../../../../../Images/plus.svg";
import plusTwo from "../../../../../Images/plusTwo.svg";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import "tippy.js/dist/svg-arrow.css";

const Button = ({
  onClick,
  compareCountryActive,
  value,
  name,
  compareCountryvalue,
  compareTimevalue,
}) => {
  return (
    <>
      <Tippy
        theme={"light"}
        interactive={true}
        content={
          (compareCountryvalue && (
            <div
              style={{
                padding: "0.5rem",
                fontWeight: 400,
                fontFamily: "Work-Sans",
                fontSize: "14px",
              }}
            >
              <p style={{ fontWeight: 600, marginTop: 0 }}>Compare Country</p>
              This button compares the wellbeing interest and sentiment scores
              for countries during the same time period.
            </div>
          )) ||
          (compareTimevalue && (
            <div
              style={{
                padding: "0.5rem",
                fontWeight: 400,
                fontFamily: "Work-Sans",
                fontSize: "14px",
              }}
            >
              <p style={{ fontWeight: 600, marginTop: 0 }}>Compare Time</p>
              This button compares a country's wellbeing interest and sentiment
              score over different time periods.
            </div>
          ))
        }
      >
        <button
          style={{ fontFamily: "Work-Sans" }}
          onClick={onClick}
          className={`${
            compareCountryActive === value
              ? "right-ouline-button"
              : "right-ouline-buttonTwo"
          }`}
        >
          {compareCountryActive === value ? (
            <img alt="plusIcon" src={plus} />
          ) : (
            <img alt="plus" src={plusTwo} />
          )}
          {name}
        </button>
      </Tippy>
    </>
  );
};

export default Button;
