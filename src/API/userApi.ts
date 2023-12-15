import axios, { AxiosInstance } from "axios";

import { PhotoOfDay } from "./nasaApi";

export const userRequest = axios.create({
  baseURL: "http://localhost:3030/",
});

export type User = {
  login: string;
  password: string;
};

export type UserPhoto = PhotoOfDay & {
  userId: string;
};

const userApiConfig = (instance: AxiosInstance) => ({
  getBlocked: (userId: string) => {
    return instance.get<UserPhoto[]>(`blocked?userId=${userId}`);
  },
  getFavorites: (userId: string) => {
    return instance.get<UserPhoto[]>(`favorites?userId=${userId}`);
  },
  login: (login: string, password: string) => {
    return instance.get<User[]>(`users?login=${login}&password=${password}`);
  },
});

export const userApi = userApiConfig(userRequest);
