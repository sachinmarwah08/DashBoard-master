import "./Contries.scss";
import BarChartComponent from "../Charts/BarChart/BarChart";
import MapChartComponent from "../Charts/MapChart/MapChart";

export function Contries() {
  return (
    <>
      <div className="whole-wrapper-container">
        <div className="main-wrapper">
          <BarChartComponent />
          <MapChartComponent />
        </div>
      </div>
    </>
  );
}

export default Contries;
