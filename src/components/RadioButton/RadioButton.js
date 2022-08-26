import React from "react";
import "./RadioButton.scss";

const RadioButton = ({ checked, onchange, value, name, radioName }) => {
  return (
    <button
      //  onClick={() => onchange(value)}
      className="radio-button"
    >
      <label className="container">
        <p className="positive">{name}</p>
        <input
          onChange={() => onchange(value)}
          defaultValue={checked}
          type="radio"
          checked={checked === value ? true : false}
          name={radioName}
        />
        <span className="checkmark"></span>
      </label>
    </button>
  );
};

export default RadioButton;
