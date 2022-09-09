import React from 'react';
import LineChart from './components/Charts/LineChart';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Main from './components/Main';
import FilterProvider from './context/FilterContext';

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
