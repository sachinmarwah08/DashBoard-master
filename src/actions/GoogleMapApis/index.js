import baseApi from "../../apis";

export const getMapData = async (
  from_date,
  to_date,
  country,
  username,
  htag,
  c
) => {
  const response = await baseApi().get("/api/v1/country-map-data", {
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

export const getTableData = async (
  from_date,
  to_date,
  country,
  username,
  htag,
  c
) => {
  const response = await baseApi().get("/api/v1/country-map-data", {
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
