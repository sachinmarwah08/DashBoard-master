import baseApi from "../../apis";

export const getBarData = async (
  from_date,
  to_date,
  country,
  username,
  htag,
  order,
  c
) => {
  const response = await baseApi().get("/api/v1/country-bar-chart-data", {
    params: {
      from_date,
      to_date,
      country,
      username,
      htag,
      order,
      c,
    },
  });
  if (response) {
    const { data } = response;
    return data;
  }
};
