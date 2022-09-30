import baseApi from "../../apis";

export const compareCountry = async (
  from_date,
  to_date,
  country,
  username,
  htag,
  c
) => {
  const response = await baseApi().get("/api/v1/get-country-line-chart-data", {
    params: {
      from_date,
      to_date,
      country,
      username,
      htag,
      c,
    },
  });
  if (response) {
    const { data } = response;
    return data;
  }
};
export const compareTime = async (
  from_date,
  to_date,
  country,
  username,
  htag,
  c
) => {
  const response = await baseApi().get(
    "/api/v1/get-country-time-line-chart-data",
    {
      params: {
        from_date,
        to_date,
        country,
        username,
        htag,
        c,
      },
    }
  );
  if (response) {
    const { data } = response;
    return data;
  }
};
