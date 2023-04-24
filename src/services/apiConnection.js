import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "https://618aac0d34b4f400177c480e.mockapi.io/api/v1";
const apiInstance = axios.create({ baseURL: BASE_URL });

export default apiInstance;

