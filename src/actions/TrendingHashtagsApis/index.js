import baseApi from "../../apis";

export const getTrendingHashtagData = async (
  from_date,
  to_date,
  country,
  username,
  htag,
  c
) => {
  const response = await baseApi().get(
    "/api/v1/get-hashtag-social-media-impact-v2",
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
