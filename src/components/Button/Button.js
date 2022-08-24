import React, { useState } from "react";
import "./Button.scss";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Button = ({ selected, setSelected, options }) => {
  const [isActive, setActive] = useState(false);

  return (
    <div className="dropdown">
      <div onClick={(e) => setActive(!isActive)} className="dropdown-btn">
        {selected}
        {!isActive ? (
          <FontAwesomeIcon icon={faAngleDown} />
        ) : (
          <FontAwesomeIcon icon={faAngleUp} />
        )}
      </div>

      {isActive && (
        <div className="dropdown-content">
          {options.map((option) => (
            <div
              onClick={(e) => {
                setSelected(option.title);
                setActive(false);
              }}
              className="dropdown-item"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Button;
