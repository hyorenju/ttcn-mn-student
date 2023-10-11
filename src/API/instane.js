import axios from "axios";
import Cookies from "js-cookie";

const instane = axios.create({
  baseURL: "https://student-manager-a9966b285f24.herokuapp.com",
  headers: {
    "ngrok-skip-browser-warning": "1",
  },
});
instane.interceptors.request.use(
  (req) => {
    const token = Cookies.get("access_token");
    if (token) {
      req.headers["Authorization"] = `Bearer ${token}`;
    }
    return req;
  },
  (err) => {
    return Promise.reject(err);
  }
);

instane.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default instane;
