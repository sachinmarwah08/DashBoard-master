import React, { useContext, useState } from "react";
import "./Button.scss";
import {
  faAngleDown,
  faAngleUp,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SET_FILTERS } from "../../../../../actions/types";
import { FilterContext } from "../../../../../context/FilterContext";
import { BeatLoader } from "react-spinners";

const Button = ({
  selected,
  setSelected,
  options,
  disabled,
  handleChange,
  lastUserRef,
  loading,
  value,
  onAddCountry,
  onSearch,
  ClearData,
}) => {
  const { dispatch, state } = useContext(FilterContext);
  const {
    filters: { countryValue },
  } = state;
  const [isActive, setActive] = useState(false);

  return (
    <div className="dropdown">
      <div
        style={disabled ? { cursor: "not-allowed" } : {}}
        onClick={disabled ? () => {} : (e) => setActive(!isActive)}
        className={`${disabled ? "dropdown-btn-disabled" : "dropdown-btn"}`}
      >
        {countryValue ? countryValue : selected}

        {!isActive ? (
          <FontAwesomeIcon icon={faAngleDown} />
        ) : (
          <FontAwesomeIcon icon={faAngleUp} />
        )}
      </div>

      {isActive && (
        <>
          <div className="dropdown-country-wrapper">
            <div
              style={{
                width: "auto",
                height: "2.4rem",
                marginTop: "0.4rem",
                paddingTop: "0.5rem",
                position: "relative",
              }}
            >
              <input
                style={{
                  padding: "0.5rem",
                  borderRadius: "4px",
                  border: "1px solid #d0d5dd",
                  width: "11.5rem",
                  outline: "none",
                  fontFamily: "Work-Sans",
                  display: "flex",
                  margin: "auto",
                }}
                type="text"
                placeholder="Search Country"
                value={value}
                onChange={(e) => {
                  onAddCountry(e);
                  onSearch(e.target.value);
                }}
              />
              {value ? (
                <button
                  style={{
                    position: "absolute",
                    top: "1.01rem",
                    left: "11.8rem",
                    border: "none",
                    outline: "none",
                    background: "transparent",
                  }}
                  onClick={ClearData}
                >
                  <FontAwesomeIcon
                    onClick={ClearData}
                    style={{
                      color: "#616161",
                      opacity: "0.6",
                      cursor: "pointer",
                    }}
                    className="close-icon-image"
                    icon={faXmark}
                  />
                </button>
              ) : (
                ""
              )}
            </div>

            {loading ? (
              <BeatLoader
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: "12rem",
                }}
                color="#F05728"
                loading={true}
                size={10}
              />
            ) : (
              <div className="dropdown-content-countryData">
                {options.map((option, index) => (
                  <div
                    ref={lastUserRef}
                    onClick={
                      disabled
                        ? () => {}
                        : (e) => {
                            dispatch({
                              type: SET_FILTERS,
                              payload: { field: "countryValue", value: "" },
                            });
                            setSelected(option);
                            handleChange(option);
                            setActive(false);
                          }
                    }
                    className="dropdown-item-countryData"
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Button;
