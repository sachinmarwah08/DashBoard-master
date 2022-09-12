import baseApi from "../../apis";

export const getBarData = async (
  from_date,
  to_date,
  country,
  username,
  htag,
  order
) => {
  const response = await baseApi().get("/api/v1/country-bar-chart-data", {
    params: {
      from_date,
      to_date,
      country,
      username,
      htag,
      order,
    },
  });
  if (response) {
    const { data } = response;
    return data;
  }
};
