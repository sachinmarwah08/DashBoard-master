import React from "react";

const Content = ({ filterData }) => {
  return (
    <div className="right-content-wrapper">
      {filterData.map((item) => (
        <div key={item.id} className="right-content">
          <div key={item.id} className="left-content">
            <p className="username">{item.hashtags}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Content;
