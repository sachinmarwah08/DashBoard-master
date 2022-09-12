import React, { useContext, useState } from "react";
import LineChart from "./Charts/LineChart";
import ContryRanking from "./ContryRanking";
import Footer from "./Layouts/Footer/Footer";
import GlobalWellbeing from "./GlobalWellbeing";
import Header from "./Layouts/Header/Header";
import NewsAndHashTags from "./NewsAndHashTags";
import TrendingHashtags from "./TrendingHashtags/TrendingHashtags";
import DashboardFilter from "./DashboardFilter/DashboardFilter";
import FilterProvider from "../context/FilterContext";

const Main = () => {
  // const [filterData, setFilterData] = useState([]);
  // const [wordEntered, setWordEntered] = useState("");
  // const [close, setClose] = useState(false);

  // const handleFilter = (event) => {
  //   const searchWord = event.target.value;
  //   setWordEntered(searchWord);
  //   const newFilter = data.filter((value) => {
  //     return value.toLowerCase().includes(searchWord.toLowerCase());
  //   });

  //   setFilterData(newFilter);
  // };

  // const click = (value) => {
  //   setWordEntered(value);
  //   setClose(false);
  // };

  return (
    <>
      {/* <div>
        <input type="text" value={wordEntered} onChange={handleFilter} />

        <div>
          {filterData.map((item) => (
            <div onClick={() => click(item)}>{item}</div>
          ))}
        </div>
      </div> */}
      <FilterProvider>
        <Header />
        <GlobalWellbeing />
        <DashboardFilter />
        <ContryRanking />
        <NewsAndHashTags />
        <TrendingHashtags />
        <LineChart />
        <Footer />
      </FilterProvider>
    </>
  );
};

export default Main;
