import baseApi from "../../apis";

export const compareCountry = async (from_date, to_date, country) => {
  const response = await baseApi().get("/api/v1/get-country-line-chart-data", {
    params: {
      from_date,
      to_date,
      country,
    },
  });
  if (response) {
    const { data } = response;
    return data;
  }
};
export const compareTime = async (from_date, to_date, country) => {
  const response = await baseApi().get(
    "/api/v1/get-country-time-line-chart-data",
    {
      params: {
        from_date,
        to_date,
        country,
      },
    }
  );
  if (response) {
    const { data } = response;
    return data;
  }
};
