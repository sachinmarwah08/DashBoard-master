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
  const [loader, serLoader] = useState(false);
  return (
    <>
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
