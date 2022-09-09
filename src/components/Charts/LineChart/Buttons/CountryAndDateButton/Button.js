import React, { useState } from "react";
import "./Button.scss";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Button = ({ selected, setSelected, options, disabled, handleChange }) => {
  const [isActive, setActive] = useState(false);

  return (
    <div className="dropdown">
      <div
        style={disabled ? { cursor: "not-allowed" } : {}}
        onClick={disabled ? () => {} : (e) => setActive(!isActive)}
        className={`${disabled ? "dropdown-btn-disabled" : "dropdown-btn"}`}
      >
        {selected}
        {!isActive ? (
          <FontAwesomeIcon icon={faAngleDown} />
        ) : (
          <FontAwesomeIcon icon={faAngleUp} />
        )}
      </div>

      {isActive && (
        <div className="dropdown-content-countryData">
          {options.map((option) => (
            <div>
              <div
                onClick={
                  disabled
                    ? () => {}
                    : (e) => {
                        setSelected(option);
                        handleChange(option);
                        setActive(false);
                      }
                }
                className="dropdown-item-countryData"
              >
                {option}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Button;
