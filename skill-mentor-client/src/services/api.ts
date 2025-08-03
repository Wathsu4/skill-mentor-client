import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
// For API calls from React components
export const useApi = () => {
  const { getToken } = useAuth();

  const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:8080",
  });

  // Interceptor to add Clerk token for every request
  api.interceptors.request.use(async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return api;
};
