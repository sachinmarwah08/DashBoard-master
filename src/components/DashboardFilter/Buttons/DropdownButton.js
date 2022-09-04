import React, { useState } from "react";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const data = [
  "hello",
  "hello",
  "hello",
  "hello",
  "hello",
  "hello",
  "hello",
  "hello",
  "hello",
  "hello",
  "hello",
  "hello",
  "hello",
  "hello",
  "hello",
  "hello",
  "hello",
  "hello",
  "hello",
  "hello",
  "hello",
  "hello",
  "hello",
];

const DropdownButton = ({ icon, name }) => {
  const [isFilterActive, setIsFilterActive] = useState(false);
  return (
    <button
      onClick={() => setIsFilterActive(!isFilterActive)}
      className={`${
        isFilterActive
          ? " dropdown-filter-button-colored"
          : "dropdown-filter-button"
      }`}
    >
      <div className="dropdown-filter-content">
        <div className="filter-content">
          <img className="user-Icon" src={icon}></img>
          <p className="filter-title">{name}</p>
        </div>
        <div className="dropdown-Icon">
          {!isFilterActive ? (
            <FontAwesomeIcon className="faAngleDown" icon={faAngleDown} />
          ) : (
            <FontAwesomeIcon className="faAngleDown" icon={faAngleUp} />
          )}
        </div>
      </div>
      {isFilterActive && (
        <div className="dropdown-filter-wrapper">
          <div className="overflow-wrapper">
            {data.map((item) => (
              <div className="dropdown-filter-item">
                <ul style={{ margin: "0%", padding: "0%" }}>
                  <li className="dropdown-list">{item}</li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </button>
  );
};

export default DropdownButton;
