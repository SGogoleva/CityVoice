import axios from "axios";
import { loginUser } from "../types/userType";
import { projectPreview } from "../types/project";
const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

const axiosInstance = axios.create({
  baseURL: BASE_API_URL,
  withCredentials: true,
});

export const getProjectsPaginated = async (
  page: number,
  limit: number
): Promise<projectPreview> => {
  const response = await axiosInstance.get(`/main/`, {
    params: { page, limit },
  });
  return response.data.result;
};

export const attemptLogin = async (
  email: string,
  password: string
): Promise<loginUser> => {
  const response = await axiosInstance.post<loginUser>("/auth/login", {
    email,
    password,
  });
  return response.data;
};

export default axiosInstance;
