import baseApi from "../../apis";

export const getBarData = async (from_date, to_date) => {
  const response = await baseApi().get("/api/v1/country-bar-chart-data", {
    params: {
      from_date,
      to_date,
    },
  });
  if (response) {
    const { data } = response;
    return data;
  }
};
