import axios from "axios";

const baseApi = () => {
  return axios.create({
    baseURL: "https://wbi-api-dev.roundglass.com",
  });
};

export default baseApi;
