import React, { useEffect, useState } from "react";
import "./Table.scss";
import { getMapData } from "../../../../actions/GoogleMapApis/index";

const Table = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const callApi = async () => {
      // let today = Date.now();
      // var check = moment(today);
      // var month = check.format("M");
      // var day = check.format("D");
      // var year = check.format("YYYY");
      // let fromDate = `${year}-${month}-01`;
      // let toDate = `${year}-${month}-${day}`;
      // console.log(month, day, year);

      let fromDate = "2022-07-01";
      let toDate = "2022-07-31";

      const response = await getMapData(fromDate, toDate);
      setData(response.data);
    };
    callApi();
  }, []);

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

  function twoDecimalPlacesIfCents(amount) {
    return amount % 1 !== 0 ? amount.toFixed(2) : amount;
  }

  function ParseFloat(str, val) {
    str = str.toString();
    str = str.slice(0, str.indexOf(".") + val + 1);
    return Number(str);
  }
  console.log(ParseFloat("NaN", 2), "Helloooooooooparsen");

  return (
    <div className="table-wrapper">
      <div className="table-border">
        <table class="fixed_header">
          <thead>
            <tr>
              <th style={{ textAlign: "left" }}>Country</th>
              <th>Rank</th>
              <th>Index</th>
              <th>Happy</th>
              <th>Sad</th>
            </tr>
          </thead>
          <tbody style={{ marginTop: "0.5rem", height: "24.5rem" }}>
            {data.map((item) => (
              <tr
                key={item.id}
                style={{
                  borderBottom: "1px solid #eeeeee",
                  paddingTop: "1rem",
                  paddingBottom: "1rem",
                }}
              >
                <td style={{ textAlign: "left" }}>{item._id}</td>
                <td>
                  {twoDecimalPlacesIfCents(item.rank)}{" "}
                  <span style={{ color: "#F05728" }}>
                    ({parseFloat(item.change_in_rank, 2)})
                  </span>
                </td>
                <td>
                  {nFormatter(item.count)}{" "}
                  <span style={{ color: "#F05728" }}>
                    ({ParseFloat(item.change_in_index_persentage, 2)})
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
