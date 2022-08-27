import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LineChartModal = () => {
  const notify = () => {
    navigator.clipboard.writeText("http://localhost:3000/LineChart");
    toast.success("Link Coppied...", {
      position: "top-right",
      autoClose: 500,
      hideProgressBa: true,
      newestOnTop: false,
      rtl: false,
      toastClassName: "dark-toast",
    });
  };
  return (
    <div className="LineChartmodal-content">
      <input
        readOnly
        value="http://localhost:3000/LineChart"
        type="text"
        className="component-link"
      />
      <button className="copy-btn" onClick={notify}>
        Copy Link
      </button>
      <ToastContainer
        position="top-right"
        autoClose={500}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        toastClassName="dark-toast"
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default LineChartModal;
