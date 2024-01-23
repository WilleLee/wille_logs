import axios from "axios";

const fetcher = axios.create({
  headers: {
    "Content-type": "application/json",
  },
  timeout: 10000,
});

fetcher.interceptors.request.use(
  (config) => {
    console.log("=== Request starts ===");
    console.log("config", config);
    console.log("=== Request ends ===");
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

fetcher.interceptors.response.use(
  (response) => {
    console.log("=== Response starts ===");
    console.log("response", response);
    console.log("=== Response ends ===");
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default fetcher;
