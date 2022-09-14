import baseApi from '../../apis';

export const getCountryDropdownData = async (page) => {
  const response = await baseApi().get('/api/v1/get-list-of-country-v2', {
    params: {
      page: page,
    },
  });
  if (response) {
    const { data } = response;
    return data;
  }
};

export const getInfluencerDropdownData = async () => {
  const response = await baseApi().get('/api/v1/get-list-of-username-v2');
  if (response) {
    const { data } = response;
    return data;
  }
};

export const getHashtagDropdownData = async () => {
  const response = await baseApi().get('/api/v1/get-list-of-hash-tag-v2');
  if (response) {
    const { data } = response;
    return data;
  }
};
