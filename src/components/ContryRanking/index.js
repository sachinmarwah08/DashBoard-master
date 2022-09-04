import "./index.scss";
import BarChart from "../Charts/BarChart/BarChart";
import MapChart from "../Charts/MapChart";

export function Contries() {
  return (
    <>
      <div className="whole-wrapper-container">
        <div className="main-wrapper">
          <BarChart />
          <MapChart />
        </div>
      </div>
    </>
  );
}

export default Contries;
