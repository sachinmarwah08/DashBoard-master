import React from "react";
import plus from "../../../../../Images/plus.svg";
import plusTwo from "../../../../../Images/plusTwo.svg";

const Button = ({ onClick, compareCountryActive, value, name }) => {
  return (
    <>
      <button
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
    </>
  );
};

export default Button;
