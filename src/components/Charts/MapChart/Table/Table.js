import React, { useContext } from "react";
import "./Table.scss";
import { FilterContext } from "../../../../context/FilterContext";

const Table = ({ tableData, hideRank }) => {
  const { state } = useContext(FilterContext);
  const { influencerValue, hashtagValue, countryValue } = state.filters;

  function nFormatter(num) {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "G";
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, "") + "k";
    }
    return num;
  }

  function ParseFloat(str, val) {
    str = str.toString();
    str = str.slice(0, str.indexOf(".") + val + 1);
    return Number(str);
  }

  return (
    <div className="table-wrapper">
      <div className="table-border">
        <table class="fixed_header">
          <thead>
            <tr>
              <th style={{ textAlign: "left" }}>Country</th>
              {!influencerValue &&
                !hashtagValue &&
                !countryValue &&
                !hideRank && <th>Rank</th>}
              <th>Interest</th>
              <th>Positive</th>
              <th>Negative</th>
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
                <td style={{ textAlign: "left" }}>{item._id}</td>
                {!influencerValue &&
                  !hashtagValue &&
                  !countryValue &&
                  !hideRank && (
                    <td>
                      {parseFloat(item.rank, 2)}{" "}
                      <span style={{ color: "#F05728" }}>
                        ({parseFloat(item.change_in_rank, 2)})
                      </span>
                    </td>
                  )}
                <td>
                  {nFormatter(item.count)}{" "}
                  <span style={{ color: "#F05728" }}>
                    ({ParseFloat(item.change_in_index_persentage, 2)}%)
                  </span>
                </td>
                <td>
                  {parseFloat(
                    item.happy % 1 !== 0 ? item.happy.toFixed(2) : item.happy
                  )}
                  %
                </td>
                <td>
                  {parseFloat(
                    item.sad_per % 1 !== 0
                      ? item.sad_per.toFixed(2)
                      : item.sad_per
                  )}
                  %
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
