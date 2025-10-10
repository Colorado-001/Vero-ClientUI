import axios, { Axios } from "axios";
import { VITE_API_BASE_URL } from "../utils/constants";
import { useAuthStore } from "../store/auth/auth.store";

let cachedAxiosInstance: Axios | null = null;

function getAxiosInstance() {
  if (cachedAxiosInstance) {
    return cachedAxiosInstance;
  }

  const instance = axios.create({
    baseURL: VITE_API_BASE_URL,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  instance.interceptors.request.use(
    (config) => {
      const { token: accessToken } = useAuthStore.getState();

      if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  cachedAxiosInstance = instance;

  return cachedAxiosInstance;
}

export const axiosInstance = getAxiosInstance();
