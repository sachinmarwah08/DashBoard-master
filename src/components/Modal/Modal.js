import React from "react";
import "./Modal.scss";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Modal = ({ closeModal }) => {
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
    <div className="modal-background">
      <div className="modal-container">
        <div className="modal-body">
          <button className="modal-cloe-btn" onClick={() => closeModal(false)}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
          <div className="modal-content">
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
        </div>
      </div>
    </div>
  );
};

export default Modal;
