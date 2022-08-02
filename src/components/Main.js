import React from "react";
import LineChartData from "./Charts/LineChart/LineChart";
import Contries from "./Contries/Contries";
import Footer from "./Footer/Footer";
import GlobalWellbeing from "./GlobalWellbeing/GlobalWellbeing";
import Header from "./Header/Header";
import NewsAndHashTags from "./NewsAndHashTags/NewsAndHashTags";

const Main = () => {
  return (
    <div>
      <Header />
      <GlobalWellbeing />
      <Contries />
      <NewsAndHashTags />
      <LineChartData />
      <Footer />
    </div>
  );
};

export default Main;
