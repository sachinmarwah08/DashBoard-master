import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import "./DashboardFilter.scss";
import DropdownButton from "./Buttons/DropdownButton";
import userIcon from "../../Images/userIcon.svg";
import hashtagIcon from "../../Images/hashtagIcon.svg";
import locationIcon from "../../Images/locationIcon.svg";
import calenderIcon from "../../Images/calenderIcon.svg";
import CalenderButton from "./Buttons/CalenderButton";
import {
  getCountryDropdownData,
  getHashtagDropdownData,
  getInfluencerDropdownData,
} from "../../actions/DropDownApis";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import "tippy.js/dist/svg-arrow.css";
import { FilterContext } from "../../context/FilterContext";
import {
  RESET_FILTERS,
  SET_FILTERS,
  UPDATE_ALL_LOADERS_TRUE,
  TOGGLE_CALENDER,
  CLOSE_CALENDER,
  // SET_DROP_DATA,
} from "../../actions/types";
// import NewDropdownButton from "./Buttons/NewDropdownButton";

const DashboardFilter = () => {
  const { state, dispatch } = useContext(FilterContext);
  const { influencerValue, hashtagValue, countryValue } = state.filters;
  const [influencer, setInfluencer] = useState([]);
  const [hashtag, sethashtag] = useState([]);
  const [country, setCountry] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  // console.log(state);
  // const { countryDropData, hashtagDropData, influencerDropData } = state.data;
  // const [openModal, setOpenModal] = useState(false);
  // const [countryPage, setCountryPage] = useState(1);
  // const [hasgtagPage, setHashtagPage] = useState(1);
  // const [influencerPage, setInfluencerPage] = useState(1);
  // const [test, setTest] = useState(1);

  // useEffect(() => {
  //   const callApi = async () => {
  //     //////////////////////////////////////////////////////////////
  //     const countryDataResponse = await getCountryDropdownData(countryPage);
  //     dispatch({
  //       type: SET_DROP_DATA,
  //       payload: { field: "countryDropData", value: countryDataResponse },
  //     });
  //     setCountry(countryDataResponse);

  //     //////////////////////////////////////////////////////////

  //     const hashtagDataResponse = await getHashtagDropdownData(hasgtagPage);
  //     dispatch({
  //       type: SET_DROP_DATA,
  //       payload: { field: "hashtagDropData", value: hashtagDataResponse },
  //     });
  //     sethashtag(hashtagDataResponse);

  //     //////////////////////////////////////////////////////////

  //     const influencerDataResponse = await getInfluencerDropdownData(
  //       influencerPage
  //     );
  //     dispatch({
  //       type: SET_DROP_DATA,
  //       payload: { field: "influencerDropData", value: influencerDataResponse },
  //     });
  //     setIinfluencer(influencerDataResponse);
  //   };
  //   callApi();
  // }, []);

  // const onLoadMoreCountry = async () => {
  //   const countryDataResponse = await getCountryDropdownData(countryPage + 1);
  //   dispatch({
  //     type: SET_DROP_DATA,
  //     payload: {
  //       field: "countryDropData",
  //       value: [...countryDropData, ...countryDataResponse],
  //     },
  //   });
  //   setCountry([...country, ...countryDataResponse]);
  //   setCountryPage(countryPage + 1);
  // };

  // const onLoadMoreHashtag = async () => {
  //   const hashtagDataResponse = await getHashtagDropdownData(hasgtagPage + 1);
  //   dispatch({
  //     type: SET_DROP_DATA,
  //     payload: {
  //       field: "hashtagDropData",
  //       value: [...hashtagDropData, ...hashtagDataResponse],
  //     },
  //   });
  //   sethashtag([...hashtag, ...hashtagDataResponse]);
  //   setHashtagPage(hasgtagPage + 1);
  // };

  // const onLoadMoreInfluncer = async () => {
  //   const influencerDataResponse = await getInfluencerDropdownData(
  //     influencerPage + 1
  //   );
  //   dispatch({
  //     type: SET_DROP_DATA,
  //     payload: {
  //       field: "influencerDropData",
  //       value: [...influencerDropData, ...influencerDataResponse],
  //     },
  //   });
  //   setIinfluencer([...influencer, ...influencerDataResponse]);
  //   setInfluencerPage(influencerPage + 1);
  // };

  const headerRef = useRef();
  if (typeof document !== `undefined`) {
    document.addEventListener("scroll", function () {
      if (headerRef.current) {
        const documentTop =
          document.body.scrollTop || document.documentElement.scrollTop;
        if (documentTop > 280)
          headerRef.current.classList.add("global-filter-btn");
        else headerRef.current.classList.remove("hide-filter-icon");
      }
    });
  }

  const onInfluencerChange = (val) => {
    dispatch({
      type: SET_FILTERS,
      payload: { field: "influencerValue", value: val },
    });
  };
  const onHashTagChange = (val) => {
    dispatch({
      type: SET_FILTERS,
      payload: { field: "hashtagValue", value: val },
    });
  };
  const onCountryChange = (val) => {
    dispatch({
      type: SET_FILTERS,
      payload: { field: "countryValue", value: val },
    });
  };

  const onApplyAllClick = () => {
    dispatch({ type: UPDATE_ALL_LOADERS_TRUE });
    dispatch({ type: TOGGLE_CALENDER });
    dispatch({ type: CLOSE_CALENDER });
  };

  const onResetFiltersClick = () => {
    dispatch({ type: RESET_FILTERS });
  };

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      const countryData = await getCountryDropdownData(page);
      setCountry((prev) => [...prev, ...countryData]);

      const HashtagData = await getHashtagDropdownData(page);
      sethashtag((prev) => [...prev, ...HashtagData]);

      const influencerData = await getInfluencerDropdownData(page);
      setInfluencer((prev) => [...prev, ...influencerData]);
      setLoading(false);
    };
    loadUsers();
  }, [page]);

  const observer = useRef();
  const lastUserRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((page) => page + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading]
  );

  return (
    <>
      <div className="filter-wrapper">
        <div className="buttons-wrapper">
          <div className="dropdown-btn-wrapper">
            <Tippy
              theme={"light"}
              interactive={true}
              content={
                <div
                  style={{
                    padding: "0.5rem",
                    fontWeight: 400,
                    fontFamily: "Work-Sans",
                    fontSize: "14px",
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
                  lastUserRef={lastUserRef}
                  data={influencer}
                  selectedVal={influencerValue}
                  handleChange={(val) => onInfluencerChange(val)}
                  icon={userIcon}
                  name="Search influencer"
                  loading={loading}
                />
                {/* <NewDropdownButton
                  data={influencerDropData}
                  selectedVal={influencerValue}
                  handleChange={(val) => onInfluencerChange(val)}
                  icon={userIcon}
                  name="Search influencer"
                  onLoadMoreCountry={onLoadMoreInfluncer}
                  backupData={influencer}
                  filedToUpdate="influencerDropData"
                /> */}
              </div>
            </Tippy>

            <Tippy
              theme={"light"}
              interactive={true}
              content={
                <div
                  style={{
                    padding: "0.5rem",
                    fontWeight: 400,
                    fontFamily: "Work-Sans",
                    fontSize: "14px",
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
                  lastUserRef={lastUserRef}
                  data={hashtag}
                  selectedVal={hashtagValue}
                  handleChange={(val) => onHashTagChange(val)}
                  icon={hashtagIcon}
                  name="Search hashtag"
                  loading={loading}
                />
                {/* <NewDropdownButton
                  data={hashtagDropData}
                  selectedVal={hashtagValue}
                  handleChange={(val) => onHashTagChange(val)}
                  icon={hashtagIcon}
                  name="Search hashtag"
                  onLoadMoreCountry={onLoadMoreHashtag}
                  backupData={hashtag}
                  filedToUpdate="hashtagDropData"
                /> */}
              </div>
            </Tippy>

            <Tippy
              theme={"light"}
              interactive={true}
              content={
                <div
                  style={{
                    padding: "0.5rem",
                    fontWeight: 400,
                    fontFamily: "Work-Sans",
                    fontSize: "14px",
                  }}
                >
                  <p style={{ fontWeight: 600, marginTop: 0 }}>Country</p>
                  Choose a country from the drop-down list to apply the country
                  filter on the dashboard.
                </div>
              }
            >
              <div>
                {/* <NewDropdownButton
                  data={countryDropData}
                  selectedVal={countryValue}
                  handleChange={(val) => onCountryChange(val)}
                  icon={locationIcon}
                  name="Search country"
                  onLoadMoreCountry={onLoadMoreCountry}
                  backupData={country}
                  filedToUpdate="countryDropData"
                /> */}
                <DropdownButton
                  lastUserRef={lastUserRef}
                  data={country}
                  selectedVal={countryValue}
                  handleChange={(val) => onCountryChange(val)}
                  icon={locationIcon}
                  name="Search Country"
                  loading={loading}
                />
              </div>
            </Tippy>

            <CalenderButton icon={calenderIcon} />
          </div>

          <div className="apply-reset-btn">
            <button
              onClick={onApplyAllClick}
              style={{ fontFamily: "Work-Sans" }}
              className="apply-btn"
            >
              Apply
            </button>
            <button
              onClick={onResetFiltersClick}
              style={{ fontFamily: "Work-Sans" }}
              className="reset-btn"
            >
              Reset
            </button>
          </div>
        </div>
        {/* <div
          ref={headerRef}
          onClick={() => setOpenModal(!openModal)}
          className="global-filter-btn"
        >
          <img src={filter}></img>
        </div> */}
      </div>

      {/* {openModal && <Modal globalFilter={openModal} />} */}
    </>
  );
};

export default DashboardFilter;
