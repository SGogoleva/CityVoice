import axios from "axios";
import { Pagination } from "../types/pagination";
import { Project, ProjectPreview, ProjectVotes } from "../types/project";
import { loggedUser, loginUser, registerUser } from "../types/userType";
import { message } from "../types/messages";
import { City } from "../types/cities";
import { Authority } from "../types/authorities";
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
  sortBy,
  sortOrder,
  cityId,
}: Pagination): Promise<{
  projects: ProjectPreview[];
  totalPages: number;
  cities: City[];
}> => {
  const response = await axiosInstance.get(
    `main/?page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}&cityId=${cityId}`
  );
  return {
    projects: response.data.result,
    cities: response.data.city,
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

export const postVote = async ({ projectId, votes, userId }: ProjectVotes) => {
  const response = await axiosInstance.post("main/project/vote", {
    projectId,
    votes,
    userId,
  });
  return response.data;
};

export const sendMessage = async ({
  // messageTitle,
  messageBody,
  messageTheme,
  authority,
  images,
}: message) => {
  const response = await axiosInstance.post("messages/sent", {
    // messageTitle,
    messageBody,
    messageTheme,
    authority,
    images,
  });
  return response.data;
};

export const getCities = async (): Promise<City[]> => {
  const cities = await axiosInstance.get("/cities");
  return cities.data;
};

export const getAuthorities = async (): Promise<Authority[]> => {
  const authorities = await axiosInstance.get("/authorities");
  console.log(authorities.data)
  return authorities.data;
};

export const isAuth = async () => {
  const isAuth = await axiosInstance.get("/auth/isAuth", {
    withCredentials: true,
  });
  return {
    isAuthenticated: isAuth.data.isAuthenticated,
    user: isAuth.data.user,
  };
};

export const performLogout = async () => {
  await axiosInstance.post("/auth/logout", {}, { withCredentials: true });
  return false;
};

export const get3LastProjects = async (): Promise<{
  projects: ProjectPreview[];
  totalPages: number;
}> => {
  const response = await axiosInstance.get(
    `main/?page=1&limit=3&sortBy=dateCreated&sortOrder=descc`
  );
  return {
    projects: response.data.result,
    totalPages: response.data.totalPages,
  };
};

export const getUserById = async (id: string): Promise<loggedUser> => {
  const response = await axiosInstance.get(`users/singleUser/${id}`);
  return response.data;
};
