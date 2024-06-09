import axios from "axios";
import { Pagination } from "../types/pagination";
import { ProjectPreview } from "../types/project";
const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

const axiosInstance = axios.create({
  baseURL: BASE_API_URL,
  withCredentials: true,
});

export const getProjectsPaginated = async ({
  page,
  limit,
}: Pagination): Promise<{ projects: ProjectPreview[], totalPages: number }> => {
  const response = await axiosInstance.get(`main/?page=${page}&limit=${limit}`);
  return {
    projects: response.data.result,
    totalPages: response.data.totalPages
  }
};
