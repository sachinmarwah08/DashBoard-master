import baseApi from "../../apis";

export const getBarData = async (
  from_date,
  to_date,
  country,
  username,
  htag
) => {
  const response = await baseApi().get("/api/v1/country-bar-chart-data", {
    params: {
      from_date,
      to_date,
      country,
      username,
      htag,
    },
  });
  if (response) {
    const { data } = response;
    return data;
  }
};
