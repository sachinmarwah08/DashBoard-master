import React from "react";
import LineChartData from "./Charts/LineChart/LineChart";
import Contries from "./Contries/Contries";
import Footer from "./Layouts/Footer/Footer";
import GlobalWellbeing from "./GlobalWellbeing/GlobalWellbeing";
import Header from "./Layouts/Header/Header";
import NewsAndHashTags from "./NewsAndHashTags/NewsAndHashTags";
import TrendingHashtags from "./TrendingHashtags/TrendingHashtags";

const Main = () => {
  return (
    <div>
      <Header />
      <GlobalWellbeing />
      <Contries />
      <NewsAndHashTags />
      <TrendingHashtags />
      <LineChartData />
      <Footer />
    </div>
  );
};

export default Main;
