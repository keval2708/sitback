import axios from "axios";
import CryptoJS from 'crypto-js';
import { getCookie, removeCookie } from "./cookie";

const axiosApiCall = axios.create({
  baseURL: process.env.API_URL || '',
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'any',
    'Accept': 'application/json',
  },
})

// Add a request interceptor
axiosApiCall.interceptors.request.use(
  async function (config) {
    // config.baseURL = process.env.API_URL;
    // Do something before request is sent
    const token = await getCookie("token") || "";
    config.headers.Authorization = token !== "" ? `Bearer ${token}` : token;

    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

  export const decryptData = (encryptedData) => {
  const key = CryptoJS.enc.Utf8.parse("9876543210202424");
  const iv = CryptoJS.enc.Utf8.parse("9876543210202424");
  const decrypted = CryptoJS.AES.decrypt(encryptedData?.data, key, { iv: iv });
  const decryptedString = decrypted.toString(CryptoJS.enc.Utf8);
  try {
    const jsonObject = JSON.parse(decryptedString);
    return jsonObject;
  } catch (error) {
    // console.error("Error parsing decrypted string to JSON:", error);
    return null;
  }
};
// Add response interceptor
axiosApiCall.interceptors.response.use(
  (response) => {
    if(response?.data != null) {
      response.data = decryptData(response)
    }
    return response;
  },
  async (error) => {
    const { response } = error
    const responseBody = response?.data

    if (response && response?.status === 401) {
      removeCookie('token');
      localStorage.clear();
      // window.location.reload();
    }else if (response.status === 503) {
        // Redirect to the "Under Maintenance" page
        removeCookie('token');
        localStorage.clear();
        window.location.href = '/under-maintenance';
      }

    return responseBody;
    // return Promise.reject(error)
  },
)

export default axiosApiCall
