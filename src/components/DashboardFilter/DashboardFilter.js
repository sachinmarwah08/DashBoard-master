import React, { useContext, useEffect, useRef, useState } from 'react';
import './DashboardFilter.scss';
import DropdownButton from './Buttons/DropdownButton';
import userIcon from '../../Images/userIcon.svg';
import hashtagIcon from '../../Images/hashtagIcon.svg';
import locationIcon from '../../Images/locationIcon.svg';
import calenderIcon from '../../Images/calenderIcon.svg';
import CalenderButton from './Buttons/CalenderButton';
import {
  getCountryDropdownData,
  getHashtagDropdownData,
  getInfluencerDropdownData,
} from '../../actions/DropDownApis';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';
import 'tippy.js/dist/svg-arrow.css';
import { FilterContext } from '../../context/FilterContext';
import {
  RESET_FILTERS,
  SET_FILTERS,
  TOGGLE_CALENDER,
  UPDATE_ALL_LOADERS_TRUE,
} from '../../actions/types';

const DashboardFilter = () => {
  const { state, dispatch } = useContext(FilterContext);
  console.log(state);
  const { influencerValue, hashtagValue, countryValue } = state.filters;

  const [influencer, setIinfluencer] = useState([]);
  const [hashtag, sethashtag] = useState([]);
  const [country, setCountry] = useState([]);

  useEffect(() => {
    const callApi = async () => {
      const countryDataResponse = await getCountryDropdownData();
      const influencerDataResponse = await getInfluencerDropdownData();
      const hashtagDataResponse = await getHashtagDropdownData();
      setCountry(countryDataResponse);
      setIinfluencer(influencerDataResponse);
      sethashtag(hashtagDataResponse);
    };
    callApi();
  }, []);

  const headerRef = useRef();
  if (typeof document !== `undefined`) {
    document.addEventListener('scroll', function () {
      if (headerRef.current) {
        const documentTop =
          document.body.scrollTop || document.documentElement.scrollTop;
        if (documentTop > 280)
          headerRef.current.classList.add('hide-filter-icon');
        else headerRef.current.classList.remove('hide-filter-icon');
      }
    });
  }

  const onInfluencerChange = (val) => {
    dispatch({
      type: SET_FILTERS,
      payload: { field: 'influencerValue', value: val },
    });
  };
  const onHashTagChange = (val) => {
    dispatch({
      type: SET_FILTERS,
      payload: { field: 'hashtagValue', value: val },
    });
  };
  const onCountryChange = (val) => {
    dispatch({
      type: SET_FILTERS,
      payload: { field: 'countryValue', value: val },
    });
  };

  const onApplyAllClick = () => {
    dispatch({ type: UPDATE_ALL_LOADERS_TRUE });
    dispatch({ type: TOGGLE_CALENDER });
  };

  const onResetFiltersClick = () => {
    dispatch({ type: RESET_FILTERS });
  };

  return (
    <>
      <div className="filter-wrapper">
        <div className="buttons-wrapper">
          <div className="dropdown-btn-wrapper">
            <Tippy
              theme={'light'}
              interactive={true}
              content={
                <div
                  style={{
                    padding: '0.5rem',
                    fontWeight: 400,
                    fontFamily: 'Work-Sans',
                    fontSize: '14px',
                  }}
                >
                  <p style={{ fontWeight: 600, marginTop: 0 }}>Influencers</p>
                  Select the influencer from the drop-down list that you want to
                  analyse.
                </div>
              }
            >
              <div>
                <DropdownButton
                  data={influencer}
                  selectedVal={influencerValue}
                  handleChange={(val) => onInfluencerChange(val)}
                  icon={userIcon}
                  name="Search influencer"
                />
              </div>
            </Tippy>

            <Tippy
              theme={'light'}
              interactive={true}
              content={
                <div
                  style={{
                    padding: '0.5rem',
                    fontWeight: 400,
                    fontFamily: 'Work-Sans',
                    fontSize: '14px',
                  }}
                >
                  <p style={{ fontWeight: 600, marginTop: 0 }}>
                    Trending Hashtags
                  </p>
                  Select the hashtag from the drop-down list that you want to
                  analyse.
                </div>
              }
            >
              <div>
                <DropdownButton
                  data={hashtag}
                  selectedVal={hashtagValue}
                  handleChange={(val) => onHashTagChange(val)}
                  icon={hashtagIcon}
                  name="Search hashtag"
                />
              </div>
            </Tippy>

            <Tippy
              theme={'light'}
              interactive={true}
              content={
                <div
                  style={{
                    padding: '0.5rem',
                    fontWeight: 400,
                    fontFamily: 'Work-Sans',
                    fontSize: '14px',
                  }}
                >
                  <p style={{ fontWeight: 600, marginTop: 0 }}>Country</p>
                  Choose a country from the drop-down list to apply the country
                  filter on the dashboard.
                </div>
              }
            >
              <div>
                <DropdownButton
                  data={country}
                  selectedVal={countryValue}
                  handleChange={(val) => onCountryChange(val)}
                  icon={locationIcon}
                  name="Search country"
                />
              </div>
            </Tippy>

            <CalenderButton icon={calenderIcon} />
          </div>

          <div className="apply-reset-btn">
            <button
              onClick={onApplyAllClick}
              style={{ fontFamily: 'Work-Sans' }}
              className="apply-btn"
            >
              Apply
            </button>
            <button
              onClick={onResetFiltersClick}
              style={{ fontFamily: 'Work-Sans' }}
              className="reset-btn"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardFilter;
