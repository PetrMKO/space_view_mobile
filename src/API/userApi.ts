import { PhotoOfDay } from "API/nasaApi";
import axios, { AxiosInstance } from "axios";

export const userRequest = axios.create({
  baseURL: "http://localhost:3030/",
});

export type User = {
  id: string;
  login: string;
  password: string;
};

export type UserPhoto = PhotoOfDay & {
  userId: string;
};

const userApiConfig = (instance: AxiosInstance) => ({
  getBlocked: (userId: string) => {
    return instance.get<UserPhoto[]>(`favorites&userId=${userId}`);
  },
  getFavorites: (userId: string) => {
    return instance.get<UserPhoto[]>(`blocked&userId=${userId}`);
  },
  login: (login: string, password: string) => {
    return instance.get<User[]>(`users?login=${login}&password=${password}`);
  },
});

export const userApi = userApiConfig(userRequest);
