import baseApi from "../../apis";

export const getSocialMediaFlashes = async (from_date, to_date, sentiment) => {
  const response = await baseApi().get("/api/v1/get-social-media-flashes-v2", {
    params: {
      from_date,
      to_date,
      sentiment,
    },
  });
  if (response) {
    const { data } = response;
    return data;
  }
};

export const newsFlashes = async (from_date, to_date, sentiment) => {
  const response = await baseApi().get("/api/v1/get-news-flashes-v2", {
    params: {
      from_date,
      to_date,
      sentiment,
    },
  });
  if (response) {
    const { data } = response;
    return data;
  }
};
