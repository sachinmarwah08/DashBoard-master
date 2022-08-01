import React from "react";
import GlobalWellbeing from "./components/GlobalWellbeing/GlobalWellbeing";
import Header from "./components/Header/Header";
import Contries from "./components/Contries/Contries";
import NewsAndHashTags from "./components/NewsAndHashTags/NewsAndHashTags";
import LineChartData from "./components/Charts/LineChart/LineChart";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <>
      <Header />
      <GlobalWellbeing />
      <Contries />
      <NewsAndHashTags />
      <LineChartData />
      <Footer />
    </>
  );
}
export default App;
