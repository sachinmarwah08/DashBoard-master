import baseApi from "../../apis";

export const getMapData = async (from_date, to_date, country) => {
  const response = await baseApi().get("/api/v1/country-map-data", {
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
