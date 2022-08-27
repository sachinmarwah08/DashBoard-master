import React from "react";
import "./Modal.scss";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // theme css file
import DashboardFilterModal from "../DashboardFilter/Modal/DashboardFilterModal";
import LineChartModal from "../Charts/LineChart/Modal/LineChartModal";

const Modal = ({ closeModal, dashboardFilter, linechartModal }) => {
  return (
    <div className="modal-background">
      <div className="modal-container">
        <div
          className={`${dashboardFilter && "filterModa-body"} ${
            linechartModal && "modal-body"
          } `}
        >
          <button className="modal-cloe-btn" onClick={() => closeModal(false)}>
            <FontAwesomeIcon className="x-mark" icon={faXmark} />
          </button>

          {dashboardFilter && <DashboardFilterModal />}
          {linechartModal && <LineChartModal />}
        </div>
      </div>
    </div>
  );
};

export default Modal;
