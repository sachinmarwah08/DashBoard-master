import React, { useRef, useState } from "react";
import "./DashboardFilter.scss";
import Modal from "../Modal/Modal";
import filterBarLogo from "../../Images/filter.svg";

const DashboardFilter = () => {
  const [openModal, setOpenModal] = useState(false);

  const headerRef = useRef();
  if (typeof document !== `undefined`) {
    document.addEventListener("scroll", function () {
      if (headerRef.current) {
        const documentTop =
          document.body.scrollTop || document.documentElement.scrollTop;
        if (documentTop > 280)
          headerRef.current.classList.add("hide-filter-icon");
        else headerRef.current.classList.remove("hide-filter-icon");
      }
    });
  }
  return (
    <>
      {/* DATA ANALYTICS BUTTON */}

      <button
        onClick={() => setOpenModal(!openModal)}
        className="filters-option-icon"
      >
        <h1 className="heading">Data Analytics</h1>
      </button>

      {/* FLOAT ICON BUTTON */}

      <button
        ref={headerRef}
        onClick={() => setOpenModal(!openModal)}
        className="left-side-filter-option"
      >
        <img
          alt="share-icon"
          src={filterBarLogo}
          className="filter-logo-option"
        ></img>
      </button>

      {/* MODAL */}

      {openModal && (
        <Modal dashboardFilter={openModal} closeModal={setOpenModal} />
      )}
    </>
  );
};

export default DashboardFilter;
