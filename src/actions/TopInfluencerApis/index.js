import baseApi from "../../apis";

export const influencerCount = async (
  from_date,
  to_date,
  country,
  username,
  htag
) => {
  const response = await baseApi().get("/api/v1/get-influencers-count", {
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

export const getInfluencers = async (
  from_date,
  to_date,
  category,
  persentile,
  country,
  username,
  htag,
  page
) => {
  const response = await baseApi().get(
    "/api/v1/get-influencers-social-media-impact",
    {
      params: {
        from_date,
        to_date,
        category,
        persentile,
        country,
        username,
        htag,
        page: page,
      },
    }
  );
  if (response) {
    const { data } = response;
    return data;
  }
};
