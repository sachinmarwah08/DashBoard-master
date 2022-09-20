import React, { useContext, useState } from "react";
import "./Button.scss";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SET_FILTERS } from "../../../../../actions/types";
import { FilterContext } from "../../../../../context/FilterContext";
import { FadeLoader } from "react-spinners";

const Button = ({
  selected,
  setSelected,
  options,
  disabled,
  handleChange,
  lastUserRef,
  loading,
  onAddCountry,
  inputValue,
  onSearch,
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
        {/* <input
          type="text"
          onChange={(e) => {
            onSearch(e.target.value);
            handleChange(e);
          }}
          value={countryValue ? countryValue : selected}
        /> */}
        {!isActive ? (
          <FontAwesomeIcon icon={faAngleDown} />
        ) : (
          <FontAwesomeIcon icon={faAngleUp} />
        )}
      </div>

      {isActive && (
        <>
          <div className="dropdown-content-countryData">
            {options.map((option, index) =>
              options.length === index + 1 ? (
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
              ) : (
                <div
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
              )
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Button;
