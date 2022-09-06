import React, { useEffect, useRef, useState } from "react";
import "./DashboardFilter.scss";
import DropdownButton from "./Buttons/DropdownButton";
import userIcon from "../../Images/userIcon.svg";
import hashtagIcon from "../../Images/hashtagIcon.svg";
import locationIcon from "../../Images/locationIcon.svg";
import calenderIcon from "../../Images/calenderIcon.svg";
import CalenderButton from "./Buttons/CalenderButton";
import { getCountryDropdownData } from "../../actions/DropDownApis";

const DashboardFilter = () => {
  const [influencer, setIinfluencer] = useState("");
  const [hashtag, sethashtag] = useState("");
  const [country, setCountry] = useState([]);

  useEffect(() => {
    const callApi = async () => {
      const CountryDataResponse = await getCountryDropdownData();
      setCountry(CountryDataResponse);
    };
    callApi();
  }, []);

  // const data = [
  //   "hello",
  //   "sachin",
  //   // "hello",
  //   // "hello",
  //   // "hello",
  //   // "hello",
  //   // "hello",
  //   // "hello",
  //   // "hello",
  //   // "hello",
  //   // "hello",
  //   // "hello",
  //   // "hello",
  //   // "hello",
  //   // "hello",
  //   // "hello",
  //   // "hello",
  //   // "hello",
  //   // "hello",
  //   // "hello",
  //   // "hello",
  //   // "hello",
  //   // "hello",
  //   // "hello",
  // ];

  const headerRef = useRef();
  if (typeof document !== `undefined`) {
    document.addEventListener("scroll", function () {
      if (headerRef.current) {
        const documentTop =
          document.body.scrollTop || document.documentElement.scrollTop;
        if (documentTop > 280)
          headerRef.current.classList.add("hide-filter-icon");
        else headerRef.current.classList.remove("hide-filter-icon");
      }
    });
  }
  return (
    <>
      <div className="filter-wrapper">
        <div className="buttons-wrapper">
          <div className="dropdown-btn-wrapper">
            <DropdownButton
              // data={data}
              selectedVal={influencer}
              handleChange={(val) => setIinfluencer(val)}
              icon={userIcon}
              name="Search influencer"
            />
            <DropdownButton
              // data={data}
              selectedVal={hashtag}
              handleChange={(val) => sethashtag(val)}
              icon={hashtagIcon}
              name="Search hashtag"
            />
            <DropdownButton
              data={country}
              selectedVal={country}
              handleChange={(val) => setCountry(val)}
              icon={locationIcon}
              name="Search country"
            />
            <CalenderButton icon={calenderIcon} name="Select dates" />
          </div>

          <div className="apply-reset-btn">
            <button className="apply-btn">Apply</button>
            <button className="reset-btn">Reset</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardFilter;
