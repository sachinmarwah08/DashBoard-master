import React, { useState } from "react";
import LineChart from "./Charts/LineChart";
import ContryRanking from "./ContryRanking";
import Footer from "./Layouts/Footer/Footer";
import GlobalWellbeing from "./GlobalWellbeing";
import Header from "./Layouts/Header/Header";
import NewsAndHashTags from "./NewsAndHashTags";
import TrendingHashtags from "./TrendingHashtags/TrendingHashtags";
import DashboardFilter from "./DashboardFilter/DashboardFilter";

const Main = () => {
  return (
    <>
      <Header />
      <GlobalWellbeing />
      <DashboardFilter />
      <ContryRanking />
      <NewsAndHashTags />
      <TrendingHashtags />
      <LineChart />
      <Footer />
    </>
  );
};

export default Main;
