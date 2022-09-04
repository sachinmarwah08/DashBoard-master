import baseApi from "../../apis";

export const influencerCount = async (from_date, to_date) => {
  const response = await baseApi().get("/api/v1/get-influencers-count", {
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

export const getInfluencers = async (
  from_date,
  to_date,
  category,
  persentile
) => {
  const response = await baseApi().get(
    "/api/v1/get-influencers-social-media-impact",
    {
      params: {
        from_date,
        to_date,
        category,
        persentile,
      },
    }
  );
  if (response) {
    const { data } = response;
    return data;
  }
};
