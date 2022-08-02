import React from "react";
import GlobalWellbeing from "./components/GlobalWellbeing/GlobalWellbeing";
import Header from "./components/Header/Header";
import Contries from "./components/Contries/Contries";
import NewsAndHashTags from "./components/NewsAndHashTags/NewsAndHashTags";
import LineChartData from "./components/Charts/LineChart/LineChart";
import Footer from "./components/Footer/Footer";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Main from "./components/Main";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/LineChart" element={<LineChartData />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
