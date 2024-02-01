import axios, { AxiosResponse } from "axios";

const axiosInstance = axios.create({
  headers: {
    "Content-type": "application/json",
  },
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    console.log("=== Request starts ===");
    console.log("config", config);
    console.log("=== Request ends ===");
    return config;
  },
  (error) => {
    // return Promise.reject(error);
    return {
      data: {
        data: null,
        message: "Something went wrong",
        status: 500,
      },
    };
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    console.log("=== Response starts ===");
    console.log("response", response);
    console.log("=== Response ends ===");
    return response;
  },
  (error) => {
    // return Promise.reject(error);
    return {
      data: {
        data: null,
        message: "Something went wrong",
        status: 500,
      },
    };
  },
);

const fetcher = {
  get: async (url: string) => {
    try {
      const res = await axiosInstance.get(url);
      return fetcher.handleResponse(res);
    } catch (err) {
      console.log(err);
      return {
        data: null,
        message: "Something went wrong",
        status: 500,
      };
    }
  },
  post: async (url: string, obj?: any) => {
    try {
      const res = await axiosInstance.post(url, obj);
      return fetcher.handleResponse(res);
    } catch (err) {
      console.log(err);
      return {
        data: null,
        message: "Something went wrong",
        status: 500,
      };
    }
  },
  handleResponse: (res: AxiosResponse<any, any>) => {
    if (!res.data || !res.data.status || res.data.status !== 200) {
      return {
        data: null,
        message: res.data.message || "Something went wrong",
        status: 500,
      };
    } else {
      return res.data;
    }
  },
};

export default fetcher;
