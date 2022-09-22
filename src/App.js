import React, { useContext } from "react";
import LineChart from "./components/Charts/LineChart";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Main from "./components/Main";
import FilterProvider, { FilterContext } from "./context/FilterContext";
import ScaleLoader from "react-spinners/ScaleLoader";

function App() {
  return (
    <>
      {/* <FilterProvider> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/LineChart" element={<LineChart />} />
        </Routes>
      </BrowserRouter>
      {/* </FilterProvider> */}
    </>
  );
}
export default App;
