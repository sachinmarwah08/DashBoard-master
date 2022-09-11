import React, { useState } from 'react';
import './TopBottomButton.scss';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TopBottomButton = ({
  topBottom,
  topBottomData,
  setTopBottom,
  handleChange,
  onTopBottomClick,
}) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="btn-wrapper">
      <button onClick={() => setIsActive(!isActive)} className="btn-container">
        <FontAwesomeIcon icon={faAngleDown} />

        {isActive && (
          <div className="content-container">
            {topBottomData.map((option) => (
              <>
                <div
                  style={{ fontFamily: 'Work-Sans' }}
                  onClick={() => {
                    handleChange(
                      (option === topBottomData[0] &&
                        'Top 10 Countries Wellbeing Analysis') ||
                        (option === topBottomData[1] &&
                          'Bottom 10 Countries Wellbeing Analysis')
                    );
                    setTopBottom(option);
                    onTopBottomClick(option);
                  }}
                  className="filter-item"
                >
                  {option}

                  <div className="sort-circle">
                    {topBottom === option && (
                      <div className="sort-circle-colored"></div>
                    )}
                  </div>
                </div>
              </>
            ))}
          </div>
        )}
      </button>
    </div>
  );
};

export default TopBottomButton;
