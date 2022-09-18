import baseApi from "../../apis";

export const getCountryDropdownData = async (page, country) => {
  const response = await baseApi().get("/api/v1/get-list-of-country-v2", {
    params: {
      page,
      country,
    },
  });
  if (response) {
    const { data } = response;
    return data;
  }
};

export const getInfluencerDropdownData = async (page, username) => {
  const response = await baseApi().get("/api/v1/get-list-of-username-v2", {
    params: {
      page,
      username,
    },
  });
  if (response) {
    const { data } = response;
    return data;
  }
};

export const getHashtagDropdownData = async (page, htag) => {
  const response = await baseApi().get("/api/v1/get-list-of-hash-tag-v2", {
    params: {
      page,
      htag,
    },
  });
  if (response) {
    const { data } = response;
    return data;
  }
};
