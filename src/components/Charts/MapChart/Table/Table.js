import React from "react";
import "./Table.scss";

const Table = ({ tableData }) => {
  return (
    <div className="table-wrapper">
      <div className="table-border">
        <table class="fixed_header">
          <thead>
            <tr>
              <th style={{ textAlign: "left" }}>Country</th>
              <th>Rank</th>
              <th>Interest</th>
              <th>Influencers</th>
            </tr>
          </thead>
          <tbody style={{ marginTop: "0.5rem", height: "24.5rem" }}>
            {tableData.map((item) => (
              <tr
                key={item.id}
                style={{
                  borderBottom: "1px solid #eeeeee",
                  paddingTop: "1rem",
                  paddingBottom: "1rem",
                }}
              >
                <td style={{ textAlign: "left" }}>{item.country}</td>
                <td>
                  {item.rank}{" "}
                  <span style={{ color: "#0033CC" }}>{item.rankColored}</span>
                </td>
                <td>
                  {item.Interest}{" "}
                  <span style={{ color: "#CC0000" }}>
                    {item.InterestColred}
                  </span>
                </td>
                <td>{item.Influencers}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
