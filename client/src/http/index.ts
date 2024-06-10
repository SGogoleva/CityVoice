import axios from "axios";
import { Pagination } from "../types/pagination";
import { Project, ProjectPreview } from "../types/project";
import {
  loggedUser,
  loginUser,
  registerUser,
  registeredUser,
} from "../types/userType";
const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

const axiosInstance = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const getProjectsPaginated = async ({
  page,
  limit,
}: Pagination): Promise<{ projects: ProjectPreview[]; totalPages: number }> => {
  const response = await axiosInstance.get(`main/?page=${page}&limit=${limit}`);
  return {
    projects: response.data.result,
    totalPages: response.data.totalPages,
  };
};

export const attemptLogin = async ({
  email,
  password,
}: loginUser): Promise<loggedUser> => {
  const response = await axiosInstance.post("/auth/login", { email, password });
  return response.data;
};

export const attemptRegister = async (
  userData: registerUser
): Promise<registerUser> => {
  const response = await axiosInstance.post("/auth/register", userData);
  return response.data;
};

export const getProjectData = async (projectId: string): Promise<Project> => {
  const response = await axiosInstance.get(`/main/single/${projectId}`);
  return response.data;
};

export const postVote = async ({
  projectId,
  questionText,
  optionText,
}: {
  projectId: string;
  questionText: string;
  optionText: string;
}) => {
  const response = await axiosInstance.post("main/project/vote", {
    projectId,
    questionText,
    optionText,
  });
  return response.data;
};
