import React from "react";
import "./RadioButton.scss";

const RadioButton = ({ checked, onchange, value, name }) => {
  return (
    <div onClick={() => onchange(value)} className="radio-button">
      <label className="container">
        <p className="positive">{name}</p>
        <input
          type="radio"
          checked={checked === value ? true : false}
          name="radio"
        />
        <span className="checkmark"></span>
      </label>
    </div>
  );
};

export default RadioButton;
