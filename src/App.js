import React from "react";
import LineChartData from "./components/Charts/LineChart/LineChart";
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
