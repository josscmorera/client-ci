import axios from "axios";

export const Axios = axios.create({
  baseURL: import.meta.env.VITE_URL_API + "/api",
});

export default Axios;
