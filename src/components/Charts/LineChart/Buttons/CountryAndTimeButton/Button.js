import React from "react";
import plus from "../../../../../Images/plus.svg";
import plusTwo from "../../../../../Images/plusTwo.svg";

const Button = ({ onClick, compareCountryActive, name }) => {
  return (
    <>
      <button
        onClick={onClick}
        className={`${
          compareCountryActive === name
            ? "right-ouline-button"
            : "right-ouline-buttonTwo"
        }`}
      >
        {compareCountryActive === name ? (
          <img alt="plusIcon" src={plus} />
        ) : (
          <img alt="plus" src={plusTwo} />
        )}
        Compare country
      </button>
    </>
  );
};

export default Button;
