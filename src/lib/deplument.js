import axios from "axios";

const isDev = true;

export const client_url = "http://localhost:3000";
export const server_url = "http://localhost:5000";
export const server_url2 = "https://aipic.onrender.com/";

export const axiosInstance = axios.create({
  baseURL: isDev ? server_url : server_url2,
});
