import React, { useState, useRef, useEffect } from "react";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DropdownButton = ({ icon, name, data, selectedVal, handleChange }) => {
  const [isFilterActive, setIsFilterActive] = useState(false);

  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    document.addEventListener("click", toggle);
    return () => document.removeEventListener("click", toggle);
  }, []);

  const selectOption = (option) => {
    setQuery(() => "");
    handleChange(option);
    setIsOpen((isOpen) => !isOpen);
  };

  function toggle(e) {
    setIsOpen(e && e.target === inputRef.current);
  }

  const getDisplayValue = () => {
    if (query) return query;
    if (selectedVal) return selectedVal;

    return "";
  };

  const filter = (data) => {
    return data.filter(
      (option) => option.toLowerCase().indexOf(query.toLowerCase()) > -1
    );
  };

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

          <input
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: "#667085",
              fontSize: "16px",
              fontWeight: 400,
              fontFamily: "Work-Sans",
              width: "100%",
              outline: "none",
              margin: 0,
            }}
            className="dropdown-input"
            ref={inputRef}
            placeholder={name}
            type="text"
            value={getDisplayValue()}
            name="searchTerm"
            onChange={(e) => {
              setQuery(e.target.value);
              handleChange(null);
            }}
            onClick={toggle}
          />
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
            {filter(data).map((option, index) => (
              <div
                key={index}
                onClick={() => selectOption(option)}
                className="dropdown-filter-item"
              >
                <ul style={{ margin: "0%", padding: "0%" }}>
                  <li className="dropdown-list">{option}</li>
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
