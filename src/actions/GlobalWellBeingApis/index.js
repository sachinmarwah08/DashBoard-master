import baseApi from "../../apis";

export const getTweetsCount = async (
  from_date,
  to_date,
  country,
  username,
  htag,
  c
) => {
  const response = await baseApi().get("/api/v1/get-tweet-count-diff", {
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

export const getTweetsDiff = async (
  from_date,
  to_date,
  country,
  username,
  htag,
  c
) => {
  const response = await baseApi().get(
    "/api/v1/get-absolute-tweet-count-diff",
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
