const axios = require("axios");

export const getUsers = async (page) => {
  try {
    const users = await axios.get(
      `http://43.204.168.67:8888/api/v1/get-list-of-country-v2?page=${page}`
    );
    return users.data;
  } catch (error) {
    console.error(error);
  }
};
