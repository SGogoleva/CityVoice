import axios from "axios";
import { projectPreview } from "../types/project";
const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

const axiosInstance = axios.create({
  baseURL: BASE_API_URL,
  withCredentials: true,
});

export const getProjectsPaginated = async (
  page: number,
  limit: number
): Promise<any> => {
  return axios.get(`http://localhost:8080/api/v1/main/?page=${page}&limit=${limit}`)
    .then(res => res.data.result); 
  };
