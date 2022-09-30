import baseApi from '../../apis';

export const influencerCount = async (
  from_date,
  to_date,
  country,
  username,
  htag,
  c
) => {
  const response = await baseApi().get('/api/v1/get-influencers-count', {
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

export const getInfluencers = async (
  from_date,
  to_date,
  category,
  persantile,
  country,
  username,
  htag,
  page,
  c
) => {
  const response = await baseApi().get(
    '/api/v1/get-influencers-social-media-impact',
    {
      params: {
        from_date,
        to_date,
        category,
        persantile,
        country,
        username,
        htag,
        page,
        c,
      },
    }
  );
  if (response) {
    const { data } = response;
    return data;
  }
};
