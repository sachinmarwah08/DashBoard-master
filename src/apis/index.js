import axios from "axios";

const baseApi = () => {
  return axios.create({
    baseURL: "http://43.204.168.67:8888",
  });
};

export default baseApi;
